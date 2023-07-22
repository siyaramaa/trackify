'use client';
import React from 'react'
import dynamic from 'next/dynamic'
import { useGlobalContext } from '@/context/GlobalContext';
const RecentCard = dynamic(() => import('./recentCards'),{
        ssr: false,
        loading: () => 
<div className="bg-slate-100 h-14 lg:h-16 w-[70vw] lg:w-[25vw] p-4 animate-pulse flex items-center justify-between rounded-xl border">
<div className="h-6 w-7/12 rounded-md bg-gray-300 "></div>
<div className="h-6 w-3/12 rounded-md bg-gray-300 "></div>
</div>

});

const MinMax = dynamic(() => import('./MinMax'),{
  ssr: false,
  loading: () => 
<div className="bg-slate-100 h-14 lg:h-16 w-[70vw] lg:w-[25vw] p-4 animate-pulse flex items-center justify-between rounded-xl border">
<div className="h-6 w-7/12 rounded-md bg-gray-300 "></div>
<div className="h-6 w-3/12 rounded-md bg-gray-300 "></div>

</div>

});



function Recent() {
  const GlobalContext = useGlobalContext();
  const {transactionHistory, incomes, expenses} = GlobalContext;
  const history =  transactionHistory();
 
 
  return (
    <div className="flex-1 w-full md:w-fit flex flex-col space-y-4 items-center p-5 rounded-md bg-gray-100">
    <h1 className="font-bold  text-sm md:text-xl">Recent History</h1>
        <div className='cardsContainer space-y-9'>
          {   
              history.map((item) => (
                <RecentCard key={item._id} title={`${item.title.length > 11 ? item.title.slice(0,12) + '...' : item.title}`} amount={item?.amount} income={item?.type === 'expense' ? false : true} currency />
                
              ))
          }
        </div>
      <MinMax incomes={incomes} expenses={expenses} />
    </div>
  )
}

export default Recent