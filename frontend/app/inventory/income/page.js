
import dynamic from "next/dynamic";
import React from "react";


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
                        <div className="h-6 w-11/12 rounded-md bg-gray-300 "></div>
                        <div className="h-6 w-8/12 rounded-md bg-gray-300 "></div>
                        <div className="h-6 w-8/12 rounded-md bg-gray-300 "></div>
                        </div>

          </div>

      })

const AddComp = dynamic(() => import('@/components/addComp'), {
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



//This page contains informations related to incomes.
async function page() {
  return (
    <div className="flex-1 p-2 space-y-2 h-screen">
    <h1 className="font-bold text-sm lg:text-xl text-center xl:text-start">Incomes</h1>
      {/* Using Total Component to display the total amount of incomes. */}
      <Total income />

      <div className="flex  w-full items-center md:items-start md:w-[86vw] flex-col lg:flex-row md:space-x-7 lg:justify-around h-[100%]">
        <div className="order-2 w-full md:w-fit lg:order-1">
          {/* Using AddComp to add the incomes */}
          <AddComp income />
        </div>
                          {/* Cards Container (inclues all the incomes data) */}
                                <CardContainer income />     
      </div>
    </div>
  );
}

export default page;
