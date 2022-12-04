import { useState } from "react";
import { getSession } from "next-auth/react";
import * as React from "react";
import { calculateEnergyData } from '../lib/csv';
import { readTargets } from '../lib/database_functions';

// Function to update the targets
// This is where there is an issue
// Issue
async function updateTargets(type,newValue ,length, organisation){
  // Updates targets in the database
  try {
    const targets = await prisma.targets.update({
      where: {
        organisationID: organisation,
        name: type,
        timeframe : length
      },
      data: {
        value: newValue,
      }
    });
    return targets;
  } catch (error) {
      console.debug(error);
    return error;
  };
}


export default function Targets({data}) {
  // Sets it to the energy data
  const progressData = data[0][1];
  const progressDataMonth = data[0][0];

  // Stores weekly and monthly targets
  const weeklyTargets = data[1][0];
  const monthlyTargets = data[1][1];

  // Stores the current organisation
  const organisationID = data[2];

  const [targetType, setTargetType] = useState("week");


  // Set target data to the weekly targets
  const [energy, setEnergy] = useState(weeklyTargets.energyTarget);
  const [cost, setCost] = useState(weeklyTargets.costTarget);
  const [carbon, setCarbon] = useState(weeklyTargets.carbonTarget);

  // Set target data to the monthly targets
  const [energyMonth, setEnergyMonth] = useState(monthlyTargets.energyTarget);
  const [costMonth, setCostMonth] = useState(monthlyTargets.costTarget);
  const [carbonMonth, setCarbonMonth] = useState(monthlyTargets.carbonTarget);

  const [isSaved, setIsSaved] = useState(true);

  const [energyProgress, setEnergyProgress] = useState("88%");
  const [costProgress, setCostProgress] = useState("80%");
  const [carbonProgress, setCarbonProgress] = useState("100%");

  const [energyProgressMonth, setEnergyProgressMonth] = useState("88%");
  const [costProgressMonth, setCostProgressMonth] = useState("80%");
  const [carbonProgressMonth, setCarbonProgressMonth] = useState("100%");

  // Handles saving the function
  async function handleSave(type){
    // Handles progress
    if (type == "week"){
      handleProgress();
  
    }else{
      handleMonthProgress();
    }
    // Retrieves the values from the text box
    let energy = document.getElementById("energy").value;
    let cost = document.getElementById("cost").value;
    let carbon = document.getElementById("carbon").value;
    let timeframe = type === 'week' ? 'weekly' : 'monthly';
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({energy,cost,carbon,organisationID,timeframe})
    };
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/targets`, requestOptions)
        .then(response => response.json())
        .then(data => alert(data.response));
    // alert(await updateTargets("energy", energy, type, organisationID));

  }


  function handleProgress(){
    setEnergyProgress(
      `${
        (progressData.energyUsage / parseInt(energy)) * 100 > 100
          ? 100
          : (progressData.energyUsage / parseInt(energy)) * 100
      }%`
    );

    setCostProgress(
      `${
        (progressData.energyCost / parseInt(cost)) * 100 > 100
          ? 100
          : (progressData.energyCost / parseInt(cost)) * 100
      }%`
    );

    setCarbonProgress(
      `${
        (progressData.carbonEmissions / parseInt(carbon)) * 100 > 100
          ? 100
          : (progressData.carbonEmissions / parseInt(carbon)) * 100
      }%`
    );
    setIsSaved(true);
  };

  function handleMonthProgress () {
    setEnergyProgressMonth(
      `${
        (parseInt(progressDataMonth.energyUsage) / parseInt(energyMonth)) * 100 > 100
          ? 100
          : (parseInt(progressDataMonth.energyUsage) / parseInt(energyMonth)) * 100
      }%`
    );

    setCostProgressMonth(
      `${
        (progressDataMonth.energyCost / parseInt(costMonth)) * 100 > 100
          ? 100
          : (progressDataMonth.energyCost / parseInt(costMonth)) * 100
      }%`
    );

    setCarbonProgressMonth(
      `${
        (progressDataMonth.carbonEmissions / parseInt(carbonMonth)) * 100 > 100
          ? 100
          : (progressDataMonth.carbonEmissions / parseInt(carbonMonth)) * 100
      }%`
    );
    setIsSaved(true);
  };

  return (
    <div className="container mx-auto text-center p-5 h-full">
      <div className="container mx-auto text-center px-5 py-10 h-full bg-white rounded-md shadow-lg">
        <div className="flex justify-between">
          <div className="w-1/2">
            <div className="flex">
              <div className="mb-1 text-2xl text-black-700 font-black">
                Targets
                <div className="w-2/5 h-1.5 mb-4 dark:bg-gray-700">
                  <div
                    className="h-1.5"
                    style={{ width: "100%", background: "#D4374A" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/2">
            <div
              className={`flex ${isSaved ? "justify-between" : "justify-end"}`}
            >
              {isSaved && (
                <div className="mb-1 text-2xl text-black-700 font-black">
                  Progress
                  <div className="w-2/5 h-1.5 mb-4 dark:bg-gray-700">
                    <div
                      className="h-1.5"
                      style={{ width: "100%", background: "#D4374A" }}
                    ></div>
                  </div>
                </div>
              )}
              <div className="mt-2">
                <button
                  className={`rounded-l-3xl pl-5 pr-5 pt-2 pb-2 relative text-sm ${
                    targetType === "week" ? "text-white" : "bg-white text-black"
                  }`}
                  onClick={() => {
                    setTargetType("week");
                    isSaved && handleProgress();
                  }}
                  style={{
                    background: targetType === "week" ? "#D4374A" : "",
                  }}
                >
                  Week
                </button>
                <button
                  className={`rounded-r-3xl pl-5 pr-5 pt-2 pb-2 relative text-sm ${
                    targetType === "month"
                      ? "text-white"
                      : "bg-white text-black"
                  }`}
                  onClick={() => {
                    setTargetType("month");
                    isSaved && handleMonthProgress();
                  }}
                  style={{
                    background: targetType === "month" ? "#D4374A" : "",
                  }}
                >
                  Month
                </button>
              </div>
            </div>
          </div>
        </div>
        {!isSaved ? (
          <>
            <div className="">
              <div className="flex items-baseline flex-col">
                <div className="text-sm">Energy Consumption</div>
                <div>
                  <input
                    id = "energy"
                    className="h-12 rounded-none border border-gray-400 outline-0 text-4xl w-60 font-black"
                    type="number"
                    name="Energy Consumption"
                    value={targetType === "week" ? energy : energyMonth}
                    onChange={(e) =>
                      targetType === "week"
                        ? setEnergy(e.target.value)
                        : setEnergyMonth(e.target.value)
                    }
                  />
                  <span className="pl-2 text-4xl font-black text-gray-800">
                    kW h
                  </span>
                </div>
              </div>

              <div className="flex items-baseline flex-col mt-6">
                <div className="text-sm">Cost</div>
                <div>
                  <span className="pr-2 text-4xl font-black text-gray-800">
                    £
                  </span>
                  <input
                    id = "cost"
                    className="h-12 rounded-none border border-gray-400 outline-0 text-4xl w-60 font-black"
                    type="number"
                    name="Cost"
                    value={targetType === "week" ? cost : costMonth}
                    onChange={(e) =>
                      targetType === "week"
                        ? setCost(e.target.value)
                        : setCostMonth(e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="flex items-baseline flex-col mt-6">
                <div className="text-sm">Carbon Emissions</div>
                <div>
                  <input
                    id = "carbon"
                    className="h-12 rounded-none border border-gray-400 outline-0 text-4xl w-60 font-black"
                    type="number"
                    name="Carbon Emissions"
                    value={targetType === "week" ? carbon : carbonMonth}
                    onChange={(e) =>
                      targetType === "week"
                        ? setCarbon(e.target.value)
                        : setCarbonMonth(e.target.value)
                    }
                  />
                  <span className="pl-2 text-4xl font-black text-gray-800">
                    tCO<sub>2</sub>e
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-baseline flex-col mt-6">
              <button
                class={`tracking-wide text-gray-50 text-sm font-bold py-2 px-16 inline-flex items-center ${
                  (
                    targetType === "week"
                      ? !(energy && cost && carbon)
                      : !(energyMonth && costMonth && carbonMonth)
                  )
                    ? "bg-slate-400"
                    : "bg-slate-700 hover:bg-slate-600"
                }`}
                onClick={() =>
                  targetType === "week"
                    ? handleSave("week")
                    : handleSave("month")
                }


                disabled={
                  targetType === "week"
                    ? !(energy && cost && carbon)
                    : !(energyMonth && costMonth && carbonMonth)
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-4 h-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                  />
                </svg>
                <span className="pl-2">Save</span>
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex">
              <div className="w-1/2">
                <div className="flex items-baseline flex-col mt-6">
                  <div className="text-sm">Energy Consumption</div>
                  <div className="text-4xl font-black">
                    {targetType === "week" ? energy : energyMonth}
                  </div>
                </div>
                <div className="flex items-baseline flex-col mt-6">
                  <div className="text-sm">Cost</div>
                  <div className="text-4xl font-black">
                    £ {targetType === "week" ? cost : costMonth}
                  </div>
                </div>
                <div className="flex items-baseline flex-col mt-6">
                  <div className="text-sm">Carbon Emissions</div>
                  <div className="text-4xl font-black">
                    {targetType === "week" ? carbon : carbonMonth}
                  </div>
                </div>
                <div className="flex items-baseline flex-col mt-6">
                  <button
                    class="bg-slate-700 hover:bg-slate-600 tracking-wide text-gray-50 text-sm font-bold py-2 px-16 inline-flex items-center"
                    onClick={() => setIsSaved(false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-4 h-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>

                    <span className="pl-2">Edit</span>
                  </button>
                </div>
              </div>
              <div className="w-1/2">
                <div class="w-full bg-slate-700 dark:bg-slate-700 h-10 mt-5">
                  <div
                    class="flex items-center p-2 text-2xl font-black text-white text-left p-0.5 leading-none h-10"
                    style={{
                      width:
                        targetType === "week"
                          ? energyProgress
                          : energyProgressMonth,
                      background: "#D4374A",
                    }}
                  >
                    {targetType === "week"
                      ? progressData.energy
                      : progressDataMonth.energy}
                    <span className="pl-2">kWh</span>
                  </div>
                </div>
                <div class="w-full bg-slate-700 dark:bg-slate-700 h-10 mt-10">
                  <div
                    class="flex items-center p-2 text-2xl font-black text-white text-left p-0.5 leading-none h-10"
                    style={{
                      width:
                        targetType === "week"
                          ? costProgress
                          : costProgressMonth,
                      background: "#D4374A",
                    }}
                  >
                    <span>£</span>
                    {targetType === "week"
                      ? progressData.cost
                      : progressDataMonth.cost}
                  </div>
                </div>
                <div class="w-full bg-slate-700 dark:bg-slate-700 h-10 mt-10">
                  <div
                    class="flex items-center p-2 text-2xl font-black text-white text-left p-0.5 leading-none h-10"
                    style={{
                      width:
                        targetType === "week"
                          ? carbonProgress
                          : carbonProgressMonth,
                      background: "#D4374A",
                    }}
                  >
                    {targetType === "week"
                      ? progressData.carbon
                      : progressDataMonth.carbon}
                    <span className="pl-2">
                      tCO<sub>2</sub>e
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
// Protects route
export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  // Code to ensure if user no longer has their session cookies (ie. is now logged out), they will be returned home - this prevents null user error
  // TODO - Only have one instance of 'get user' code to reduce repeated code
  let organisationID;
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: session.user.email,
      },
    });
    organisationID = user.organisation;
  } catch (error) {
    return {
      redirect: {
        destination: "/home",
        permanent: false,
      },
    };
  }

  // Reads the energy data from the CSV File
  const energyData = calculateEnergyData(organisationID);
  // Reads the weekly and monthly targets for energy, cost and carbon for the organisation from the database
  const targets=await readTargets(organisationID);
  let data = [energyData, targets,organisationID];
  return {
    props: {session, data}
  };
}