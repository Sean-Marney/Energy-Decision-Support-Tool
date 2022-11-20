
import Link from "next/link";
import { useState } from "react";
import styles from "../styles/Form.module.css";

export default function Targets() {
  const progressData = {
    energy: 1325,
    cost: 1846,
    carbon: 12,
  };

  const [targetType, setTargetType] = useState("week");

  const [energy, setEnergy] = useState("");
  const [cost, setCost] = useState("");
  const [carbon, setCarbon] = useState("");

  const [isSaved, setIsSaved] = useState(false);

  const [energyProgress, setEnergyProgress] = useState("88%");
  const [costProgress, setCostProgress] = useState("80%");
  const [carbonProgress, setCarbonProgress] = useState("100%");

  const handleProgress = () => {
    setEnergyProgress(
      `${
        (progressData.energy / parseInt(energy)) * 100 > 100
          ? 100
          : (progressData.energy / parseInt(energy)) * 100
      }%`
    );

    setCostProgress(
      `${
        (progressData.cost / parseInt(cost)) * 100 > 100
          ? 100
          : (progressData.cost / parseInt(cost)) * 100
      }%`
    );

    setCarbonProgress(
      `${
        (progressData.carbon / parseInt(carbon)) * 100 > 100
          ? 100
          : (progressData.carbon / parseInt(carbon)) * 100
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
                    className="bg-red-700 h-1.5 dark:bg-red-700"
                    style={{ width: "100%" }}
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
                      className="bg-red-700 h-1.5 dark:bg-red-700"
                      style={{ width: "100%" }}
                    ></div>
                  </div>
                </div>
              )}
              <div className="mt-2">
                <button
                  className={`rounded-l-3xl pl-5 pr-5 relative text-sm ${
                    targetType === "week"
                      ? "bg-red-700 text-white"
                      : "bg-white text-black"
                  }`}
                  onClick={() => setTargetType("week")}
                >
                  Week
                  <div className="inline-flex absolute -top-3 -right-0 justify-center items-center w-4 h-5 text-xs font-bold text-grey bg-yellow-300 border-2 border-stone-400 dark:border-gray-900">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#57534e"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="#57534e"
                      class="w-2 h-2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                      />
                    </svg>
                  </div>
                </button>
                <button
                  className={`rounded-r-3xl pl-5 pr-5 relative text-sm ${
                    targetType === "month"
                      ? "bg-red-700 text-white"
                      : "bg-white text-black"
                  }`}
                  onClick={() => setTargetType("month")}
                >
                  Month
                  <div className="inline-flex absolute -top-3 -right-0 justify-center items-center w-4 h-5 text-xs font-bold text-grey bg-yellow-300 border-2 border-stone-400 dark:border-gray-900">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#57534e"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="#57534e"
                      class="w-2 h-2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                      />
                    </svg>
                  </div>
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
                    className="h-12 rounded-none border border-gray-400 outline-0 text-4xl w-60 font-black"
                    type="text"
                    name="Energy Consumption"
                    value={energy}
                    onChange={(e) => setEnergy(e.target.value)}
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
                    className="h-12 rounded-none border border-gray-400 outline-0 text-4xl w-60 font-black"
                    type="text"
                    name="Cost"
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-baseline flex-col mt-6">
                <div className="text-sm">Carbon Emissions</div>
                <div>
                  <input
                    className="h-12 rounded-none border border-gray-400 outline-0 text-4xl w-60 font-black"
                    type="text"
                    name="Carbon Emissions"
                    value={carbon}
                    onChange={(e) => setCarbon(e.target.value)}
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
                  !(energy && cost && carbon)
                    ? "bg-slate-400"
                    : "bg-slate-700 hover:bg-slate-600"
                }`}
                onClick={() => handleProgress()}
                disabled={!(energy && cost && carbon)}
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
                  <div className="text-4xl font-black">{energy}</div>
                </div>
                <div className="flex items-baseline flex-col mt-6">
                  <div className="text-sm">Cost</div>
                  <div className="text-4xl font-black">£ {cost}</div>
                </div>
                <div className="flex items-baseline flex-col mt-6">
                  <div className="text-sm">Carbon Emissions</div>
                  <div className="text-4xl font-black">{carbon}</div>
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
                    class="flex items-center p-2 bg-red-700 text-2xl font-black text-white text-left p-0.5 leading-none h-10"
                    style={{ width: energyProgress }}
                  >
                    {progressData.energy}
                    <span className="pl-2">kWh</span>
                  </div>
                </div>
                <div class="w-full bg-slate-700 dark:bg-slate-700 h-10 mt-10">
                  <div
                    class="flex items-center p-2 bg-red-700 text-2xl font-black text-white text-left p-0.5 leading-none h-10"
                    style={{ width: costProgress }}
                  >
                    <span>£</span>
                    {progressData.cost}
                  </div>
                </div>
                <div class="w-full bg-slate-700 dark:bg-slate-700 h-10 mt-10">
                  <div
                    class="flex items-center p-2 bg-red-700 text-2xl font-black text-white text-left p-0.5 leading-none h-10"
                    style={{ width: carbonProgress }}
                  >
                    {progressData.carbon}
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
