import Image from 'next/image'
import { useSession } from "next-auth/react"
import ClientLogo from '../res/img/cardiff_uni_logo.png'
import { useRouter } from 'next/router'

import React, { useState } from 'react';

export default function HeaderBar({children}) {
  const [organisation, setOrganisationState] = useState();
  const [site, setSiteState] = useState();
  const [options, setOptions] = useState([]);
  const [sitesOption, setSitesOption] = React.useState([])
  const [organisationOption, setOrganisationOption] = React.useState([])
  const router = useRouter()
  const [org, setOrg] = React.useState()

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

  function setCookie(cname, cvalue, exdays) {
      const d = new Date();
      d.setTime(d.getTime() + (exdays*24*60*60*1000));
      let expires = "expires="+ d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
    
  function setOrganisation(value){
    setCookie("organisation", value, 1);
    setOrganisationState(value);
  }

  function setSite(value){
    setCookie("site", value, 1);
    setSiteState(value);
  }
  function readOptions(){
    fetch('http://localhost:3000/api/organisations/get').then(async (response) => {
      const body = await response.json()
      let organisations = body.organisations;
      setOptions(organisations);
      setOrganisationOption(organisations.map((org) => <option value={org.id} id={org.name}>{org.name}</option>))
      if (getCookie("organisation") == ""){
        setOrganisation(organisations[0].id);
        setSitesOption(organisations[0].Site.map(site => <option value={site.id} id={site.name}>{site.name}</option>))  
        setSite(organisations[0].Site[0].id);  
      }else{
        let id = (parseInt(getCookie("organisation")));
        let newOrg = organisations.find(org => org.id == id);
        let sites = newOrg.Site;
        setSitesOption(sites.map(site => <option value={site.id} id={site.name}>{site.name}</option>))
        let siteID = (parseInt(getCookie("site")));
        let newSite = (sites.find(site => site.id == siteID));
        setSite(newSite.id);
        setOrganisation(parseInt(newOrg.id));
      }
    })
  }    
  function handleOrganisationChange(value){
    let newOrg = options.find(org => org.id == value);
    setOrganisation(newOrg.id);
    setSitesOption(newOrg.Site.map(site => <option value={site.id} id={site.name}>{site.name}</option>))
    setSite(newOrg.Site[0].id);
    location.reload();
  }
  function handleSiteChange(value){
    setSite(value);
    location.reload();
  }

  React.useEffect(() => {
    readOptions();
  }, [])
  return (
    <>
      { /* Header bar */ }
      <div>
        <div className="flex justify-start items-center gap-x-10 py-4 px-8 bg-white shadow-2xl">
          <Image src={ClientLogo} width={100} height={100} />
          <strong className="text-4xl min-w-fit">Energy DSS</strong>
          { /* Form elements */ }
          <div className="w-full">
            <div className="text-right">
              <select type="text" className="text-2xl border-2 bg-white px-2" value={organisation} onChange={ (e) => {handleOrganisationChange(e.target.value)} }>
                {organisationOption}
              </select>
              <select type="text" className="ml-4 text-2xl border-2 bg-white px-2" value={site} onChange={ (e) => {handleSiteChange(e.target.value)} }>
                {sitesOption}
              </select>
            </div>
          </div>
        </div>
      </div>
      {children}
    </>
  );
}
