// Page for users not logged in
import React, { useState, useRef, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import DatePicker from "react-datepicker";
import { init, getInstanceByDom } from "echarts";
import { getDefaultCompilerOptions } from 'typescript';
import { DataSeriesBox } from '../components/DataSeriesBox.js';
import ReactDOM from 'react-dom';
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
    let dataLength = 0
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
        fetch('http://localhost:3000/api/usage/get?site=' + getCookie("site") + "&organisation=" + getCookie("organisation")+"&startDate="+startNum+"&endDate="+endNum).then(async (response) => {
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
    function addLine(num) {
        getData()
        let myData = usageData.data
        setOption(prevState => ({
            prevState, xAxis: { type: 'category', data: populateArray(myData.length) }, series: [...prevState.series, { data: myData, type: 'line' }]
        }))
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
                    <button id="newSeriesBox" style={{ position: 'relative' }} className="border border-black h-40 w-40 text-center content-center rounded-lg border-radius: 500px" onClick={() => addLine()}>+</button>
                    <DatePicker
                        selected={startDate}
                        onChange={onChange}
                        startDate={startDate}
                        endDate={endDate}
                        selectsRange
                        inline
                        openToDate={new Date("2020/01/01")}
                    />
                </div>
            </div>
            }
    </>
    
    );
}
