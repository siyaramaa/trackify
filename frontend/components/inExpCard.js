import React from 'react'

function InExpCard({amount, income, currency}) {
  return (
    <div className='bg-gray-100 h-full w-[50vw] xl:h-32 xl:w-[20vw] font-bold text-xs md:text-sm  lg:text-lg flex flex-col items-center justify-around rounded-lg'>
                        <span className='font-medium'>
                              {income ? 'Total Income' : 'Total Expenses'}                      
                        </span>
                        <p className={`text-${income ? 'green-500': 'red-500'}`}>{income ? '+' : '-'} {currency} {amount}</p>
                    </div>
  )
}

export default InExpCard