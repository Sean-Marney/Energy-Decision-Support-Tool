// Page for users not logged in
import React, { useState, useRef, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import { init, getInstanceByDom } from "echarts";
import { getDefaultCompilerOptions } from 'typescript';
import { DataSeriesBox } from '../components/DataSeriesBox.js';
import ReactDOM from 'react-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


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
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [startNum, setStartNum] = useState(0);
    const [endNum, setEndNum] = useState(0);
    const [testState, setTestState] = useState(0);
    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
        setStartNum(daysSinceStartOfYear(start))
        setEndNum(daysSinceStartOfYear(end))
        addLine()

    };

    function getData() {
        console.log("hello")
        fetch('http://localhost:3000/api/flow/get?site=' + getCookie("site") + "&organisation=" + getCookie("organisation") + "&startDate=" + startNum + "&endDate=" + endNum).then(async (response) => {
            setUsageData(await response.json())
            console.log("2")
            setIsDownloading(false)
        })
    }
    function daysSinceStartOfYear(date) {
        // Create a Date object for the start of the year
        const startOfYear = new Date("2020/01/01");

        // Calculate the difference between the two dates in milliseconds
        const differenceInTime = new Date(date).getTime() - startOfYear.getTime();

        // Convert the difference in time to days and multiply by 48
        const daysSinceStartOfYear = Math.floor(differenceInTime / (1000 * 60 * 60 * 24));

        // Return the result
        return daysSinceStartOfYear;
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
        getData()
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
                    <h3 className="text-4xl font-bold">Energy Flow</h3>
                    <ReactECharts option={option}></ReactECharts>
                </div>
                <div id="seriesContainer" style={{ position: 'relative' }} className="container col-span-1 rows-start-2 gap-px pl-10">
                    <button id="newSeriesBox" style={{ position: 'relative' }} className="border border-black h-40 w-40 text-center content-center rounded-lg border-radius: 500px text-3xl" onClick={() => addLine()}>+</button>
                    <DatePicker
                        className="pt-5"
                        selected={startDate}
                        onChange={onChange}
                        startDate={startDate}
                        endDate={endDate}
                        selectsRange
                        inline
                        openToDate={new Date("2020/01/01")}
                    />
                </div>
                <button onClick={() => setSankey()}>Sankey</button>
            </div>
            }
    </>
    
    );
}
