import { GlobalProvider } from '@/context/GlobalContext';
import dynamic from 'next/dynamic';
const Dashboard = dynamic(() => import('@/components/dashboard'), {
          ssr: false,
          loading: () =>
             <div className="bg-teal-50 order-1 lg:order-2 animate-pulse w-[13vw] md:w-28 flex-row xl:w-44 h-screen items-center justify-center space-x-1 rounded-r-lg border p-6 z-20 space-y-20 fixed top-0 left-0">
                             <div className="flex flex-col justify-center space-y-12">
                  <div className="h-6 w-11/12 rounded-md bg-gray-300 "></div>
                  <div className="h-6 w-11/12 rounded-md bg-gray-300 "></div>
                  <div className="h-6 w-11/12 rounded-md bg-gray-300 "></div>
                  <div className="h-6 w-11/12 rounded-md bg-gray-300 "></div>
                  <div className="h-6 w-11/12 rounded-md bg-gray-300 "></div>
                  <div className="h-6 w-11/12 rounded-md bg-gray-300 "></div>
                  <div className="h-6 w-11/12 rounded-md bg-gray-300 "></div>
                  </div>

    </div>
              
})



export default function RootLayout({ children }) {

  return (
          <>
          <GlobalProvider>

             <Dashboard />
            <div className='mx-auto w-full'>
         {children} 
            </div>

          </GlobalProvider>
          </>

  )
}



