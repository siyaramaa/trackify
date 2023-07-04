import React from 'react'
import {Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js'
import {Line} from 'react-chartjs-2'

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
)

function ChartComponent({data}) {

   const options = {
    type: 'line',
    redraw: true,
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Monthly Expense Graph',
        },
        legend: {
          position: 'top',
        }
      },
    };

  return (


  <Line className='w-full mx-auto'  options={options} data={data} />
          );
}

export default ChartComponent