import React from 'react'

export default function TargetDisplay({ name, value }){
    return (
        <>
            <div className="flex flex-col mb-12">
                <label>{ name }</label>
                <h2 className="text-7xl">{ value }</h2>
            </div>
        </>
    )
}