import tips from "public/tips.svg";
import archive from "public/archive.svg"
import React from 'react';
import Image from 'next/image';
import { router } from "next/router";
import url from "../url";

export class Optimisation extends React.Component {
    constructor(props) {
        super(props);
    
        this.handleArchive = this.handleArchive.bind(this);
      }

    // Handles archive the optimisation by api call to modify value and then reloads page  
      async handleArchive() {
        let values = {"id":this.props.optimisation.id,"value":true};
        const submit = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        };
        await fetch(url + "/api/toggleArchive", submit);
        router.push(url + "/optimisations");
      }
    render() {
    // Sets the colour of the icon for the optimisation based on the priority
    let colour;
    if (this.props.optimisation.priority == "3"){
        colour = "w-8 rounded-sm ml-1 mt-1 bg-green-600";
    }else if (this.props.optimisation.priority == "2"){
        colour = "w-8 rounded-sm ml-1 mt-1 bg-yellow-600";
    }else{
        colour = "w-8 rounded-sm ml-1 mt-1 bg-red-600";
    }  
    return (
        <div className="border-2 m-2 shadow bg-white">
            <div className="flex flex-row">
                {/* Icon with background set due to the priority  */}
                <div className="basis-1/6">
                    <div className={colour}>
                        <Image
                                src={tips}
                                height={36}
                                width={36}
                                alt= "Tip"
                            />
                    </div>
                    </div>
                    {/* Displays data with information for the optimisation */}
                    <div className="basis-5/6">
                        <h1 className="text-xl divide-y text-left font-extrabold">{this.props.optimisation.title}</h1>
                    </div> 
                <div>
            </div>
            </div>
            <div>
                <p className="text-sm">{this.props.optimisation.body}</p>
            </div>
            <div className="flex flex-row">
                {/* Option to archive the optimisation */}
                    <div className="basis-1/2"></div>
                    <div className="basis-1/2 m-3 shadow cursor-pointer"  onClick={this.handleArchive}>
                        <div className="flex flex-row bg-blue-950 w-60 object-right">
                            <div className="basis-1/4">
                                    <Image
                                        src={archive}
                                        height={25}
                                        width={25}
                                        alt= "Archive"
                                    />
                            </div>
                            <div className="basis-1/4 text-right">
                                <h1 className="text-white">Archive</h1>    
                            </div>
                        </div>
                    </div>
            </div>
        </div>

      );
    }
  }
