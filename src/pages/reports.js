// Page for users not logged in
import React, { useState, useRef, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import { init, getInstanceByDom } from "echarts";
import { getDefaultCompilerOptions } from 'typescript';
import { DataSeriesBox } from '../components/DataSeriesBox.js';
import ReactDOM from 'react-dom';


export default function Reports() {
    function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
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
    let [graphType, setType] = useState("line")

    const [usageData, setUsageData] = React.useState(null)
    const [isLoaded, setIsLoaded] = React.useState(false)
    const [isDownloading, setIsDownloading] = React.useState(true)

    function getData() {
        console.log("hello")
        fetch('http://localhost:3000/api/usage/get?site=' + getCookie("site") + "&organisation=" + getCookie("organisation")).then(async (response) => {
            setUsageData(await response.json())
            console.log("2")
            setIsDownloading(false)
        })
    }

    React.useEffect(() => {
        if (!isLoaded) {
            getData()
            setIsLoaded(true)
        }
    }, [])
    function populateArray(n) {
        // create an empty array
        const array = [];

        // loop from 1 to n
        for (let i = 1; i <= n; i++) {
            // convert the number to a string and add it to the array
            array.push(i.toString());
        }

        // return the array
        return array;
    }

    function setSankey() {
        setOption(sankeyOption)
        setType('sankey')
    }
    function addLine(data) {
        if (graphType == 'line') {
            let myData = usageData.data
            setOption(prevState => ({
                prevState, xAxis: { type: 'category', data: populateArray(myData.length) }, series: [...prevState.series, { data: myData, type: 'line' }]
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
    }
    return (
    <>
            {!isDownloading && <div className="grid grid-cols-11 grid-rows-2 gap-5 m-8 transition-opacity ease-in duration-700 w-full">
                <script src="../path/to/flowbite/dist/flowbite.js"></script>
                <div id="graph" className="container items-stretch flex-row text-center pt-5 col-span-7">
                    <h3 className="text-4xl font-bold">Reports</h3>
                    <ReactECharts option={option}></ReactECharts>
                </div>
                <div id="seriesContainer" style={{ position: 'relative' }} className="container col-span-1 rows-start-2 gap-px pl-10">
                    <button id="newSeriesBox" style={{ position: 'relative' }} className="border border-black h-40 w-40 text-center content-center rounded-lg border-radius: 500px" onClick={() => addLine([Math.floor(Math.random() * 301), Math.floor(Math.random() * 301), Math.floor(Math.random() * 301), Math.floor(Math.random() * 301), Math.floor(Math.random() * 301), Math.floor(Math.random() * 301), Math.floor(Math.random() * 301)])}>+</button>
                </div>
                <button onClick={() => setSankey()}>Sankey</button>
            </div>
            }
    </>
    
    );
}
