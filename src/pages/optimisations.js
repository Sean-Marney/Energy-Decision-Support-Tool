import { signOut } from "next-auth/react";
import { getSession } from "next-auth/react";
import tips from "public/tips.svg";
import archive from "public/archive.svg"
import React from 'react';
import Image from 'next/image'

function handleArchive() {
    alert("Archived");
}

function handleUnarchive() {
  alert("Unarchived");
}


class Optimisations extends React.Component {
    render() {
    return (
        <div className="border-2 m-2 shadow">
            <div className="flex flex-row">
                <div className="basis-1/6">
                    <div className="bg-red-600 w-8 rounded-sm ml-1 mt-1">
                        <Image
                                src={tips}
                                height={36}
                                width={36}
                                alt= "Tip"
                            />
                    </div>
                    </div>
                    <div className="basis-5/6">
                        <h1 className="text-xl divide-y text-left font-extrabold">Improve Insulation</h1>
                    </div> 
                <div>
            </div>
            </div>
            <div>
                <p className="text-sm">Your site's heat demand is significantly higher than the expected
                    demand for a site of this size. One of the most common causes of this is old or deteriorated insulation.</p>
            </div>
            <div className="flex flex-row">
                    <div className="basis-1/2"></div>
                    <div className="basis-1/2 m-3 shadow" onClick={handleArchive}>
                        <div className="flex flex-row bg-blue-950 w-40 object-right">
                            <div className="basis-1/4">
                                    <Image
                                        src={archive}
                                        height={25}
                                        width={25}
                                        alt= "Archive"
                                    />
                            </div>
                            <div className="basis-1/4 text-right">
                                <h1 className="text-white">Archive</h1>    
                            </div>
                        </div>
                    </div>
            </div>
        </div>

      );
    }
  }
  
  class ArchivedOptimisations extends React.Component {
    render() {
    return (
        <div className="border-slate-800/75 border-2 rounded-sm" onClick={handleUnarchive}>
            <div className="flex flex-row m-1">
                    <div className="basis-1/6 bg-red-600 w-1 h-6 rounded-sm">
                        <Image
                            src={tips}
                            height={25}
                            width={25}
                            alt= "Tip"
                        />
                    </div>
                    <div className="basis-5/6">
                        <p className="text-xxs">Improve Insulation</p>    
                    </div>
            </div> 
        </div>
      );
    }
  }
  
class ArchivedList extends React.Component{
    constructor(props) {
        super(props);
        this.showArchiveButton = React.createRef();
        this.showArchivedItems = this.showArchivedItems.bind(this);
      }


    showArchivedItems(){
        if (this.showArchiveButton.current.style.visibility == "hidden"){
            this.showArchiveButton.current.style.visibility = "visible";
        }else{
            this.showArchiveButton.current.style.visibility ="hidden";
        }
        
    }  
    render() {
        return (
            <div>
                <div className="flex flex-row bg-blue-950 w-40 object-right mt-2">
                    <div className="basis-1/5">
                        <Image
                                src={archive}
                                height={25}
                                width={25}
                                alt= "Archive"
                        />
                    </div>
                    <div className="basis-4/5" onClick={this.showArchivedItems}>
                        <h1 className="text-white text-left">Archived Items</h1>   
                    </div>
                </div>
                <div id = "ArchivedList" className="border-2 shadow w-40" ref={this.showArchiveButton} style={{visibility:"hidden"}}>
                    <div className="m-2">
                        <ArchivedOptimisations/>
                    </div>
                    <div className="m-2">
                        <ArchivedOptimisations/>
                    </div>
                    <div className="m-2">
                        <ArchivedOptimisations/>
                    </div>
                </div> 
            </div>               
        );
        }        
}

export default function Dashboard() {
  function handleSignOut() {
    signOut();
  }
  function handleArchive(){
    alert("Archive");
  }
  return (
    <div>
      <h1>Optimisations</h1>
      <div className="flex justify-center">
        <div className="flex flex-row"/>
            <div className="basis-4/5 grid grid-cols-2">
                <Optimisations />
                <Optimisations />
            </div>
            <div className="basis-1/5">
                <ArchivedList />
            </div>
        </div>        
        <button
          className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 bg-gray-300"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </div>
  );
}

// // Protects route
// export async function getServerSideProps({ req }) {
//   const session = await getSession({ req });

//   // Code to ensure if user no longer has their session cookies (ie. is now logged out), they will be returned home - this prevents null user error
//   // TODO - Only have one instance of 'get user' code to reduce repeated code
//   try {
//     const user = await prisma.user.findFirst({
//       where: {
//         email: session.user.email,
//       },
//     });
//   } catch (error) {
//     return {
//       redirect: {
//         destination: "/home",
//         permanent: false,
//       },
//     };
//   }

//   // If admin or manager, show page
//   return {
//     props: { session },
//   };
// }
