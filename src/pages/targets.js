import * as React from "react";
import TargetDisplay from "../components/target/TargetDisplay";

import Card from "../components/ui/Card"
import {Button} from "../components/ui/Button"

import { FaEdit } from "react-icons/fa";
import ShowTargets from "../components/target/ShowTargets";
import ModifyTargets from "../components/target/ModifyTargets";

export default function Targets({data}) {
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

  const [targetsData, setTargetsData] = React.useState([])

  const [isLoaded, setIsLoaded] = React.useState(false)
  const [isDownloading, setIsDownloading] = React.useState(true)

  const [editMode, setEditMode] = React.useState(false)

  function getData(){
    fetch('http://localhost:3000/api/target?site=' + getCookie("site")).then(async (response) => {
      const body = await response.json()
      setTargetsData(body)
      setIsDownloading(false)
    })
  }

  function modificationFunction(index, value){
    alert(value)
    let temp = targetsData
    temp[index].value = value
    setTargetsData(temp)
  }

  React.useEffect(() => {
    if(!isLoaded){
      getData()
      setIsLoaded(true)
    }
  }, [])

  return (
    <Card className="m-8 w-full">
      <div className="grid grid-cols-2">
        <div className="col-span-1">
          <h1 className="text-5xl afterline mb-12">Targets</h1>
          { !editMode && <ShowTargets targets={ targetsData } editModeToggle={ setEditMode } /> }
          { editMode && <ModifyTargets targets={ targetsData } editModeToggle={ setEditMode } modificationFunction={ modificationFunction } /> }
        </div>
        <div className="col-span-1">
          <h1 className="text-5xl afterline">Progress</h1>
        </div>
      </div>
    </Card>
  )
}