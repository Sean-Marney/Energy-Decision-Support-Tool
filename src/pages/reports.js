// Page for users not logged in
import React, { useState, useRef, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import { init, getInstanceByDom } from "echarts";
import { getDefaultCompilerOptions } from 'typescript';
import { DataSeriesBox } from '../components/DataSeriesBox.js';
import ReactDOM from 'react-dom';


export default function Reports() {
    let lineOption = {
        xAxis: {
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
            
        ]
    };
    let sankeyOption = {
        series: {
            type: 'sankey',
            layout: 'none',
            emphasis: {
                focus: 'adjacency'
            },
            data: [
                {
                    name: 'a'
                },
                {
                    name: 'b'
                },
                {
                    name: 'a1'
                },
                {
                    name: 'a2'
                },
                {
                    name: 'b1'
                },
                {
                    name: 'c'
                }
            ],
            links: [
                {
                    source: 'a',
                    target: 'a1',
                    value: 5
                },
                {
                    source: 'a',
                    target: 'a2',
                    value: 3
                },
                {
                    source: 'b',
                    target: 'b1',
                    value: 8
                },
                {
                    source: 'a',
                    target: 'b1',
                    value: 3
                },
                {
                    source: 'b1',
                    target: 'a1',
                    value: 1
                },
                {
                    source: 'b1',
                    target: 'c',
                    value: 2
                }
            ]
        }
    };
    let [option, setOption] = useState(lineOption)
    let [graphType, setType] = useState("")
    function getOption() {
        return { option }
    }
    function addLine(data) {
        setType('sankey')
        if (graphType == 'line') {
            setOption(prevState => ({
                prevState, xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] }, series: [...prevState.series, { data: data, type: 'line' }]
            }))
        }
        else {
            let newSankey = {
                series: {
                    type: 'sankey',
                    layout: 'none',
                    emphasis: {
                        focus: 'adjacency'
                    },
                    data: [
                        {
                            name: 'a'
                        },
                        {
                            name: 'b'
                        },
                        {
                            name: 'a1'
                        },
                        {
                            name: 'a2'
                        },
                        {
                            name: 'b1'
                        },
                        {
                            name: 'c'
                        }
                    ],
                    links: [
                        {
                            source: 'a',
                            target: 'a1',
                            value: Math.floor(Math.random() * 10)
                        },
                        {
                            source: 'a',
                            target: 'a2',
                            value: Math.floor(Math.random() * 10)
                        },
                        {
                            source: 'b',
                            target: 'b1',
                            value: Math.floor(Math.random() * 10)
                        },
                        {
                            source: 'a',
                            target: 'b1',
                            value: Math.floor(Math.random() * 10)
                        },
                        {
                            source: 'b1',
                            target: 'a1',
                            value: Math.floor(Math.random() * 10)
                        },
                        {
                            source: 'b1',
                            target: 'c',
                            value: Math.floor(Math.random() * 10)
                        }
                    ]
                }
            };
            setOption(newSankey)
        }
        if (graphType != "") {
            var temp = document.createElement("div");
            ReactDOM.render(<DataSeriesBox content="goodbye" />, temp)
            var container = document.getElementById("seriesContainer")
            container.replaceChild(temp.querySelector("#destination"), document.getElementById("destination"));
        }
    }
    return (
    <>
    <script src="../path/to/flowbite/dist/flowbite.js"></script>
            <button onClick={() => setOption(sankeyOption)}>Sankey</button>
    <div id="graph" className="container items-stretch flex-row text-center pt-5">
        <h3 className="text-4xl font-bold">Reports</h3>
        <ReactECharts option={option}></ReactECharts>
    </div>
    <div id="seriesContainer" style={{position: 'relative'}} className="container grid overflow-hidden grid-cols-5 grid-rows-1 gap-px pl-10">
        < DataSeriesBox content="hello" />
        <button id="newSeriesBox" style={{ position: 'relative' }} className="border border-black h-40 w-40 text-center content-center rounded-lg border-radius: 500px" onClick={() => addLine([Math.floor(Math.random() * 301), Math.floor(Math.random() * 301), Math.floor(Math.random() * 301), Math.floor(Math.random() * 301), Math.floor(Math.random() * 301), Math.floor(Math.random() * 301), Math.floor(Math.random() * 301)])}>+</button>
    </div>
    </>
    
    );
}
