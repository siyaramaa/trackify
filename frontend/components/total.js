'use client';
import React from 'react'
import { useGlobalContext } from '@/context/GlobalContext'


function Total({income}) {
    const GlobalContext = useGlobalContext();

    const {totalIexp} = GlobalContext;

    const totalAmount = totalIexp(income);

  return (
    <div className="bg-gray-100 h-16 w-full flex items-center justify-center p-4 rounded-lg sticky top-0 z-10">
    <span className="font-bold text-base md:text-xl">
      {income ? 'Total Income' : 'Total Expenses'}: 
      <span className={`font-normal rounded-lg text-${income ? 'green': 'red'}-500`}> {totalAmount}</span>
    </span>
  </div>
  )
}

export default Total