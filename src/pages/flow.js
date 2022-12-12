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
                    name: 'CHP1'
                },
                {
                    name: 'CHP2'
                },
                {
                    name: 'Grid in'
                },
                {
                    name: 'Total'
                },
                {
                    name: 'Heating'
                },
                {
                    name: 'Cooling'
                },
                {
                    name: 'Lighting'
                },
                {
                    name: 'Misc'
                },
                {
                    name: 'Grid out'
                }
            ],
            links: [
                {
                    source: 'CHP1',
                    target: 'Total',
                    value: 3
                },
                {
                    source: 'CHP2',
                    target: 'Total',
                    value: 8
                },
                {
                    source: 'Grid in',
                    target: 'Total',
                    value: 3
                },
                {
                    source: 'Total',
                    target: 'Heating',
                    value: 1
                },
                {
                    source: 'Total',
                    target: 'Lighting',
                    value: 2
                },
                {
                    source: 'Total',
                    target: 'Cooling',
                    value: 1
                },
                {
                    source: 'Total',
                    target: 'Misc',
                    value: 1
                },
                {
                    source: 'Total',
                    target: 'Grid out',
                    value: 1
                },
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
        fetch('http://localhost:3000/api/flow/get?site=' + getCookie("site") + "&organisation=" + getCookie("organisation")).then(async (response) => {
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
    }
    function addLine() {
        let totalIn = usageData.data.CHP1 + usageData.data.CHP2 + usageData.data.gridIn
        totalIn -= usageData.data.gridOut
        let heating = Math.random() * totalIn*0.5
        totalIn -= heating
        let cooling = Math.random() * totalIn*0.5
        totalIn -= cooling
        let lighting = Math.random() * totalIn*0.5
        totalIn -= lighting
        console.log("CHP1", usageData.data.CHP1,
            "CHP2", usageData.data.CHP2,
            "gridIn", usageData.data.gridIn,
            "gridOut", usageData.data.gridOut)
        let newSankey = {
            series: {
                type: 'sankey',
                layout: 'none',
                emphasis: {
                    focus: 'adjacency'
                },
                data: [
                    {
                        name: 'CHP1'
                    },
                    {
                        name: 'CHP2'
                    },
                    {
                        name: 'Grid in'
                    },
                    {
                        name: 'Total'
                    },
                    {
                        name: 'Heating'
                    },
                    {
                        name: 'Cooling'
                    },
                    {
                        name: 'Lighting'
                    },
                    {
                        name: 'Misc'
                    },
                    {
                        name: 'Grid out'
                    }
                ],
                links: [
                    {
                        source: 'CHP1',
                        target: 'Total',
                        value: usageData.data.CHP1
                    },
                    {
                        source: 'CHP2',
                        target: 'Total',
                        value: usageData.data.CHP2
                    },
                    {
                        source: 'Grid in',
                        target: 'Total',
                        value: usageData.data.gridIn
                    },
                    {
                        source: 'Total',
                        target: 'Heating',
                        value: heating
                    },
                    {
                        source: 'Total',
                        target: 'Lighting',
                        value: lighting
                    },
                    {
                        source: 'Total',
                        target: 'Cooling',
                        value: cooling
                    },
                    {
                        source: 'Total',
                        target: 'Misc',
                        value: totalIn
                    },
                    {
                        source: 'Total',
                        target: 'Grid out',
                        value: usageData.data.gridOut
                    },
                ]
            }
        };
        setOption(newSankey)
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
