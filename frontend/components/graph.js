'use client';
import React, {useEffect} from 'react'
import { useGlobalContext } from '@/context/GlobalContext';
import dynamic from 'next/dynamic';

const InExpCard = dynamic(() => import('./inExpCard'),{
      ssr: false,
      loading: () => <div className='bg-slate-200 h-28 w-[40vw] xl:h-32 xl:w-[20vw] font-bold text-base  lg:text-2xl flex flex-col items-center justify-around rounded-lg animate-pulse' />

});
const ChartComponent = dynamic(() => import('./ChartComponent'),
        {
          ssr: false,
          loading: () => <div className='graphContainer h-[45vh] w-full rounded-xl  bg-slate-200 animate-pulse' />

        }
);


function Graph() {

  const GlobalContext = useGlobalContext();
    const {incomes,expenses,getIncomes, getExpenses, monthlyExp, mnthExpenses} = GlobalContext;

    let totalInc = 0;
     let totalExp = 0;
     incomes?.forEach((i) => totalInc += i.amount );
     expenses?.forEach((i) => totalExp += i.amount );   
     
     useEffect(() => {

      getIncomes();
      getExpenses();
      // eslint-disable-next-line react-hooks/exhaustive-deps

        }, [])
 
     useEffect(() => {
      mnthExpenses();
      // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [expenses.length])

         

     
        const data = {
          labels: monthlyExp?.map((i) => new Date(i.createdAt).toDateString()),
          datasets: [
                {
                  label: 'Expenses',
                  data: [
                    ...monthlyExp?.map((e) => e.amount)
                  ],
                  backgroundColor: 'red',
                  tension: .2
                },
          ]
        }
       
  return (
    
        
    <div className='h-[65vh] xl:h-[80vh] w-[82vw] xl:w-[50vw] text-center flex flex-col justify-around'>
              
            <div className='flex justify-evenly md:justify-around items-center h-[20vh]'>

                    <InExpCard currency={'NPR'} amount={totalInc} income={true} />
                    <InExpCard currency={'NPR'}  amount={totalExp} income={false} />
            </div>

              
              {/* Chart JS Implementation */}
            <div className='graphContainer h-[45vh] w-full rounded-xl  bg-gray-50'>
                    <ChartComponent  data={data} />
            </div>

        
    </div>
  )
}

export default Graph