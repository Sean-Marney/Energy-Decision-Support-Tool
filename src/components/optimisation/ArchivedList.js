
import React from 'react';
import { ArchivedOptimisation }  from './ArchivedOptimisation';

import { useState } from 'react';

import { Button } from '../ui/Button';
import Card from '../ui/Card';

export default function ArchivedList(props){
        const [showArchivedItems, setShowArchivedItems] = useState(false);

        // Maps the list to Archived optimisation
        const listItems = props.list.map(optimisation => <ArchivedOptimisation key={'optimisation' + optimisation.id} optimisation = {optimisation} refreshMethod={props.refreshMethod} />);
        return (
            <>
                <div onClick={() => setShowArchivedItems(!showArchivedItems)}><Button style="w-full">
                    <div className="flex-row flex h-6 justify-center align-center items-center">
                        <img className="mr-3 h-8" src="/images/archive.svg" />
                        <strong>Archived items</strong>
                    </div>
                </Button></div>

                {/* Displays list of archived options here */}
                { showArchivedItems && <Card className="px-4 py-4" inverseTransition="true">
                    {listItems}
                </Card> }
            </>               
        );
       
}