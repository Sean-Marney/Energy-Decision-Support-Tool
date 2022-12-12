import fs from 'fs';
import path from 'path';

const postsDirectory = path.join(process.cwd(), 'public');

function readCSVFile(organisation) {
  try {
    // Reads the CSV file with all the energy data for the organisation
    const file = organisation + ".csv";
    const fullPath = path.join(postsDirectory, "/", file);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    return fileContents.split("\n");
  } catch {
    return -1;
  }
}
function readForSankey(content) {
    let numberOfDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    // Gathers all the relevant energy data for the last week and last month from the csv file 
    // Collecting the energy consumption, energy cost and carbon emissions
    let CHP1 = 0
    let CHP2 = 0
    let gridIn = 0
    let gridOut = 0
    // Iterates through the last month and weeks data
    let date = content[content.length - 2].split(",")[0];
    let month = date.substring(3, 5);
    let numberOfDays = 0;
    let dailyUsage;
    if (isNaN(month) == true || (parseInt(month) < 0 || parseInt(month) > 12)) {
        numberOfDays = 30
    } else {
        let year = date.substring(6, 10);
        numberOfDays = numberOfDaysInMonth[parseInt(month) - 1];
        if (parseInt(month) == 2 && parseInt(year) % 4) {
            numberOfDays = 29;
        }
    }
    console.log(numberOfDays)
    for (let i = 1; i < numberOfDays*48; i++) {
        let energyData = content[i].split(",");
        CHP1 += (parseFloat(energyData[1]))
        CHP2 += (parseFloat(energyData[2]))
        gridIn += (parseFloat(energyData[11]))
        gridOut -= (parseFloat(energyData[12]))
        
    }
    console.log("CHP1", CHP1,
        "CHP2", CHP2,
        "gridIn", gridIn,
        "gridOut", gridOut)
    return {
        "CHP1": CHP1,
        "CHP2": CHP2,
        "gridIn": gridIn,
        "gridOut": gridOut
    }
}

function readEnergyUsage(content) {
    let numberOfDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    // Gathers all the relevant energy data for the last week and last month from the csv file 
    // Collecting the energy consumption, energy cost and carbon emissions
    let usageByDate = []
    // Iterates through the last month and weeks data
    let date = content[content.length - 2].split(",")[0];
    let month = date.substring(3, 5);
    let numberOfDays = 0;
    let dailyUsage;
    if (isNaN(month) == true || (parseInt(month) < 0 || parseInt(month) > 12)) {
        numberOfDays = 30
    } else {
        let year = date.substring(6, 10);
        numberOfDays = numberOfDaysInMonth[parseInt(month) - 1];
        if (parseInt(month) == 2 && parseInt(year) % 4) {
            numberOfDays = 29;
        }
    }
    console.log(numberOfDays)
    for (let i = 0; i < numberOfDays; i++) {
        for (let j = 1; j < 49; j++) {
            console.log("i",i,"j",j)
            dailyUsage = 0
            let index = i * 48 + j
            let energyData = content[index].split(",");
            dailyUsage += (parseFloat(energyData[11]) + parseFloat(energyData[1]) + (parseFloat(energyData[2])) + parseFloat(energyData[12]))    
            console.log(dailyUsage)
        }
        usageByDate.push(dailyUsage)
    }
    return usageByDate
}


function readEnergyData(content) {
  let numberOfDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  // Gathers all the relevant energy data for the last week and last month from the csv file 
  // Collecting the energy consumption, energy cost and carbon emissions
  let monthlyUsage = 0,
    monthlyCost = 0,
    weeklyUsage = 0,
    weeklyCost = 0;
  // Iterates through the last month and weeks data
  let date = content[content.length - 2].split(",")[0];
  let month = date.substring(3, 5);
  let numberOfDays = 0;
  if (isNaN(month) == true || (parseInt(month) < 0 || parseInt(month) > 12)) {
    numberOfDays = 30
  } else {
    let year = date.substring(6, 10);
    numberOfDays = numberOfDaysInMonth[parseInt(month) - 1];
    if (parseInt(month) == 2 && parseInt(year) % 4) {
      numberOfDays = 29;
    }
  }
  let index = content.length - ((numberOfDays * 48) + 1);
  while (index < (content.length - 1)) {
    // Retrieves the energy cost and energy data
    let energyData = content[index].split(",");
    //  Retrieves the previous days day ahead energy cost
    let costData = content[(index - 48)].split(",");
    let energyUsage = parseFloat(energyData[8]);
    // Calculates the cost for the energy usage for that half hour
    let cost = (parseFloat(energyData[11]) / 1000 * (parseFloat(costData[9])))
    // Adds the half hourly usage and cost to the running total
    monthlyUsage = monthlyUsage + energyUsage;
    monthlyCost = monthlyCost + cost;
    // If the data is in the last week then adds the half hourly usage and cost to the running total
    if (index > (content.length - 338)) {
      weeklyCost = weeklyCost + cost;
      weeklyUsage = weeklyUsage + energyUsage;
    }
    index = index + 1;
  }
  // Returns the cost, energy usage, carbon emission and target comparsion from the last month and week
  return {
    "weekly": {
      "usage": Math.round(weeklyUsage),
      "cost": Math.round(weeklyCost),
      "carbonEmissions": 10
    },
    "monthly": {
      "usage": Math.round(monthlyUsage),
      "cost": Math.round(monthlyCost),
      "carbonEmissions": 40
    }
  }
}
export function calculateEnergyUsage(organisation) {
    // Opens the data file and reads the data from within
    let content = readCSVFile(organisation);
    if (content == -1) {
        return []
    } else {
        let data = readEnergyUsage(content);
        return data;
    }
};
export function calculateForSankey(organisation) {
    // Opens the data file and reads the data from within
    let content = readCSVFile(organisation);
    if (content == -1) {
        return {
            "CHP1": 0,
            "CHP2": 0,
            "gridIn": 0,
            "gridOut": 0
        }
    } else {
        let data = readForSankey(content);
        return data;
    }
};

export function calculateEnergyData(organisation) {
  // Opens the data file and reads the data from within
  let content = readCSVFile(organisation);
  if (content == -1) {
    return {
      "weekly": {
        "usage": 0,
        "cost": 0,
        "carbonEmissions": 0
      },
      "monthly": {
        "usage": 0,
        "cost": 0,
        "carbonEmissions": 0
      }
    }
  } else {
    let data = readEnergyData(content);
    return data;
  }
};