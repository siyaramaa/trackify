import React from 'react'
import { Chart } from 'react-google-charts';


function ChartComponent({data}) {
 const options = {
    title: "Monthly Expenses",
    chartArea: { width: "80%", height: "70%" },
  };
  return (
    <Chart
    chartType="AreaChart"
    width="100%"
    height="300px"
    data={data}
    options={options}
  />
          );
}

export default ChartComponent