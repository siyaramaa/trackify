'use client';
import '@/app/globals.css';
import { UserProvider } from '@/context/UserContext';
import dynamic from 'next/dynamic';
const ProgressBar = dynamic(() => import('next-nprogress-bar'));



export default function RootLayout({ children }) {

  return (
    <html lang="en" className='font-mono'>
      <UserProvider>
        <body className='flex h-screen container'>
         {children} 
         <ProgressBar
          height="4px"
          color="#F05B4F"
          options={{ showSpinner: true }}
          shallowRouting
          appDirectory
          />


        </body>
     
   </UserProvider>
    </html>
  )
}



