
import React from 'react';
import { Optimisation }  from './Optimisation';
export class OptimisationList extends React.Component{ 
    render() {
        // Maps each optimisation to the an optimisation object
        let listItems = this.props.list.map(optimisation => <Optimisation key={'optimisation-' + optimisation.id} optimisation={optimisation} refreshMethod={this.props.refreshMethod} />)     
        return (listItems);
    }        
}