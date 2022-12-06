import { KPIData } from "../components/KPIData";
import { RedLine } from '../components/RedLine';
import React from 'react';
// Container that contains KPI Data
export class KPIContainer extends React.Component {
  render() {
    return (
      <div>
        <h3 className="text-xl divide-y text-left">{this.props.title}</h3>
              <RedLine />
              <br/>
              <KPIData data = {this.props.data.energyUsage} targetcomparison = {this.props.target.energyTarget} units = " KW"/>
              <br/>
              <KPIData data = {this.props.data.energyCost} targetcomparison = {this.props.target.costTarget} units = "£"/>
              <br/>
              <KPIData data = {this.props.data.carbonEmissions} targetcomparison = {this.props.target.carbonTarget} units = " tCO2e"/>
      </div>
    );
  }
}