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
            <KPIData data = {this.props.data.energyUsage} targetcomparison = {this.props.data.comparsionToEnergyTarget}/>
            <KPIData data = {this.props.data.energyCost} targetcomparison = {this.props.data.comparsionToCostTarget}/>
            <KPIData data = {this.props.data.carbonEmissions} targetcomparison = {this.props.data.comparsionToCarbonTarget}/>
    </div>
    );
  }
}
class KPIData extends React.Component {
  render() {
  return (
    <div>
      <h1 className='text-3xl font-bold'>{this.props.data}</h1>
        <TargetComparison value = {this.props.targetcomparison}/>
    </div>
    );
  }
}


class TargetComparison extends React.Component {
  render() {
    let imageSource, text;
    if (this.props.value >0){
      imageSource =  arrowup;
      text = "Above";
    }  
    else if (this.props.value <0){
      imageSource =  arrowdown;
      text = "Below";
    }  
    else{
      imageSource =  reached;
      text = "Reached";
    }  
      return ( 
      <div className="flex flex-row">   
        <Image
          src={imageSource}
          height={25}
          width={25}
          alt= {text}
        />
        <p>{text} your target</p>
      </div>  
      );
    }
}

export default function Dashboard({data},{numberOfOptimisations}) {
  function handleSignOut() {
    signOut();
  }

  return (
    <div>
      {/* <Head>
        <title>Dashboard</title>
      </Head> */}
      <main>
        <div className="flex flex-row">
          <div className="basis-2/5 border-2 m-4 shadow">
            <KPIContainer title="Site KPIs last week" data = {data[1]}/>    
          </div>
          <div className="basis-2/5 border-2 m-4 shadow">
            <KPIContainer title="Site KPIs last month" data = {data[0]}/>    
          </div>
          <div className="basis-1/5 border-2 m-4 shadow">
            <div className = "flex flex-col">
                <h3 className="text-3xl">Pending optimisations</h3>
              <div className="flex flex-row">
                <div className="basis-1/3 h-full">
                  <br/>
                  <br/>
                  <h3 className="text-5xl font-bold align-middle">{numberOfOptimisations}</h3>
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
  const data = calculateEnergyData("NHS")
  // If admin or manager, show page
  return {
    props: { session , data}
  };
}
