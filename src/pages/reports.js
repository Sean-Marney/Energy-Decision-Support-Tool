// Page for users not logged in
import React from 'react';
import ReactECharts from 'echarts-for-react';
import { getDefaultCompilerOptions } from 'typescript';

export default function Reports() {
  function getOptions(){
    return {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line'
        }
      ]
    };
  }
  return (
    <>
    <div className="container mx-auto text-center py-20">
      <h3 className="text-4xl font-bold">Reports</h3>

    </div>
    <ReactECharts option={getOptions()}></ReactECharts>
    </>
  );
}
