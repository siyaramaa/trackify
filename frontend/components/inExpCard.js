import React from 'react'

function InExpCard({amount, income, currency}) {
  return (
    <div className='bg-gray-100 h-full w-[40vw] xl:h-32 xl:w-[20vw] font-bold text-base  lg:text-2xl flex flex-col items-center justify-around rounded-lg'>
                        <span className='text-sm font-medium'>
                              {income ? 'Total Income' : 'Total Expenses'}                      
                        </span>
                        <p className={`text-${income ? 'green-500': 'red-500'}`}>{income ? '+' : '-'} {currency} {amount}</p>
                    </div>
  )
}

export default InExpCard