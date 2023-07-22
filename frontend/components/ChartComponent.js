import React from 'react'
import { Chart } from 'react-google-charts';


function ChartComponent({data}) {
 const options = {
    title: "Monthly Expenses",
    chartArea: { width: "80%", height: "70%" },
  };
  let arrayOfData = [
    ["Name", "Amount"],
      ];

  data.forEach((item) => arrayOfData.push([item.title,item.amount]));
  const defaulData = [
    ["Name", "Amount"],
    ["Add something to see...", 0],
  ]
  return (
    <Chart
    chartType="AreaChart"
    width="100%"
    height="300px"
    data={arrayOfData.length > 1 ? arrayOfData : defaulData}
    options={options}
  />
          );
}

export default ChartComponent