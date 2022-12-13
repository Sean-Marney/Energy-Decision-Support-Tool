// Page for users not logged in
import React, { useState, useRef, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';

import Card from '../components/ui/Card';
import { Button } from '../components/ui/Button';

import { FaPlusCircle, FaDownload } from 'react-icons/fa';
import { AiFillCloseCircle } from 'react-icons/ai';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

/*Date,CHP1_Electricity_Generation_(kW),CHP2_Electricity_Generation_(kW),CHP1_Heat_Output_(kW),CHP2_Heat_Output_(kW),Boiler_Heat_Output_(kW),
Feels-Like Temperature Deg C,Wind Speed ms,
Site_Electricity_Demand_(kW),Day ahead UK electricity price,Site_Heat_Demand_(kW),Import_Electricity_(kW),Export_Electricity_(kW)
*/

export default function Reports() {
    const [option, setOption] = useState({
        "series": {
            
        "type": "sankey",
        "layout": "none",
        "emphasis": {
            "scale": true,
            "scaleSize": 20,
            "focus": "adjacency",
        },
        "data": [
            {
                "name": "CHP1_Electricity_Generation_(kW)",
                "value": 0
            },
            {
                "name": "CHP2_Electricity_Generation_(kW)",
                "value": 0
            },
            {
                "name": "CHP1_Heat_Output_(kW)",
                "value": 0
            },
            {
                "name": "CHP2_Heat_Output_(kW)",
                "value": 0
            },
            {
                "name": "Boiler_Heat_Output_(kW)",
                "value": 0
            },
            {
                "name": "Site_Heat_Demand_(kW)",
                "value": 0
            },
            {
                "name": "Windows",
                "value": 0
            }
        ],
        links: [
            {
                source: "CHP1_Electricity_Generation_(kW)",
                target: "CHP1_Heat_Output_(kW)",
                value: 100
            },
            {
                source: "CHP2_Electricity_Generation_(kW)",
                target: "CHP2_Heat_Output_(kW)",
                value: 25
            },
            {
                source: "CHP2_Electricity_Generation_(kW)",
                target: "CHP1_Heat_Output_(kW)",
                value: 2
            },
            {
                source: "CHP1_Electricity_Generation_(kW)",
                target: "CHP2_Heat_Output_(kW)",
                value: 14
            },
            {
                source: "CHP1_Electricity_Generation_(kW)",
                target: "Windows",
                value: 170
            },
        ]
    
        }
    })

    return (
            <Card className="m-8 w-full col-span-8">
                <h1 className="text-4xl afterline mb-6">Energy flow</h1>

                <div className="w-full mt-16 border" id="chartContainer">
                    <ReactECharts option={ option } notMerge={true} style={{
                  height: '100%',
                  width: '100%',
                }} />
                </div>
            </Card>
    )   
}