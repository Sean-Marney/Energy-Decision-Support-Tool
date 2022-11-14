import fs from 'fs';
import path from 'path';

const postsDirectory = path.join(process.cwd(), 'public');

function readCSVFile(organisation){
    const file = organisation + ".csv";
    const fullPath = path.join(postsDirectory,"/",file);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    return fileContents.split("\n");
}

function readEnergyData(content){
  let monthlyUsage = 0,monthlyCost = 0,weeklyUsage = 0,weeklyCost = 0;
  // Iterates through the last month and weeks data
  let index = content.length - 1488;
  while (index < (content.length-1)){
      // Retrieves the energy cost and energy data
      let energyData = content[index].split(",");
      let costData = content[(index-48)].split(",");
      let energyUsage = parseFloat(energyData[8]);
      // Calculates the cost for the energy usage for that half hour
      let cost = (energyUsage * (parseFloat(costData[9])/100))
      // Adds the half hourly usage and cost to the running total
      monthlyUsage = monthlyUsage + energyUsage;
      monthlyCost = monthlyCost + cost;
      // If the data is in the last week then adds the half hourly usage and cost to the running total
      if (index > (content.length -336)){
          weeklyCost = weeklyCost + cost;
          weeklyUsage = weeklyUsage + energyUsage;
      }
      index = index + 1;
  }
  // Returns the cost, energy usage, carbon emission and target comparsion from the last month and week
  let monthlyData = {"energyUsage":parseInt(monthlyUsage),"energyCost":parseInt(monthlyCost),"carbonEmissions":"40"} 
  let weeklyData = {"energyUsage":parseInt(weeklyUsage),"energyCost":parseInt(weeklyCost),"carbonEmissions":"10"} 
  return [monthlyData,weeklyData];
}



export function calculateEnergyData(organisation) {

    // Opens the data file and reads the data from within
    let content = readCSVFile(organisation);
    let data = readEnergyData(content);
    return data;
  };
