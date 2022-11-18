
import React from 'react';
import { Optimisation }  from '../components/Optimisation';
export class OptimisationList extends React.Component{ 
    render() {
        let listItems;
        if (this.props.list.length > 0){
            listItems = this.props.list.map(optimisation => <Optimisation optimisation = {optimisation}/>);
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