'use client';


import Cookies from "js-cookie";
import React, {useState, useContext, createContext} from "react";

export const UserContext = createContext();

export const UserProvider = ({children}) => {
        const baseURL = process.env.NEXT_PUBLIC_API;
    let [userId, setUserId]  = useState(Cookies.get('userSession') ? Cookies.get('userSession') : null);

    const registerUser = async (userDetail) => {

            const fetchReq = await fetch(`${baseURL}/api/createUser`, {
                    method: 'POST',
                    headers: {
                            'Content-type': 'application/json'
                    },
                    body: JSON.stringify(userDetail)
            })
            const result = await fetchReq.json();
            if(result) return result;
    }

    const loginUser = async (userDetail) => {

        const fetchReq = await fetch(`${baseURL}/api/login`, {
                method: 'POST',
                headers: {
                        'Content-type': 'application/json'
                },
                body: JSON.stringify(userDetail)
        })
        const result = await fetchReq.json();
        if(result.error) return result;
        const jwt = (await import('jsonwebtoken')).default;
        const decodedToken = jwt.decode(result.token);
        Cookies.set('userSession', decodedToken.id);
        setUserId(decodedToken.id);
        //Sending this as boolean to make sure user has selected a avatar
        return result;
    }

    const uploadAvatar = async (img) => {
        const uploadReq = await fetch(`${baseURL}/api/selectAvatar`, {
                    method: 'POST',
                    headers: {
                            'Content-type': 'application/json'
                    },
                    body: JSON.stringify({userId: userId, selectedImage: img})
        })
        if(uploadReq.error) return uploadReq.error;
        return uploadReq.success;

}

 const currentUserDetail = async () => {
            if(userId){
                const getDetails = await fetch(`${baseURL}/api/userDetails?id=${userId}`, {cache: 'no-store' });
                const data = await getDetails.json();
                return data.userDetail;
            }else{

                    return {'Error': 'You cannot access this function.'};
            }
                
    }

const deleteUser = async () => {
        if(userId){
                const delReq = await fetch(`${baseURL}/api/user/delete?id=${userId}`, {
                                method: 'DELETE',
                                headers: {
                                        'Content-type': 'application/json'
                                }            
                })
                const resFromServer = await delReq.json();
                if(!resFromServer.success) return {'Error': 'Your account was not deleted, Please try again.'};
                Cookies.remove('userSession');
                return {'success': 'You account was sucessfulyy deleted.'}; 
        }else{
                return {'Error': 'You cannot access this function.'}
        }
}


        return (
            <UserContext.Provider value={{currentUserDetail,deleteUser, userId,registerUser,loginUser, uploadAvatar}}>

                {children}
            </UserContext.Provider>
            
        );
}

export const useUserContext = () =>{
    return useContext(UserContext)
}