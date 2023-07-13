import React from 'react'
import dynamic from 'next/dynamic'
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
  return (
    <div className="flex-1 w-full md:w-fit flex flex-col space-y-4 items-center p-5 rounded-md bg-gray-100">
    <h1 className="font-bold  text-sm md:text-xl">Recent History</h1>
        <div className='cardsContainer space-y-9'>
        <RecentCard title={"Got Salary"} amount={'5000'} income currency />
        <RecentCard title={"Loss on sale"} amount={'5000'} income={false} currency/>
        <RecentCard title={"Food"} amount={'5000'} income={false} currency />
        </div>
      <MinMax />
    </div>
  )
}

export default Recent