"use client";
import React, { useEffect } from "react";
import { useGlobalContext } from "@/context/GlobalContext";
// import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import dynamic from "next/dynamic";

const CloudUploadOutlinedIcon = dynamic(() => import('@mui/icons-material/CloudUploadOutlined'));

const Card = dynamic(() => import('./Card'), {
        ssr: false,
        loading: () => <div className="bg-slate-100 h-24 animate-pulse flex-row items-center justify-center space-x-1 rounded-xl border p-6 ">
            <div className="flex flex-col space-y-2">
              <div className="h-6 w-11/12 rounded-md bg-gray-300 "></div>
              <div className="h-6 w-10/12 rounded-md bg-gray-300 "></div>
            </div>
              </div>
        
})



function CardContainer({income}) {
    const GlobalContext = useGlobalContext();
    const {incomes, getIncomes,getExpenses, expenses, deleteReq} = GlobalContext;

  
  useEffect(() => {
    income? getIncomes() : getExpenses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])   



      
  return (
    <div className="cardsContainer order-1 lg:order-2 w-full md:w-[80vw] lg:w-[50vw] bg-gray-100 rounded p-1 md:p-5 space-y-5 h-[45vh] lg:h-[80vh] overflow-y-scroll overflow-x-hidden">    
      { 
        
        // Condition 1: Checking for income page and rendering incomes only if there are some incomes data in the database.
                    income && incomes.length > 0 ? (
                      incomes?.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)).map((i) => 
                              (
                          <Card key={i._id} income={income} id={i._id} title={i.title} amount={i.amount} category={i.category} createdAt={i.createdAt} />
                      )            
                        ) 
          
                    //Condition 2: Checking for income page and rendering a upload logo if there are no any incomes in the database.
                    ) : income && incomes.length == 0 ? 
                      (<div className="w-full  h-full relative">
                      <CloudUploadOutlinedIcon className="absolute left-[45%] top-[43%] text-8xl" fontSize="large" />
                      </div>
                      ) : 
                    //Condition 3: Checking for expense page and rendering expenses only if there are some expense data stored in the database.
                    income == false && expenses.length > 0 ? (
                      expenses?.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)).map((i) => 
                       
                              (
                                <Card key={i._id} income={income} id={i._id} title={i.title} amount={i.amount} category={i.category} createdAt={i.createdAt} />

                      )
                      
                        )
                    ) : 
                    //Condition 4: Checking for expense page and rendering a upload logo if there are no any expenses in the database.
                    (<div className="w-full  h-full relative">
                      <CloudUploadOutlinedIcon className="absolute left-[45%] top-[43%] text-8xl" fontSize="large" />
                      </div>
                      )
            
                   }
          

  
 </div>    
  );
}

export default CardContainer;




 