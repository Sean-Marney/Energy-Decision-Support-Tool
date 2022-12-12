import React from 'react'

import { FaSave } from "react-icons/fa";
import { Button } from "../ui/Button";
import TargetModify from "../target/TargetModify";

export default function ModifyTargets({ targets, editModeToggle, modificationFunction }){
    return (
        <>
            { targets.map((target, i) => <TargetModify key={ target.id } title={ target.title } value={ target.value } name={ target.name } index={ i } modificationFunction={ modificationFunction } />) }

            <a onClick={ () => editModeToggle(false) }><Button>
                <div className="flex-row flex">
                    <FaSave className="mr-3" size="1.75rem" color="#FFFFFF" />
                    <strong>Save</strong>
                </div>
            </Button></a>
        </>
    )
}