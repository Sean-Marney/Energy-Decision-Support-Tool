import { signOut } from "next-auth/react";
import { getSession } from "next-auth/react";
import arrowdown from "public/images/arrowdown.svg"
import arrowup from "public/images/arrowup.svg"
import reached from "public/images/reached.svg"
import Image from 'next/image'
import React from 'react';
import { calculateEnergyData } from '../lib/csv';

class KPIContainer extends React.Component {
  render() {
  return (
    <div>
      <h3 className="text-xl divide-y">{this.props.title}</h3>
            <KPIData data = {this.props.data.energyUsage} targetcomparison = {this.props.target[2]} units = " kwh"/>
            <br/>
            <KPIData data = {this.props.data.energyCost} targetcomparison = {this.props.target[1]} units = "£"/>
            <br/>
            <KPIData data = {this.props.data.carbonEmissions} targetcomparison = {this.props.target[0]} units = " tCO2e"/>
    </div>
    );
  }
}
class KPIData extends React.Component {
  render() {
    let imageSource, text;
    let comparsion = parseInt(this.props.targetcomparison) - parseInt(this.props.data);
    let positiveValue = Math.abs( comparsion );
    let value, kpiData;
    if (this.props.units == "£"){
      value = "£" + positiveValue;
      kpiData = "£" + this.props.data;
    }else{
      value = positiveValue + this.props.units;
      kpiData = this.props.data + this.props.units;
    }
    if (comparsion <0){
      imageSource =  arrowup;
      text = value + " Above";
    }  
    else if (comparsion >0){
      imageSource =  arrowdown;
      text = value + " Below";
    }  
    else{
      imageSource =  reached;
      text = "Reached";
    }  
  return (
    <div>
      <h1 className='text-4xl font-bold text-left'>{kpiData}</h1>
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
          <div className="basis-2/5 border-2 m-4 shadow">
            <KPIContainer title="Site KPIs last week" data = {data[1]} target = {data[3]}/>    
          </div>
          <div className="basis-2/5 border-2 m-4 shadow">
            <KPIContainer title="Site KPIs last month" data = {data[0]} target = {data[4]}/>    
          </div>
          <div className="basis-1/5 border-2 m-4 shadow">
            <div className = "flex flex-col">
                <h3 className="text-3xl">Pending optimisations</h3>
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
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: session.user.email,
      },
    });
  } catch (error) {
    return {
      redirect: {
        destination: "/home",
        permanent: false,
      },
    };
  }
  let number = 0;
  try {
    const optimisations = await prisma.optimisations.findMany({});
    number = optimisations.length;
  } catch (error) {
      console.log(error);
  };
  let targets;
  try {
    targets = await prisma.targets.findMany(  {   
      take: 6,
      where: {
        organisation: 1,
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
      console.log(targets);
  } catch (error) {
      console.log(error);
  };
  let weekly = [targets[0].value,targets[2].value,targets[4].value]
  let monthly = [targets[1].value,targets[3].value,targets[5].value]
  const data = calculateEnergyData("NHS");
  data[2] = number;
  data[3] = weekly;
  data[4] = monthly;
  // If admin or manager, show page
  return {
    props: {session , data}
  };
}