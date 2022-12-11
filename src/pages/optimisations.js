import { signOut } from "next-auth/react";
import { getSession } from "next-auth/react";
import React from 'react';
import { ArchivedList }  from '../components/optimisation/ArchivedList';
import { OptimisationList } from "../components/optimisation/OptimisationList";

export default function Optimisations({data}) {
  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
       c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  const [optimisationsData, setOptimisationsData] = React.useState([])

  const [isLoaded, setIsLoaded] = React.useState(false)
  const [isDownloading, setIsDownloading] = React.useState(true)

  function getData(){
    fetch('http://localhost:3000/api/optimisation/get?site=' + getCookie("site") + "&organisation=" + getCookie("organisation")).then(async (response) => {
      setOptimisationsData(await response.json())
      setIsDownloading(false)
    })
  }

  React.useEffect(() => {
    if(!isLoaded){
      getData()
      setIsLoaded(true)
    }
  }, [])

  return (
    <div>
      <div className="grid grid-cols-5 gap-5 m-8">
        <div className="col-span-4">
          <div className="flex flex-wrap">
            { optimisationsData.length > 0 && <OptimisationList list={optimisationsData}/> }
          </div>
        </div>
      </div>
    </div>
  );
}
