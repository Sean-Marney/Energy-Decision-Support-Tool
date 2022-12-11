
import React from 'react';
import Image from 'next/image'
import { ArchivedOptimisation }  from './ArchivedOptimisation';

export class ArchivedList extends React.Component{
    constructor(props) {
        super(props);
        this.showArchiveButton = React.createRef();
        this.showArchivedItems = this.showArchivedItems.bind(this);
      }
    // Toggles the Archived items being shown on the page  
    showArchivedItems(){
        if (this.showArchiveButton.current.style.visibility == "hidden"){
            this.showArchiveButton.current.style.visibility = "visible";
        }else{
            this.showArchiveButton.current.style.visibility ="hidden";
        }
        
    }  
    render() {
        // Maps the list to Archived optimisation
        const listItems = this.props.list.map(optimisation => <ArchivedOptimisation key={'optimisation' + optimisation.id} optimisation = {optimisation}/>);
        return (
            <div>
                {/* Title which allows you to select whether to view the archived items */}
                <div className="flex flex-row bg-blue-950 w-60 object-right mt-2">
                    <div className="basis-1/5">
                        <Image
                                src={archive}
                                height={25}
                                width={25}
                                alt= "Archive"
                        />
                    </div>
                    <div className="basis-4/5 cursor-pointer" onClick={this.showArchivedItems}>
                        <h1 className="text-white text-left">Archived Items</h1>   
                    </div>
                </div>
                {/* Displays list of archived options here */}
                <div id = "ArchivedList" className="border-2 shadow w-60" ref={this.showArchiveButton} style={{visibility:"hidden"}}>
                {listItems}
                </div> 
            </div>               
        );
    }        
}