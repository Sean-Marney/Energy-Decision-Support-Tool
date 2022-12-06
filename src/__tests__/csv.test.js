import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { calculateEnergyData } from '../lib/csv';
jest.setTimeout(30000)
test('Monthly Data', async () => {
    let data = await calculateEnergyData("Cardiff University", "Abacws");
    let monthly = data[0];
    expect(monthly.carbonEmissions).toEqual("40");
    expect(monthly.energyCost).toEqual(46597);
    expect(monthly.energyUsage).toEqual(3970001);
})
test('Weekly Data', async () => {
    let data = await calculateEnergyData("Cardiff University", "Abacws");
    let monthly = data[1];
    expect(monthly.carbonEmissions).toEqual("10");
    expect(monthly.energyCost).toEqual(10889);
    expect(monthly.energyUsage).toEqual(889307);
})