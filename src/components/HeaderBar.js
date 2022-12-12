import Image from 'next/image'

import ClientLogo from '../res/img/cardiff_uni_logo.png'

import React, { useState } from 'react';

export default function HeaderBar({children}) {
  const [organisation, setOrganisationState] = useState("Cardiff University");
  const [site, setSiteState] = useState("Abacws Building");

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

  React.useEffect(() => {
    setOrganisation(1)
    setSite(1)
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
              <select type="text" className="text-2xl border-2 bg-white px-2" value={ organisation } onChange={ (e) => {setOrganisation(e.target.value)} }>
                <option>Cardiff University</option>
              </select>
              <select type="text" className="ml-4 text-2xl border-2 bg-white px-2" value={ site } onChange={ (e) => {setSite(e.target.value)} }>
                <option>Abacws Building</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      {children}
    </>
  );
}
