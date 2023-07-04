
import dynamic from "next/dynamic";
import React from "react";


const Total = dynamic(() => import('@/components/total'),{
        ssr: false,
        loading: () => <div className="bg-slate-200 h-16 w-full flex items-center justify-center p-4 rounded-lg sticky top-0 z-10 animate-pulse" />


});

const CardContainer = dynamic(() => import('@/components/CardContainer'),{
        ssr: false,
        loading: () => <div className="cardsContainer animate-pulse order-1 lg:order-2  w-[85vw] md:w-[80vw] lg:w-[50vw] border bg-gray-100 rounded p-5 space-y-5 h-[45vh] lg:h-[80vh] overflow-y-scroll overflow-x-hidden" />
})

const AddComp = dynamic(() => import('@/components/addComp'), {
        ssr: false,
        loading: () => <div className="bg-slate-200 animate-pulse flex items-center h-[55vh] lg:h-[80vh] w-[85vw] lg:w-[30vw] flex-col mx-auto rounded space-y-6 lg:space-y-10 p-5 inputContainer" />

})



//This page contains informations related to incomes.
async function page() {
  return (
    <div className="flex-1 p-2 space-y-2 h-screen">
    <h1 className="font-bold text-base lg:text-xl text-center xl:text-start">Incomes</h1>
      {/* Using Total Component to display the total amount of incomes. */}
      <Total income />

      <div className="flex w-[86vw] flex-col lg:flex-row md:space-x-7 lg:justify-around h-[100%]">
        <div className="order-2 lg:order-1">
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
