'use client';
import React from 'react'
import {motion} from 'framer-motion'


function RecentCard({title, amount, income, currency}) {
  return (
    <>
    <motion.div
    initial={{ opacity: 0 , x: '10%'}}
    animate={{ x: "0%", opacity: 1 }}
    whileInView={{opacity: 1  }}
    transition={{duration: 0.2}}
    >
    <div className='bg-white h-12 md:h-14 lg:h-16 w-[85vw] md:w-[70vw] lg:w-[50vw] xl:w-[25vw] flex items-center justify-between p-4 rounded-lg'>
                        <span className='text-sm md:font-medium md:text-lg'>
                               {title}
                        </span>
                        <p className={`text-base md:text-lg text-${income ? 'green-500': 'red-500'}`}>{income ? '+' : '-'}{currency && currency} {amount}</p>
        </div>
    </motion.div>
      </>
  )
}

export default RecentCard