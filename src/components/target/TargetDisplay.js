import React from 'react'

export default function TargetDisplay({ title, value, name }){
    let prefix = ""
    let postfix = ""

    switch(name) {
        case "energy":
            postfix = " kWh"
            break;
        case "cost":
            prefix = "£"
            break
        case "carbon":
            postfix = " tCO₂e"
            break
    }

    return (
        <>
            <div className="flex flex-col mb-12">
                <label>{ title }</label>
                <h2 className="text-7xl">{ prefix + value + postfix }</h2>
            </div>
        </>
    )
}