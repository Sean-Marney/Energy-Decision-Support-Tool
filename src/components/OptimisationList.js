
import React from 'react';
import { Optimisation }  from '../components/Optimisation';
export class OptimisationList extends React.Component{ 
    render() {
        // Maps each optimisation to the an optimisation object
        let listItems;
        if (this.props.list.length > 0){
            listItems = this.props.list.map(optimisation => <Optimisation  key={'optimisation' + optimisation.id} optimisation = {optimisation}/>);
            return (  
                <div className="grid grid-cols-2">
                    {listItems}            
                </div>          
            );
        }else{
            return (
                <h1 className="text-4xl">No Optimisations</h1>
            )
        }
    }        
}