
import { useState } from "react";

import { getSession } from "next-auth/react";

import * as React from "react";
import { calculateEnergyData } from '../lib/csv';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { readTargets } from '../lib/database_functions';
function calculatecomparison(data,target){
  let comparison = {};
  comparison["energy"] = data.energyUsage/target.energyTarget;
  comparison["cost"] = data.energyCost/target.costTarget;
  comparison["carbon"] = data.carbonEmissions/target.carbonTarget;
  return comparison;
}

export default function Targets({energyData}, {targets}) {

  const weeklyData = energyData[1];
  // const monthlyData = energyData[0];
  const weeklyTargets = targets[0];
  // const monthlyTargets = targets[1];
  calculatecomparison(weeklyData,weeklyTargets);


 

  return (
    <div className="container mx-auto text-center p-5 h-full">
      <h1 className="text-4xl font-bold">Targets</h1>
      
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
  let targetData=await readTargets(organisationID);
  console.log(energyData)
  return {
    props: {session, energyData}
  };
}