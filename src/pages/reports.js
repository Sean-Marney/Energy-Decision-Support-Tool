// Page for users not logged in
import React, { useState, useRef, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import { init, getInstanceByDom } from "echarts";
import { getDefaultCompilerOptions } from 'typescript';

export default function Reports() {
    let tempOption = {
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'line'
            }
        },
        series: [
            {
                data: [150, 230, 224, 218, 135, 147, 260],
                type: 'line'
            }
        ]
    };
    let [option, setOption] = useState(tempOption)
    function getOption() {
        return { option }
    }
    function addLine(data) {
        setOption(prevState => ({
            prevState, series: [...prevState.series, { data: data, type: 'line' }]
        }))
  }
  return (
    <>
    <div id="graph" className="items-stretch flex-row text-center py-20">
        <h3 className="text-4xl font-bold">Reports</h3>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => addLine([Math.floor(Math.random() * 301), Math.floor(Math.random() * 301), Math.floor(Math.random() * 301), Math.floor(Math.random() * 301), Math.floor(Math.random() * 301), Math.floor(Math.random() * 301), Math.floor(Math.random() * 301)])}>Text1</button>
        <ReactECharts option={option}></ReactECharts>
     </div>
    </>
    
  );
}
