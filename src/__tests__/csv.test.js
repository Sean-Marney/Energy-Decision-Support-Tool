import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { calculateEnergyData } from '../lib/csv';
import { KPIData } from "../components/KPIData";
import { KPIContainer } from "../components/KPIContainer";
import Dashboard from '../pages/dashboard';

test('Reading Monthly Data', async () => {
    let data = await calculateEnergyData("Cardiff University", "Abacws");
    let monthly = data[0];
    expect(monthly.carbonEmissions).toEqual("40");
    expect(monthly.energyCost).toEqual(46597);
    expect(monthly.energyUsage).toEqual(3970001);
})
test('Reading Weekly Data', async () => {
    let data = await calculateEnergyData("Cardiff University", "Abacws");
    let weekly = data[1];
    expect(weekly.carbonEmissions).toEqual("10");
    expect(weekly.energyCost).toEqual(10889);
    expect(weekly.energyUsage).toEqual(889307);
})

test('KPI Data', () => {
    render(<KPIData data = {10} targetcomparison = {10} units = " KW"/>)
    const data = screen.getByText("10 KW");
    expect(data).toBeInTheDocument();
    const target = screen.getByText("Reached your target");
    expect(target).toBeInTheDocument(); 
})

test('KPI Container', () => {
    render(<KPIContainer title="Site KPIs last week" data = {{"energyUsage":10,"energyCost":10,"carbonEmissions":10}} target = {["10","10","10"]}/>    )
    const title = screen.getByText("Site KPIs last week");
    expect(title).toBeInTheDocument();
})

test('Page', () => {
    render(<Dashboard data={[{"energyUsage":10,"energyCost":10,"carbonEmissions":10},{"energyUsage":10,"energyCost":10,"carbonEmissions":10},1,["10","10","10"],["10","10","10"]]}/>)
    const optimisations = screen.getByText("Pending optimisations");
    expect(optimisations).toBeInTheDocument();
})