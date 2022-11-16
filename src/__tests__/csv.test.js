import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { calculateEnergyData } from '../lib/csv';

test('Monthly Data', () => {
    let data = calculateEnergyData("1");
    let monthly = data[0];
    expect(monthly.carbonEmissions).toEqual("40");
    expect(monthly.energyCost).toEqual(46597);
    expect(monthly.energyUsage).toEqual(3970001);
})
test('Weekly Data', () => {
    let data = calculateEnergyData("1");
    let monthly = data[1];
    expect(monthly.carbonEmissions).toEqual("10");
    expect(monthly.energyCost).toEqual(10889);
    expect(monthly.energyUsage).toEqual(889307);
})
