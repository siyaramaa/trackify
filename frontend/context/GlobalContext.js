'use client';
import Cookies from "js-cookie";
import React, {useState, useContext, createContext, useEffect} from "react";

const GlobalContext = createContext();
const baseURL = process.env.NEXT_PUBLIC_API;

export const GlobalProvider = ({children}) => {
    let [userId, setUserId]  = useState(Cookies.get('userSession') ? Cookies.get('userSession') : null);
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [monthlyExp, setMonthlyExp] = useState([]);

    const getIncomes = async () => {
            try {
                const fetchReq = await fetch(`${baseURL}/api/income?id=${userId}`, {cache: 'no-store'});
                const data = await fetchReq.json();
        //When we upload something to the database, the database stores data in ascending order, or Older item comes first and vice versa so,
        //Reversing data that we have fetched from database, to make sure, i get new items on the top 
                if(data.len == 0) return {'len': 0};
                setIncomes(data.result);
                return data.result;
                
            } catch (error) {
                return {'Got Error': error};
            }

    }

    const totalIexp = (income) => {
            let total = 0;
            if(income && incomes?.len != 0){
             incomes?.forEach((i) =>{ total += i.amount });
            }
            
            if(income == false && expenses?.len != 0){
                expenses?.forEach((i) =>{ total += i.amount });
              
            }
            return total;
    }
    const addInExp = async (title,type,category,amount,desc) => {
        const isIncome = type == 'income' ? true : false;
        if (title == ""){
            return {'Error': "Please enter any title" };
        }else if (amount <= 0){
            return {'Error': "Please enter any amount, > 0" };
        }else if (category == "Select:"){
         return {'Error': `Please Select a category for your ${type}.` };
        } 
        
        const fetchReq = await fetch(`${baseURL}/api/${isIncome ? 'addIncome' : 'addExpense'}`, {
                        method: 'POST',
                        headers: {
                            'Content-type':
                            'application/json'
                        },
                        body: JSON.stringify(
                                {
                                    title: title,
                                    type: type,
                                    category: category,
                                    amount: amount,
                                    description: desc,
                                    createdBy: userId, 
                                }
                        )
    })
        const result = await fetchReq.json();
    if(result.error) return {'Error': `Failed to upload ${type}.`};    
    isIncome ? setIncomes((prevState) => [...prevState, result.success]) : setExpenses((prevState) => [...prevState, result.success]);
    isIncome ? getIncomes() : getExpenses();
    return {'success': `${type} uploaded succesfully.`};

        
}
   


const deleteReq = async (income, item_id) => {
    const delRequest = await fetch(`${baseURL}/api/${income ? 'income' : 'expense'}/delete?id=${item_id}`, {
        method: 'Delete'}
        );
    const resp = await delRequest.json();
    if(resp.error)  return {'error': resp.error};
    if(resp.deletedCount > 0){
        //Success
    income ? setIncomes((incomes) => incomes.filter((income) => income._id != item_id)) : setExpenses((expenses) => expenses.filter((expense) => expense._id != item_id));
    income ? getIncomes() : getExpenses();
   
    return {'success': 'Deleted Successfully.'};
        }
}


    const getExpenses = async () => {
            try {
                const fetchReq = await fetch(`${baseURL}/api/expense?id=${userId}`, {cache: 'no-store'});        
                const data = await fetchReq.json();
                //When we upload something to the database, the database stores data in ascending order, or Older item comes first and vice versa so,
                //Reversing data that we have fetched from database, to make sure, i get new items on the top  
                if(data.len == 0) return; 
                setExpenses(data.result);
            } catch (error) {
                return {'Got Error': error};
            }

    }
    

    const mnthExpenses = () => {
        const mL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const currMonth = new Date().getMonth();
        const currYear = new Date().getFullYear();
        let arr = [];
        if(expenses.length != 0){
            expenses?.forEach((i) =>{
                const month = new Date(i.createdAt).getMonth()
                const year = new Date(i.createdAt).getFullYear();
                if(month == currMonth && year == currYear){
                    arr.push(i);
                };
            });
            setMonthlyExp(arr);
        }
    }

    const transactionHistory = () => {
        const transactions = [...incomes,...expenses];
        transactions.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
        return transactions.slice(0,3);
    }


        return (
            <GlobalContext.Provider value={{deleteReq, transactionHistory, userId,getExpenses, getIncomes, addInExp, incomes, expenses, mnthExpenses, totalIexp, monthlyExp}}>

                {children}
            </GlobalContext.Provider>
            
        );
}

export const useGlobalContext = () =>{
    return useContext(GlobalContext)
}