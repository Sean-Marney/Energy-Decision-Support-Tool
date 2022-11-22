import { signOut } from "next-auth/react";
import { getSession } from "next-auth/react";
import Image from 'next/image'
import React from 'react';
import { calculateEnergyData } from '../lib/csv';
import { KPIContainer }  from '../components/KPIContainer';
import { RedLine } from '../components/RedLine';
export default function Dashboard({data}) {
  function handleSignOut() {
    signOut();
  }

  return (
    <div>
      <main>
        <div className="flex flex-row">
{/* KPI Data section */}
          <div className="basis-2/5 border-2 m-4 shadow">
            <KPIContainer title="Site KPIs last week" data = {data[1]} target = {data[3]}/>    
          </div>
          <div className="basis-2/5 border-2 m-4 shadow">
            <KPIContainer title="Site KPIs last month" data = {data[0]} target = {data[4]}/>    
          </div>
{/* Optimisations section */}
          <div className="basis-1/5 border-2 m-4 shadow">
            <div className = "flex flex-col">
                <h3 className="text-xl text-left">Pending optimisations</h3>
                <RedLine />
              <div className="flex flex-row">
                <div className="basis-1/3 h-full">
                  <br/>
                  <br/>
                  <h3 className="text-5xl font-bold">{data[2]}</h3>
                </div>                
                <div className="basis-2/3">
                  <Image
                    src="/images/lightbulb.svg"
                    height={144}
                    width={144}
                    alt="Optimisations"
                  />
                </div>  
              </div>
              <div>
                <div className='bg-cyan-200	 m-1 flex flex-row'>
                  <div className = "basis-1/4">
                    <br/>
                    <Image
                      src="/images/info.svg"
                      height={49}
                      width={49}
                      alt="Optimisations"
                    />
                  </div>
   <div className='basis-3/4'>
                    <p className='text-xs	'>The earlier you action your optimisations, the more effective they will be.
  Click here to visit your Optimisations tab now.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> 
{/* Code for insights if we wanted to add them to the page */}
                {/* <div className='border-2 m-4 shadow'>
        <h3 className="text-3xl">Insights</h3>
        <div className="flex flex-row">
        <div className="basis-1/2">
            <div className='flex flex-row'>
              <div className = "basis-1/4">
                <br/>
                <Image
                src="/images/snow.svg"
                height={49}
                width={49}
                alt="Prepare for winter"
                />
              </div>
              <div className='basis-3/4'>
                <p className='text-sm	'>In light of recent news, National Grid is urging businesses to consume less power over the winter period. Check your Optimisations today and invest early to minimise spending increase.</p>
              </div>
            </div>
          </div>
          <div className="basis-1/2">
            <div className='flex flex-row'>
              <div className = "basis-1/4">
                <br/>
                <Image
                src="/images/pound.svg"
                height={49}
                width={49}
                alt="Energy Price Guarantee"
                />
              </div>
              <div className='basis-3/4'>
                <p className='text-sm	'>A new six-month scheme for businesses and other non-domestic energy users (including charities and public sector organisations like schools) will offer equivalent support as is being provided for consumers. This will protect you from soaring energy costs and provide better insights.
As always, unit price changes will be taken into account when calculating your Optimisations.
For more information, visit gov.uk.</p>
              </div>
            </div>
          </div>
        </div>  
        </div>   */}
      </main>
      <div className="flex justify-center">
        <button
          className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 bg-gray-300"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
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
  console.log(organisationID);
  // Reads optimisations from the database
  let number = await readOptimisations(organisationID);
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

// Function to read the optimisations for the organisation
export async function readOptimisations(organisationID){
  // Reads number of optimisations in the database
  let number = 0;
    try {
      const optimisations = await prisma.optimisations.findMany({
        where: {
          organisation: organisationID,
          archived : false
        }
      });
      number = optimisations.length;
    } catch (error) {
        console.log(error);
    };
  return number;
}


// Function to read the weekly and monthly targets for the organisation
export async function readTargets(organisationID){
    let targets, weekly = [0,0,0], monthly = [0,0,0], data = [];
    // Reads from the database
    try {
      targets = await prisma.targets.findMany(  {   
        take: 6,
        where: {
          organisation: organisationID,
        },  
        orderBy: [
          {
            name: 'asc',
          },
          {
            timeframe: 'desc',
          },
          ],
        });
    // Splits the target data up into weekly and monthly targets
    weekly = [targets[0].value,targets[2].value,targets[4].value]
    monthly = [targets[1].value,targets[3].value,targets[5].value]
    data[0] = weekly;
    data[1] = monthly;
    } catch (error) {
        console.log(error);
    };
    // Returns the data
    return data;
  }

