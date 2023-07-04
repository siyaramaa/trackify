import React from 'react'
import dynamic from 'next/dynamic'
const RecentCard = dynamic(() => import('./recentCards'),{
        ssr: false,
        loading: () => <div className='bg-slate-200 h-14 lg:h-16 w-[70vw] lg:w-[25vw] flex items-center justify-between p-4 rounded-lg animate-pulse' />
}
);



function Recent() {
  return (
    <div className="flex-1 flex flex-col space-y-4 items-center p-5 rounded-md bg-gray-100">
    <h1 className="font-bold text-xl">Recent History</h1>
        <div className='cardsContainer space-y-9'>
        <RecentCard title={"Got Salary"} amount={'5000'} income currency />
        <RecentCard title={"Loss on sale"} amount={'5000'} income={false} currency/>
        <RecentCard title={"Food"} amount={'5000'} income={false} currency />
        </div>
        <table className='p-3 w-[70vw] md:w-[50vw] :w-[60vw] xl:w-[30vw] rounded space-y-3'>

          <tbody>
            <tr className=''>
        <th>Min</th>
        <th className="font-bold text-base md:text-xl">Incomes</th>
        <th>Max</th>
            </tr>
        <tr className='text-center bg-white h-14 w-[25vw] rounded'>
         <td className='text-green-500'>$5000</td>
         <td>|</td>
         <td className='text-green-500'>$9000</td>
    </tr>
    <tr>
        <th>Min</th>
        <th className="font-bold text-base md:text-xl">Expenses</th>
        <th>Max</th>
            </tr>
            <tr className='text-center bg-white h-14 w-[25vw] rounded'>
            <td className='text-red-500'>$2000</td>
            <td>|</td>
            <td className='text-red-500'>$8000</td>
    </tr>
          </tbody>
    </table>
    </div>
  )
}

export default Recent