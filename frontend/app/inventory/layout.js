'use client'

import { GlobalProvider } from '@/context/GlobalContext';
import dynamic from 'next/dynamic';
const Dashboard = dynamic(() => import('@/components/dashboard'), {
          ssr: false,
          loading: () => <div className="flex animate-pulse flex-col p-4 w-[13vw] md:w-28 items-center  xl:w-44 h-screen rounded-r-lg bg-teal-200  z-20 space-y-20 xl:space-y-2 transition-all ease-in-out delay-75 fixed top-0 left-0" />

})

const ProgressBar = dynamic(() => import('next-nprogress-bar'));

export const metadata = {
  title: 'Shree Sita Rama',
  description: 'Jay Siya Rama',
}

export default function RootLayout({ children }) {

  return (
          <>
          <GlobalProvider>

        <div className='w-20 md:w-32 lg:w-44 h-screen'> 
             <Dashboard />
            </div>
         {children} 
         <ProgressBar
          height="4px"
          color="#fffd00"
          options={{ showSpinner: false }}
          shallowRouting
          appDirectory
          />
          </GlobalProvider>
          </>

  )
}



