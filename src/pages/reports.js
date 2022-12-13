// Page for users not logged in
import React, { useState, useRef, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';

import Card from '../components/ui/Card';
import { Button } from '../components/ui/Button';

import { FaPlusCircle, FaDownload } from 'react-icons/fa';
import { AiFillCloseCircle } from 'react-icons/ai';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Reports() {
    function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
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

      

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    const [frequency, setFrequency] = useState("Daily")

    const [series, setSeries] = useState([])
    const [seriesOptions, setSeriesOptions] = useState([])

    const [timeRangeData, setTimeRangeData] = useState([])

    var xAxis = []

    const [option, setOption] = useState({
        tooltip: {},
        legend: {},
        xAxis: {
            //DateTime
            data: ["1", "2", "3", "4", "5"]
        },
        yAxis: {},
        series: []
    })

    function getSeriesOptions(){
        fetch('/api/report/options?site=' + getCookie("site")).then(async (response) => {
            setSeriesOptions(await response.json())
        })
    }

    function getDataPoints(){
        fetch('/api/report?site=' + getCookie("site") + "&dateStart=" + startDate + " " + startTime + "&dateEnd=" + endDate + " " + endTime + "&frequency=" + frequency).then(async (response) => {
            setTimeRangeData(await response.json())
            deriveXAxisData()
        })
    }

    function updateChartData(){
        deriveXAxisData()

        let newOption = JSON.stringify(option)
        newOption = JSON.parse(newOption)

        newOption.series = series

        newOption.xAxis.data = xAxis

        setOption(newOption)
    }

    function deriveSeriesData(seriesName){
        let seriesData = []
        timeRangeData.forEach((dataPoint) => {
            seriesData.push(dataPoint[seriesName])
        })
        return seriesData
    }

    function deriveXAxisData(){
        let xAxisData = []
        timeRangeData.forEach((dataPoint) => {
            xAxisData.push(dataPoint["Date"])
        })
        xAxis = xAxisData
    }

    function newSeries(){
        // Pick random series
        const randomSeries = seriesOptions[Math.floor(Math.random() * seriesOptions.length)]

        const newSeries = {
            name: randomSeries,
            type: 'line',
            data: deriveSeriesData(randomSeries)
        }

        setSeries([...series, newSeries])
    }

    function removeSeries(index){
        let newSeries = [...series]
        newSeries.splice(index, 1)
        setSeries(newSeries)
    }

    useEffect(() => {
        getSeriesOptions()
        getDataPoints()
    }, [])

    useEffect(() => {
        updateChartData()
    }, [series])
    
    useEffect(() => {
        getDataPoints()
        updateChartData()
    }, [startDate, endDate, startTime, endTime, frequency])

    return (
        <div className="grid grid-cols-12 gap-6">
            <Card className="m-8 w-full col-span-8">
                <h1 className="text-4xl afterline mb-6">Report viewer</h1>

                <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-2">
                        <div className="flex flex-col">
                            <label for="frequency-select" className="font-bold mb-2">Frequency</label>
                            <select id="frequency-select" className="h-10 p-1" value={ frequency } onChange={ (e) => setFrequency(e.target.value) }>
                                <option>Hour</option>
                                <option>Day</option>
                                <option>Week</option>
                                <option>Month</option>
                            </select>
                        </div>
                    </div>

                    <div className="col-span-1">
                        <div className="flex flex-col">
                            <label for="frequency-select" className="font-bold mb-2">Period start</label>
                            <input type="date" className="bg-[#E9E9ED] h-10 mb-2" value={ startDate } onChange={ (e) => setStartDate(e.target.value) } />
                            <input type="time" className="bg-[#E9E9ED] h-10" value={ startTime } onChange={ (e) => setStartTime(e.target.value) } />
                        </div>
                    </div>
                    <div className="col-span-1">
                        <div className="flex flex-col">
                            <label for="frequency-select" className="font-bold mb-2">Period end</label>
                            <input type="date" className="bg-[#E9E9ED] h-10 mb-2" value={ endDate } onChange={ (e) => setEndDate(e.target.value) } />
                            <input type="time" className="bg-[#E9E9ED] h-10" value={ endTime } onChange={ (e) => setEndTime(e.target.value) } />
                        </div>
                    </div>

                    <div className="col-span-2 mt-8 flex items-center">
                        <div className="flex flex-col">
                        <a href="/Cardiff University/Abacws/energyData.csv"><Button style="py-4">
                            <div className="flex-row flex">
                                <FaDownload className="mr-3" size="1.75rem" color="#FFFFFF" />
                                <strong>Download dataset</strong>
                            </div>
                        </Button></a>
                        </div>
                    </div>

                </div>

                <div className="w-full mt-16 h-20 border">
                    <ReactECharts option={ option } notMerge={true} />
                </div>
            </Card>

            <Card className="m-8 w-full col-span-3">
                <h1 className="text-4xl afterline mb-6">Data series</h1>
                
                <div className="flex flex-col">
                    { series.map((series, index) => (
                        <div className="border dashed border-gray-400 p-4 mb-4 flex flex-row gap-6 items-center justify-center rounded">
                            <strong>{ series.name }</strong><AiFillCloseCircle onClick={ () => removeSeries(index) } size="1.75rem" color="border-gray-400" />
                        </div>
                    ) )}

                    <a onClick={ () => newSeries() }><div className="border dashed border-gray-400 p-4 mb-4 flex flex-row gap-6 items-center justify-center rounded">
                        <FaPlusCircle size="1.75rem" color="border-gray-400" /><strong>Add new series</strong>
                    </div></a>
                </div>
            </Card>
        </div>

    )   
}