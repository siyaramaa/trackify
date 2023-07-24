'use client';
import { useUserContext } from '@/context/UserContext';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import React,{useState, useEffect, useMemo} from 'react'

const Image = dynamic(() => import('next/image'), {
  ssr: false,
  loading: () => <div className="rounded-full  w-[85px] h-[85px] cursor-pointer hover:opacity-50 ease-in mx-auto animation-all duration-100 animate-pulse bg-slate-400" />
});
function Settings() {

  const UserContext = useUserContext();

  const {currentUserDetail} =  UserContext;

const [user, setUser] = useState({
          username: '',
          email: '',
          createdAt: '',
          profilePicture: ''
});

useEffect(() => {
  currentUserDetail().then((d) => {
          setUser({
              username: d[0].username,
              email: d[0].email,
              createdAt: new Date(d[0].acCreatedOn).toDateString(),
              profilePicture: d[0].profilePicture
          })
        });
}, [])


  

  
  return (
    <div className="flex  h-full flex-1 items-center justify-center bg-white">
                <div className='h-[85vh] w-[96vw] sm:w-[70vw] lg:w-[65vw]  flex items-center flex-col border bg-gradient-to-r from-slate-300 to-red-100 rounded-xl text-center p-4 space-y-2'>
                        <Image loading="lazy" width={150} height={150} className={`nextImg w-[85px] h-[85px] mx-auto rounded-full object-cover bg-white`} alt="userIntial"  src={user?.profilePicture.includes('data:image/') ? user?.profilePicture : user?.profilePicture === '' ? '/image/defaultAvatar.png' : `/image/${user?.profilePicture}` } />
                        <div className='border flex flex-col justify-evenly h-[60vh] w-[90vw] sm:w-[60vw] md:w-[40vw] lg:w-[55vw] rounded-lg bg-slate-50 text-black'>
                                    <h1>User Information</h1>
                                <div className='userInfo flex flex-col items-center h-[40vh] p-5 space-y-4'>
                                          <label className='flex flex-col text-xs' htmlFor="username">
                                              <span className='text-left'>
                                                username
                                                </span> 
                                              <input type="text" placeholder='username' value={!user?.username ? 'loading username...' : user?.username}  disabled className='px-4 py-3 rounded-md outline-none border-none w-52 bg-slate-200 disabled:text-gray-500' />
                                          </label>
                                          <label className='flex flex-col text-xs' htmlFor="email">
                                              <span className='text-left'>
                                                email
                                                </span> 
                                              <input type="text" placeholder='email'  value={user?.email === '' ? 'loading email...' : user?.email} disabled className='px-4 py-3 rounded-md outline-none border-none w-52 bg-slate-200 disabled:text-gray-500' />
                                          </label>
                                          <label className='flex flex-col text-xs' htmlFor="creationdate">
                                              <span className='text-left'>
                                                created at:
                                                </span> 
                                              <input type="text" placeholder='Account creation date' value={user?.createdAt === '' ? 'loading creation date...' : user?.createdAt}  disabled className='px-4 py-3 rounded-md outline-none border-none w-52 bg-slate-200 text-gray-500' />
                                          </label>
                       
                                </div>
                        </div>
                         <div className='flex  w-full justify-around p-2 text-xs'>
                            <button onClick={() => alert(`hey ${user?.username}, Account deletion is not allowed currently.`)} className="p-3 bg-red-300  rounded-md hover:bg-red-400 transition-all ease-in-out w-24 sm:w-32">Delete</button>
                            <Link href={'/setAvatar'} className="p-3 bg-cyan-300 rounded-md hover:bg-cyan-400 transition-all ease-in-out w-24 sm:w-32">Change avatar</Link>
                          </div>
                </div>
        
    </div>
  )
}

export default Settings;