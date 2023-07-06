'use client';

import React, { useState } from 'react'
import { useRouter } from "next/navigation";
import dynamic from 'next/dynamic';
import { useUserContext } from '@/context/UserContext';

// const useUserContext = dynamic(() => import('@/context/UserContext'))
const Link = dynamic(() =>  import('next/link'));
const Image = dynamic(() => import('next/image'))
dynamic(() =>  import("react-toastify/dist/ReactToastify.css"));
import { toast, ToastContainer } from 'react-toastify';

function Sigup() {

  //Using Global Context.
  const UserContext = useUserContext();
  //Importing the RegisterUser function from GlobalContext
  const {registerUser} = UserContext;
  
  //Initializing state variable for user details as a object
  const [userDetail, setUserDetail] = useState({
                username: '',
                email: '',
                password: ''
  })
  const router = useRouter();

  //Function to Register user and redirecting the user to the login or signin page if the user registers succesfully.
  const submitHandler = async (e) => {
        e.preventDefault();
        const registerReq = await registerUser(userDetail);
        setUserDetail({
          username: '',
          email: '',
          password: ''
      });
        if(registerReq.error) return toast.error(registerReq.error);
        toast.success('Registered Successfully.');
        router.push('/auth/signin');
  }
  
  
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <ToastContainer />
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <Image
        className="mx-auto"
        width={190}
        height={50}
        loading='lazy'
        src="https://img.freepik.com/premium-vector/krishna-janmashtami-hindi-calligraphy-greeting-design_579179-2035.jpg?w=2000"
        alt="Your Company"
      />
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Create your account
      </h2>
    </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" onSubmit={submitHandler}>
      <div>
          <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
            Username
          </label>
          <div className="mt-2">
            <input
              id="username"
              name="username"
              type="text"
              value={userDetail.username}
              onChange={(e) => setUserDetail({...userDetail,username: e.target.value})}
              autoComplete="username"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={userDetail.email}
              onChange={(e) => setUserDetail({...userDetail,email: e.target.value})}
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
            {/* 
            Forget password (it can be implemented later after learning about email technologies)
            <div className="text-sm">
              <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Forgot password?
              </a>
            </div> */}
          </div>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={userDetail.password}
              onChange={(e) => setUserDetail({...userDetail,password: e.target.value})}
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign up
          </button>
        </div>
      </form>

      <p className="mt-10 text-center text-sm text-gray-500">
        Already registered?{' '}
        <Link href={'/auth/signin'} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
          Sign in
        </Link>
      </p>
    </div>
  </div>  )
}

export default Sigup