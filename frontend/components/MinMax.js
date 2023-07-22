import React from 'react'

function MinMax({incomes, expenses}) {

    let sortedIncome = incomes.sort((a,b) => a.amount-b.amount);
    let sortedExpense = expenses.sort((a,b) => a.amount-b.amount);
  

  return (
    <table className='p-3  w-[85vw] md:w-[50vw] lg:w-[60vw] xl:w-[30vw] rounded space-y-3'>

    <tbody className='text-xs md:text-base'>
      <tr className=''>
  <th>Min</th>
  <th className="font-bold text-xs md:text-xl">Incomes</th>
  <th>Max</th>
      </tr>
  <tr className='text-center bg-white h-12 md:h-14 w-[25vw] rounded'>
   <td className='text-green-500'>{sortedIncome && sortedIncome[0]?.amount}</td>
   <td>|</td>
   <td className='text-green-500'>{sortedIncome && sortedIncome[sortedIncome.length-1]?.amount}</td>
</tr>
<tr>
  <th>Min</th>
  <th className="font-bold text-xs md:text-xl">Expenses</th>
  <th>Max</th>
      </tr>
      <tr className='text-center bg-white h-12 md:h-14 w-[25vw] rounded'>
      <td className='text-red-500'>{sortedExpense && sortedExpense[0]?.amount}</td>
      <td>|</td>
      <td className='text-red-500'>{sortedExpense && sortedExpense[sortedExpense.length-1]?.amount}</td>
</tr>
    </tbody>
</table>
  )
}

export default MinMax