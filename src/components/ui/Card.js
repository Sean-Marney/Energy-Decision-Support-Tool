import React, { useState, useEffect } from "react";

import classNames from "classnames";

export default function Card(props){
    let initialTranslation = 12

    if(props.inverseTransition){
        console.log("INVERSE")
        initialTranslation = -12;
    }

    const [translation, setTranslation] = useState(initialTranslation);

    useEffect(() => {
        if(props.loading == null){
            setTimeout(() => {
                setTranslation(0);
            }, 0)
        }
    }, [])

    useEffect(() => {
        if(props.loading != true){
            setTranslation(0);
        }
    }, [props.loading])

    return (
        <div className={classNames(['shadow-2xl', 'bg-white', 'p4', 'rounded', 'p-8', 'transition-all', 'ease-out', 'duration-1200', 'translate-y-' + translation, props.style].concat(props.className))}>
            {props.children}          
        </div>
    )
}