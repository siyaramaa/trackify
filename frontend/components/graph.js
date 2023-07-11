'use client';
import React, {useEffect} from 'react'
import { useGlobalContext } from '@/context/GlobalContext';
import dynamic from 'next/dynamic';

const InExpCard = dynamic(() => import('./inExpCard'),{
      ssr: false,
      loading: () => <div className="bg-slate-100 h-28 w-[40vw] xl:h-32 xl:w-[20vw] animate-pulse flex-row items-center justify-center space-x-1 rounded-xl border p-6">
      <div className="flex flex-col space-y-5">
<div className="h-6 w-11/12 rounded-md bg-gray-300 "></div>
<div className="h-6 w-9/12 rounded-md bg-gray-300 "></div>
</div>
</div>

});
const ChartComponent = dynamic(() => import('./ChartComponent'),
        {
          ssr: false,
          loading: () => <div className="bg-slate-100 h-[45vh] w-full animate-pulse flex-row items-center justify-center space-x-1 rounded-xl border p-6">
      <div className="flex flex-col space-y-5">
<div className="h-6 w-11/12 rounded-md bg-gray-300 "></div>
<div className="h-6 w-9/12 rounded-md bg-gray-300 "></div>
<div className="h-6 w-7/12 rounded-md bg-gray-300 "></div>
<div className="h-6 w-5/12 rounded-md bg-gray-300 "></div>
<div className="h-6 w-8/12 rounded-md bg-gray-300 "></div>

</div>
</div>

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
    
        
    <div className='h-[65vh] xl:h-[80vh]  w-full xl:w-[50vw] text-center flex flex-col justify-around'>
              
            <div className='flex justify-between md:justify-around items-center h-[10vh] md:h-[20vh]'>

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