import { signOut } from "next-auth/react";
import { getSession } from "next-auth/react";
import arrowdown from "public/images/arrowdown.svg"
import arrowup from "public/images/arrowup.svg"
import reached from "public/images/reached.svg"
import Image from 'next/image'
import React from 'react';
import { calculateEnergyData } from '../lib/csv';


// Container that contains KPI Data
class KPIContainer extends React.Component {
  render() {
  return (
    <div>
      <h3 className="text-xl divide-y text-left">{this.props.title}</h3>
            <RedLine />
            <br/>
            <KPIData data = {this.props.data.energyUsage} targetcomparison = {this.props.target[2]} units = " MW"/>
            <br/>
            <KPIData data = {this.props.data.energyCost} targetcomparison = {this.props.target[1]} units = "£"/>
            <br/>
            <KPIData data = {this.props.data.carbonEmissions} targetcomparison = {this.props.target[0]} units = " tCO2e"/>
    </div>
    );
  }
}

// Red Line for Styling
class RedLine extends React.Component{
  render (){
  return (
    <hr
      style={{
          color: "#D4374A",
          backgroundColor: "#D4374A",
          height: 5,
          width: 20
      }}
    />
  );
  }
}

// Specific KPI data and the comparison to targets
class KPIData extends React.Component {
  render() {
    let imageSource, text;
    // Compares the target and the data
    let comparison = parseInt(this.props.targetcomparison) - parseInt(this.props.data);
    // Converts the comparison to a positive number
    let positiveValue = Math.abs( comparison );
    let value, kpiData;
    // Amends the unit on to the data
    if (this.props.units == "£"){
      value = "£" + positiveValue;
      kpiData = "£" + this.props.data;
    }else{
      value = positiveValue + this.props.units;
      kpiData = this.props.data + this.props.units;
    }

    // Compares whether above or below their target and set image and text accordingly
    // Above their target
    if (comparison <0){
      imageSource =  arrowup;
      text = value + " above";
    }  
    // Below their target
    else if (comparison >0){
      imageSource =  arrowdown;
      text = value + " below";
    } 
    // Reached their target 
    else{
      imageSource =  reached;
      text = "Reached";
    }  
  return (
    <div>
      <h1 className='font-black text-4xl text-left'>{kpiData}</h1>
      <div className="flex flex-row text-left">   
        <Image
          src={imageSource}
          height={25}
          width={25}
          alt= {text}
        />
        <p className='text-xs'>{text} your target</p>
      </div> 
    </div>
    );
  }
}

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
          achived : false
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

