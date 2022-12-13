import * as React from "react";
import TargetDisplay from "../components/target/TargetDisplay";

import DisplayBars from "../components/target/DisplayBars";

import Card from "../components/ui/Card"
import { Button } from "../components/ui/Button"
import Pip from "../components/ui/Selector/Pip"

import ShowTargets from "../components/target/ShowTargets";
import ModifyTargets from "../components/target/ModifyTargets";
import { getCookieParser } from "next/dist/server/api-utils";

export default function Targets({ data }) {
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

  const [targetsData, setTargetsData] = React.useState([])

  const [KPIData, setKPIData] = React.useState([])

  const [isLoaded, setIsLoaded] = React.useState(false)
  const [isDownloading, setIsDownloading] = React.useState(true)

  const [timeframe, setTimeframe] = React.useState("Weekly")

  const [editMode, setEditMode] = React.useState(false)

  function getData(){
    fetch('/api/target?site=' + getCookie("site")).then(async (response) => {
      const body = await response.json()
      setTargetsData(body)
      fetch('/api/kpi?site=' + getCookie("site")).then(async (response) => {
        const body = await response.json()
        setKPIData(body["actual"])
        setIsDownloading(false)
      })
    })
  }

  function setData(){
    fetch('http://localhost:3000/api/target?site=' + getCookie("site"), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(targetsData)
    })
  }

  function modificationFunction(index, value){
    let temp = targetsData
    temp[index].value = value
    setTargetsData(temp)
    setData(temp)
  }

  React.useEffect(() => {
    if (!isLoaded) {
      getData()
      setIsLoaded(true)
    }
  }, [])

  return (
    <Card className="m-8 w-full">
      <div className="flex flex-row mb-6">
        <Pip text="Weekly" position="left" selected={timeframe == 'Weekly'} onClick={ () => setTimeframe('Weekly') } />
        <Pip text="Monthly" position="right" selected={timeframe == 'Monthly'} onClick={ () => setTimeframe('Monthly') } />
      </div>
      <div className="grid grid-cols-2">
        <div className="col-span-1">
          <h1 className="text-5xl afterline mb-12">Targets</h1>
          {!editMode && <ShowTargets targets={targetsData.filter(target => target.timeframe == timeframe.toLowerCase())} editModeToggle={setEditMode} />}
          {editMode && <ModifyTargets targets={targetsData.filter(target => target.timeframe == timeframe.toLowerCase())} editModeToggle={setEditMode} modificationFunction={modificationFunction} />}
        </div>
        {!editMode && !isDownloading && <DisplayBars targets={targetsData.filter(target => target.timeframe == timeframe.toLowerCase())} kpi={KPIData} />}
      </div>
    </Card>
  )
}