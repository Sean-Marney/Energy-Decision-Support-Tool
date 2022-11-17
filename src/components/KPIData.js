import arrowdown from "public/images/arrowdown.svg";
import arrowup from "public/images/arrowup.svg";
import reached from "public/images/reached.svg";
import Image from 'next/image';
import React from 'react';

// Specific KPI data and the comparison to targets
export class KPIData extends React.Component {
  render() {
    let imageSource, text;
    // Compares the target and the data
    let comparison = parseInt(this.props.targetcomparison) - parseInt(this.props.data);
    // Converts the comparison to a positive number
    let positiveValue = Math.abs( comparison );
    let value, kpiData;
    // Amends the unit on to the data
    if (this.props.units == "£"){
      value = "£" + positiveValue;
      kpiData = "£" + this.props.data;
    }else{
      value = positiveValue + this.props.units;
      kpiData = this.props.data + this.props.units;
    }

    // Compares whether above or below their target and set image and text accordingly
    // Above their target
    if (comparison <0){
      imageSource =  arrowup;
      text = value + " above";
    }  
    // Below their target
    else if (comparison >0){
      imageSource =  arrowdown;
      text = value + " below";
    } 
    // Reached their target 
    else{
      imageSource =  reached;
      text = "Reached";
    }  
  return (
    <div>
      <h1 className='font-black text-4xl text-left'>{kpiData}</h1>
      <div className="flex flex-row text-left">   
        <Image
          src={imageSource}
          height={25}
          width={25}
          alt= {text}
        />
        <p className='text-xs'>{text} your target</p>
      </div> 
    </div>
    );
  }
}