import { getSession } from "next-auth/react"
import * as React from "react";
import { calculateEnergyData } from '../lib/csv';
import { readTargets } from '../lib/database_functions';
import { readUnArchivedOptimisations } from '../lib/database_functions';
import { useState } from "react";
import { RedLine } from "../components/RedLine";
export default function Dashboard({data}) {

  const [cost, setCost] = useState(0);
  const [isPaid, setIsPaid] = useState(true);
  const [supplierEnergyUsage, setSupplierEnergyUsage] = useState(data[0].energyUsage);
  const [supplierEnergyCost, setSupplierEnergyCost] = useState(data[0].energyCost);
  const [showBillMsg, setShowBillMsg] = useState(false);
  const [energyCost, setEnergyCost] = useState(data[0].energyCost);
  const [isEditing, setIsEditing] = useState(false);


  // displays message 
  function addBill() {
    setIsEditing(false)
    setIsPaid(true);
    setShowBillMsg(true);
  }

  function calcualteManualCost(value, type){
    if(type == 'usage') {
        setSupplierEnergyUsage(parseInt(value))
    }
    if(type == 'cost') {
        setCost(parseInt(value))
        setSupplierEnergyCost(parseInt(value))
    }
    setShowBillMsg(false);
    setEnergyCost(data[1].energyCost)
  }
  
  return (
    <div>
      <main>
        <div className="flex flex-row">
          <div className="basis-2/5 border-2 m-4 shadow px-2">
            <div>
                <h3 className="text-xl divide-y text-left">Last Month's Shadow Bill</h3>
                    <RedLine />
                    <br/>
                    <p className="px-2">Total Energy Consumption</p>
                    <h1 className='font-black text-4xl text-left px-2'>{data[1].energyUsage} KW</h1>
                    {/* <KPIData data={data[1].energyUsage} targetcomparison = {data[3].energyTarget} units = " KW"/> */}
                    <br/>
                    <p className="px-2">Total Energy Cost</p>
                    <h1 className='font-black text-4xl text-left px-2'>{data[1].energyCost}£</h1>
                    {/* <KPIData data={data[1].energyCost} targetcomparison = {data[3].costTarget} units = "£"/> */}
                    <br/>
            </div>
            {/* <KPIContainer bill_page={true} title="Last Month's Shadow Bill" data = {data[1]} target = {data[3]}/>     */}
          </div>
          <div className="basis-2/5 border-2 m-4 shadow px-2">
                    
            {/* <KPIContainer editable={true} bill_page={true} title="Last Month's Energy Supplier Bill" data = {data[0]} target = {data[4]}/> */}
            <div>
                <h3 className="text-xl divide-y text-left">Last Month's Energy Supplier Bill</h3>
                <RedLine />
                    <br/>
                    <p className="px-2">Total Energy Consumption</p>
                        { isEditing ? 
                            <>
                                <input onChange={(e) => calcualteManualCost(e.target.value, 'usage')} type='number' defaultValue={supplierEnergyUsage}></input>
                            </> :
                            <>
                                <h1 className='font-black text-4xl text-left px-2'>{supplierEnergyUsage} KW</h1>
                            </>
                        }
                        <br/>
                        <p className="px-2">Total Energy Cost</p>
                        {isEditing ? 
                            <>
                                <input onChange={(e) => calcualteManualCost(e.target.value, 'cost')} type='number' defaultValue={supplierEnergyCost} ></input>
                             </> :
                             <>
                                <h1 className='font-black text-4xl text-left px-2'>{supplierEnergyCost}£</h1>
                            </>
                        }
                    <br/>
                  {!isPaid ?
                  <>
                    <button
                        class="bg-slate-700 hover:bg-slate-600 tracking-wide text-gray-50 text-sm font-bold py-2 px-16 inline-flex items-center"
                        onClick={addBill}
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
                  </> : <>
                    <button
                        class="bg-slate-700 hover:bg-slate-600 tracking-wide text-gray-50 text-sm font-bold py-2 px-16 inline-flex items-center"
                        onClick={() => {
                            setIsEditing(true);            
                            setIsPaid(false)
                        }}
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

                        <span className="pl-2">Add bill</span>
                    </button>
                  </>
                  }
                  
            </div>
          </div>
        </div> 
 
      </main>
      {showBillMsg && 
        <div>
        { energyCost > cost && 
            <>
                <p>Energy supplier calculated your total energy cost to be <span className="color-green">{energyCost - cost}£</span> lower than your shadow bill</p>
            </>
        }
        { energyCost < cost && 
            <>
                <p>Energy supplier calculated your total energy cost to be <span className="color-red">{Math.abs(cost - energyCost)}£</span> higher than your shadow bill</p>
            </>
        }
        { energyCost == cost && 
            <>
                <p>Energy supplier calculated your total energy cost to be same your shadow bill</p>
            </>
        }
        </div>
      }

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
  // Reads optimisations from the database
  let optimisations = await readUnArchivedOptimisations(organisationID);
  let number = optimisations.length
  // Reads the energy data from the CSV File
  const data = calculateEnergyData(organisationID);
  // Sends all the data to the page
  data[2] = number;
  // Reads the weekly and monthly targets for energy, cost and carbon for the organisation from the database
  let targetData=await readTargets(organisationID);
  data[3] = targetData[0];
  data[4] = targetData[1];
  // If admin or manager, show page
  return {
    props: {session , data}
  };
}
