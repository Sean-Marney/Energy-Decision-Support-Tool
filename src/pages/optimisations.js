import { signOut } from "next-auth/react";
import { getSession } from "next-auth/react";
import React from 'react';
import { ArchivedList }  from '../components/ArchivedList';
import { OptimisationList } from "../components/OptimisationList";
import { readUnArchivedOptimisations }  from '../lib/database_functions';
import { readArchivedOptimisations } from "../lib/database_functions";
export default function Optimisations({data}) {
  function handleSignOut() {
    signOut();
  }
  return (
    <div>
      <div className="flex justify-center">
        <div className="flex flex-row"/>
{/* Displays the optimisations */}
            <div className="basis-4/5">
                <OptimisationList list={data[0]}/>
            </div>
{/* Displays the archived optimisations */}            
            <div className="basis-1/5">
                <ArchivedList list={data[1]}/>
            </div>
        </div>        
        {/* <button
          className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 bg-gray-300"
          onClick={handleSignOut}
        >
          Sign Out
        </button> */}
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
    // Reads optimisations from the database
    let archivedOptimisations = await readArchivedOptimisations(organisationID);
    // If admin or manager, show page
    let data = [optimisations, archivedOptimisations]
    return {
      props: {session , data}
    };
  }

