import tips from "public/tips.svg";
import archive from "public/archive.svg"
import React from 'react';
import Image from 'next/image'
import { ArchivedOptimisation }  from '../components/ArchivedOptimisation';
export class ArchivedList extends React.Component{
    constructor(props) {
        super(props);
        this.showArchiveButton = React.createRef();
        this.showArchivedItems = this.showArchivedItems.bind(this);
      }


    showArchivedItems(){
        if (this.showArchiveButton.current.style.visibility == "hidden"){
            this.showArchiveButton.current.style.visibility = "visible";
        }else{
            this.showArchiveButton.current.style.visibility ="hidden";
        }
        
    }  
    render() {
        const listItems = this.props.list.map(optimisation => <ArchivedOptimisation optimisation = {optimisation}/>);
        return (
            <div>
                <div className="flex flex-row bg-blue-950 w-40 object-right mt-2">
                    <div className="basis-1/5">
                        <Image
                                src={archive}
                                height={25}
                                width={25}
                                alt= "Archive"
                        />
                    </div>
                    <div className="basis-4/5" onClick={this.showArchivedItems}>
                        <h1 className="text-white text-left">Archived Items</h1>   
                    </div>
                </div>
                <div id = "ArchivedList" className="border-2 shadow w-40" ref={this.showArchiveButton} style={{visibility:"hidden"}}>
                {listItems}
                </div> 
            </div>               
        );
    }        
}