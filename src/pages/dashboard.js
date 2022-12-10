import { signOut } from "next-auth/react";

import * as React from "react";

import { router } from "next/router";

import { Card } from "components/ui/Card"
import { KPIContainer } from "components/KPIContainer"
import { KPIData } from "../components/KPIData";

import Image from "next/image";

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
    <>
      { !isDownloading &&  <div className="grid grid-cols-11 gap-5 m-8 transition-opacity ease-in duration-700 w-full">
        { /* KPIs */ }
        
          
          <div className="col-span-4">
            <Card>
              <KPIContainer title="Site KPIs Last Week">
                <KPIData data={ kpiData.actual.weekly.usage } targetComparison={ kpiData.targets.weekly.usage || 0 } units="kW"/>
                <KPIData data={ kpiData.actual.weekly.cost } targetComparison={ kpiData.targets.weekly.cost || 0} units="£"/>
                <KPIData data={ kpiData.actual.weekly.carbonEmissions } targetComparison={ kpiData.targets.weekly.carbonEmissions || 0 } units="tCO₂e"/>
              </KPIContainer>
            </Card>
          </div>
          <div className="col-span-4">
            <Card>
              <KPIContainer title="Site KPIs Last Month">
              <KPIData data={ kpiData.actual.monthly.usage } targetComparison={ kpiData.targets.monthly.usage || 0 } units="kW"/>
                <KPIData data={ kpiData.actual.monthly.cost } targetComparison={ kpiData.targets.monthly.cost || 0} units="£"/>
                <KPIData data={ kpiData.actual.monthly.carbonEmissions } targetComparison={ kpiData.targets.monthly.carbonEmissions || 0 } units="tCO₂e"/>
              </KPIContainer>
            </Card>
          </div>
    
      { /* Optimisations */ }
        <div className="col-span-3">
          <Card>
            <div className="flex flex-col">
              <h1 className="text-5xl afterline">Pending optimisations</h1>
              <div className="flex mt-6 justify-center items-center">
                <h1 className="text-8xl">4</h1>
                <img src="/images/lightbulb.svg" alt="Optimisations" style={{ filter: "invert(0.2)" }} className="ml-6 h-32" />
              </div>
              <div className="flex mt-6 mx-4 p-2 rounded bg-blue justify-center bg-[#B3DDEA] items-center">
                <img src="/images/info.svg" alt="Info" style={{ filter: "invert(0.2)" }} className="h-12 px-2" />
                <p>The earlier you action your optimisations, the more effective they will be. <u>Click here</u> to visit your Optimisations tab now.</p>
              </div>
            </div>
          </Card>
        </div>

      { /* Insights */ }
        <div className="col-span-11">
          <Card>
            <div className="flex flex-col">
              <h1 className="text-5xl afterline mb-6">Insights</h1>
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-1">
                  <div className="flex flex-row">
                    <img src="/images/snow.svg" alt="Insights" style={{ filter: "invert(0.2)" }} className="object-contain mr-4" />
                    <div>
                      <h2 className="text-3xl mb-2">Prepare for winter</h2>
                      <p>In light of recent news, National Grid is urging businesses to consume less power over the winter period. Check your Optimisations today and invest early to minimise spending increase.</p>
                    </div>
                  </div>
                </div>

                <div className="col-span-1">
                  <div className="flex flex-row">
                    <img src="/images/snow.svg" alt="Insights" style={{ filter: "invert(0.2)" }} className="object-contain mr-4" />
                    <div>
                      <h2 className="text-3xl mb-2">Energy Price Guarantee</h2>
                      <p>A new six-month scheme for businesses and other non-domestic energy users (including charities and public sector organisations like schools) will offer equivalent support as it being provided for consumers. This will protect you from soaring energy costs and provide better insights. As always, unit price changes will be taken into account when calculating your <u>Optimisations</u>. For more information, visit <u>gov.uk</u>.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

      </div>
      }
      
    </>
  );
}
