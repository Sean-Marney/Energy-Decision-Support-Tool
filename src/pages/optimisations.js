import { signOut } from "next-auth/react";
import { getSession } from "next-auth/react";
import React from 'react';
import ArchivedList from '../components/optimisation/ArchivedList';
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

  const [optimisationsArchivedData, setOptimisationsArchivedData] = React.useState([])
  const [optimisationsUnarchivedData, setOptimisationsUnarchivedData] = React.useState([])

  const [isLoaded, setIsLoaded] = React.useState(false)
  const [isDownloading, setIsDownloading] = React.useState(true)

  function getData(){
    fetch('http://localhost:3000/api/optimisation/get?site=' + getCookie("site") + "&organisation=" + getCookie("organisation")).then(async (response) => {
      const body = await response.json()

      setOptimisationsArchivedData(body.filter((optimisation) => optimisation.archived === true))
      setOptimisationsUnarchivedData(body.filter((optimisation) => optimisation.archived === false))
      setIsDownloading(false)
    })
  }

  React.useEffect(() => {
    if(!isLoaded){
      alert(hello);
      getData()
      setIsLoaded(true)
    }
  }, [])

  return (
      <div className="grid grid-cols-5 gap-5 m-8 w-full">
        <div className="col-span-4">
          <div className="grid grid-cols-2 gap-4">
            { optimisationsUnarchivedData.length > 0 && <OptimisationList list={optimisationsUnarchivedData} refreshMethod={getData} /> }
          </div>
        </div>

        <div className="col-span-1">
          <ArchivedList list={optimisationsArchivedData} refreshMethod={getData} />
        </div>
      </div>
  );
}
