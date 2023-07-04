'use client';
import { useUserContext } from '@/context/UserContext';
import React, { useEffect, useState } from 'react'

function UserGreet() {
    const UserContext = useUserContext();
    const {currentUserDetail} = UserContext;
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
      currentUserDetail().then(d => setCurrentUser(d[0]));
    }, [])

  return (
<>
              {
                currentUser && 
                  <p className="text-base text-gray-500">Ram Ram, {currentUser?.username} !</p>
              }
        
        </>
   
      );
    
}

export default UserGreet