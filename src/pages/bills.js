import React, { useState, useEffect } from 'react';

import Card from '../components/ui/Card';

export default function Reports() {
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

    const [billData, setBillData] = useState({})

    function getBillData(){
        fetch('http://localhost:3000/api/bill?site=' + getCookie("site"))
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setBillData(data)
        })
    }

    useEffect(() => {
        getBillData()
    }, [])

    return (
            <Card className="m-8 w-full col-span-1">
              <h1 className="afterline text-5xl mb-12">Last month's shadow bill</h1>
                <div className="my-4">
                  <strong>Total Energy Consumption</strong>
                  <h1 className='font-black text-5xl text-left'>{billData.consumption.toString().replace(/\B(?!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} kW h</h1>
                </div>

                <div className="my-4">
                  <strong>Total Cost</strong>
                  <h1 className='font-black text-5xl text-left'>£{billData.cost.toString().replace(/\B(?!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</h1>
                </div>
            </Card>
    )   
}