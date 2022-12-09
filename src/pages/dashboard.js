import { signOut } from "next-auth/react";

import * as React from "react";

import { router } from "next/router";

import { Card } from "components/ui/Card"
import { KPIContainer } from "components/KPIContainer"
import { KPIData } from "../components/KPIData";

export default function Dashboard() {
  function handleSignOut() {
    signOut();
  }

  function selectOptimisations() {
    router.push("http://localhost:3000/optimisations");
  }

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

  const [kpiData, setKpiData] = React.useState(null)

  const [isLoaded, setIsLoaded] = React.useState(false)
  const [isDownloading, setIsDownloading] = React.useState(true)

  function getData(){
    fetch('http://localhost:3000/api/kpi/get?site=' + getCookie("site") + "&organisation=" + getCookie("organisation")).then(async (response) => {
      setKpiData(await response.json())
      setIsDownloading(false)
    })
  }

  React.useEffect(() => {
    if(!isLoaded){
      getData()
      setIsLoaded(true)
    }
  }, [])

  return (
    <div>
      <main>
        { !isDownloading && <div className="grid grid-cols-12 m-8 transition-opacity ease-in duration-700">
          
          <div className="col-span-5 mr-6">
            <Card>
              <KPIContainer title="Site KPIs Last Week">
                <KPIData data={ kpiData.actual.weekly.usage } targetComparison={ kpiData.targets.weekly.usage || 0 } units="kW"/>
                <KPIData data={ kpiData.actual.weekly.cost } targetComparison={ kpiData.targets.weekly.cost || 0} units="£"/>
                <KPIData data={ kpiData.actual.weekly.carbonEmissions } targetComparison={ kpiData.targets.weekly.carbonEmissions || 0 } units="tCO₂e"/>
              </KPIContainer>
            </Card>
          </div>
          <div className="col-span-5">
            <Card>
              <KPIContainer title="Site KPIs Last Month">
              <KPIData data={ kpiData.actual.monthly.usage } targetComparison={ kpiData.targets.monthly.usage || 0 } units="kW"/>
                <KPIData data={ kpiData.actual.monthly.cost } targetComparison={ kpiData.targets.monthly.cost || 0} units="£"/>
                <KPIData data={ kpiData.actual.monthly.carbonEmissions } targetComparison={ kpiData.targets.monthly.carbonEmissions || 0 } units="tCO₂e"/>
              </KPIContainer>
            </Card>
          </div>
        </div> }
      </main>
      <div className="flex justify-center"></div>
    </div>
  );
}
