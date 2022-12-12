import React from 'react'

import { FaEdit } from "react-icons/fa";
import { Button } from "../ui/Button";
import TargetDisplay from "../target/TargetDisplay";

export default function ShowTargets({ targets, editModeToggle }){
    return (
        <>
            { targets.map((target) => <TargetDisplay key={ target.id } title={ target.title } value={ target.value } name={ target.name } />) }

            <a onClick={ () => editModeToggle(true) }><Button>
                <div className="flex-row flex">
                    <FaEdit className="mr-3" size="1.75rem" color="#FFFFFF" />
                    <strong>Edit</strong>
                </div>
            </Button></a>
        </>
    )
}