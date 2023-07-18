'use client';
import { useUserContext } from '@/context/UserContext';
import React, { useEffect, useState } from 'react'

function UserGreet() {
    const UserContext = useUserContext();
    const {currentUserDetail} = UserContext;
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
      currentUserDetail().then(d => setCurrentUser(d[0]));
      // eslint-disable-next-line react-hooks/exhaustive-deps

    }, [])

  return (
<>
            
      <p className="text-xs md:text-base text-gray-500">Ram Ram, {currentUser?.username ? currentUser.username : '....'} !</p>
              
        
        </>
   
      );
    
}

export default UserGreet