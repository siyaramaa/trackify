import dynamic from 'next/dynamic';
import React from 'react';


const Total = dynamic(() => import('@/components/total'),{
  ssr: false,
  loading: () => <div className="bg-slate-100 h-16 w-full animate-pulse flex-row items-center justify-center space-x-1 rounded-xl border p-6">
        <div className="mx-auto h-6 w-4/12 rounded-md bg-gray-300 " />
        </div>
});

const CardContainer = dynamic(() => import('@/components/CardContainer'),{
  ssr: false,
  loading: () => <div className="bg-slate-100 order-1 lg:order-2 animate-pulse w-[85vw] md:w-[80vw] flex-row items-center justify-center space-x-1 rounded-xl border p-6  lg:w-[50vw] h-[45vh] lg:h-[80vh] overflow-x-hidden">
                             <div className="flex flex-col space-y-5">

                  <div className="h-6 w-11/12 rounded-md bg-gray-300 "></div>
                  <div className="h-6 w-11/12 rounded-md bg-gray-300 "></div>
                  <div className="h-6 w-5/12 rounded-md bg-gray-300 "></div>
                  <div className="h-6 w-5/12 rounded-md bg-gray-300 "></div>
                  <div className="h-6 w-5/12 rounded-md bg-gray-300 "></div>
                  <div className="h-6 w-4/12 rounded-md bg-gray-300 "></div>
                  <div className="h-6 w-3/12 rounded-md bg-gray-300 "></div>
                  <div className="h-6 w-2/12 rounded-md bg-gray-300 "></div>
                  </div>

    </div>

})

const AddComp = dynamic(() => import('@/components/addComp'), {
  ssr: false,
  loading: () => <div className="bg-slate-100 h-[55vh] lg:h-[80vh] w-[85vw] lg:w-[30vw] animate-pulse flex-row items-center justify-center space-x-1 rounded-xl border p-6 ">
      <div className="flex flex-col space-y-5">
        <div className="h-6 w-11/12 rounded-md bg-gray-300 "></div>
        <div className="h-6 w-10/12 rounded-md bg-gray-300 "></div>
        <div className="h-6 w-9/12 rounded-md bg-gray-300 "></div>
        <div className="h-6 w-11/12 rounded-md bg-gray-300 "></div>
        <div className="h-6 w-6/12 rounded-md bg-gray-300 "></div>

      </div>
        </div>

})



//This page contains informations related to expenses.
async function page() {  
  return (
        <div className="flex-1 p-2 space-y-2 h-screen">
          <h1 className="font-bold text-base lg:text-xl text-center xl:text-start">Expenses</h1>
            {/* Using Total Component to display the total amount of expenses. */}
            <Total income={false} />
    
          <div className="flex w-[86vw] flex-col lg:flex-row md:space-x-7 lg:justify-around h-[100%]">

          <div className="formContainer order-2 lg:order-1">
          {/* Using AddComp to add the Expense */}
          <AddComp />
        </div>
                          {/* Cards Container (inclues all the expenses data) */}
                          
                          <CardContainer income={false} />     
                         
          </div>
        </div>
    
    
  );
}

export default page