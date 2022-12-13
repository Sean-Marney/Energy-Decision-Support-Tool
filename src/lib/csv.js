const fs = require('fs');
const csv = require('@fast-csv/parse');
import path from 'path';
const postsDirectory =  path.join(process.cwd(),"/..");

import moment from 'moment';

function fastCSV(organisation, site){
  const data = [];
  let energyData;
  let dir = path.join(postsDirectory,"res/",organisation,"/",site);
  let file = getMostRecentFile(dir);
  if (file == -1){
    return -1;
  }else{
    dir = path.join(dir,"/",file);
    return new Promise(resolve => { csv.parseFile(dir)
      .on('error', error => console.error(error))
      .on('data', row => data.push(row))
      .on('end', rowCount => resolve(data))});
  }
}

function getMostRecentFile(dir){
  const files = orderRecentFiles(dir);
  return files.length ? files[0].file : -1;
}

function orderRecentFiles(dir){
  try{
    return fs.readdirSync(dir)
    .filter((file) => fs.lstatSync(path.join(dir, file)).isFile())
    .map((file) => ({ file, mtime: fs.lstatSync(path.join(dir, file)).mtime }))
    .sort((a, b) => b.mtime.getTime() - a.mtime.getTime());
  }catch(error){
    return -1;
  }
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
  let date = (content[content.length-2])[0];
  let month = date.substring(5,7);
  let numberOfDays = 0 ;
  if (isNaN(month)== true || (parseInt(month) < 0 || parseInt(month) > 12)){
    numberOfDays = 30 
  }else{
    let year = date.substring(6, 10);
    numberOfDays = numberOfDaysInMonth[parseInt(month) - 1];
    if (parseInt(month) == 2 && parseInt(year) % 4) {
      numberOfDays = 29;
    }
  }
  let index = content.length - ((numberOfDays*48)+1);
  while (index < (content.length-1)){
      // Retrieves the energy cost and energy data
      let energyData = content[index];
    //  Retrieves the previous days day ahead energy cost
      let costData = content[(index-48)];
      let energyUsage = parseFloat(energyData[8]);
      // Calculates the cost for the energy usage for that half hour
      let cost = (parseFloat(energyData[11])/1000 * (parseFloat(costData[9])))
      // Adds the half hourly usage and cost to the running total
      monthlyUsage = monthlyUsage + energyUsage;
      monthlyCost = monthlyCost + cost;
      // If the data is in the last week then adds the half hourly usage and cost to the running total
      if (index > (content.length -338)){
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
export async function calculateEnergyData(organisation, site) {
  // Opens the data file and reads the data from within
  // let content = await readCSVFile(organisation,  site);
  let content = (await fastCSV(organisation,site))
  
  // console.log(content);
  if(content  == - 1){
    return {"monthly":{"usage":0,"cost":0,"carbonEmissions":0},"weekly":{"usage":0,"cost":0,"carbonEmissions":0}};
  }else{
    let data = readEnergyData(content);
    return data;
  }
};

export async function calculateEnergyUsage(organisation, site, start, end) {
  // Opens the data file and reads the data from within
  let content = (await fastCSV(organisation,site))
  if (content == -1) {
      return []
  } else {
      let data = readEnergyUsage(content, start, end);
      return data;
  }
};

function readEnergyUsage(content, start, end) {
  let numberOfDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  // Gathers all the relevant energy data for the last week and last month from the csv file 
  // Collecting the energy consumption, energy cost and carbon emissions
  let usageByDate = []
  // Iterates through the last month and weeks data

  let date = content[content.length - 2][0];
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

  for (let i = start; i <= end; i++) {
      for (let j = 1; j < 49; j++) {
          console.log("i",i,"j",j)
          dailyUsage = 0
          let index = i * 48 + j
          let energyData = content[index];
          dailyUsage += (parseFloat(energyData[11]) + parseFloat(energyData[1]) + (parseFloat(energyData[2])) + parseFloat(energyData[12]))    
      }
      usageByDate.push(dailyUsage)
  }
  return usageByDate
}


export async function calculateForSankey(organisation, site, start, end) {
  // Opens the data file and reads the data from within
  let content = (await fastCSV(organisation, site))
  if (content == -1) {
      return {
          "CHP1": 0,
          "CHP2": 0,
          "gridIn": 0,
          "gridOut": 0
      }
  } else {
      let data = readForSankey(content, start, end);
      return data;
  }
};

function readForSankey(content, start, end) {
  let numberOfDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  // Gathers all the relevant energy data for the last week and last month from the csv file 
  // Collecting the energy consumption, energy cost and carbon emissions
  let CHP1 = 0
  let CHP2 = 0
  let gridIn = 0
  let gridOut = 0
  // Iterates through the last month and weeks data
  let date = content[content.length - 2][0];
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
  for (let i = (start*48 +1); i < end*48; i++) {
      let energyData = content[i]
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


// Oliver's functions
export async function getDataProperties(organisation, site) {
  const contents = await fastCSV(organisation, site)
  const properties = contents[0]
  return properties
}

export async function getDataBetween(startDate, endDate, organisation, site){
  const lines = await fastCSV(organisation, site)

  // Properties
  const properties = lines[0]

  // Now, transform the rows into objects
  const data = lines.map((line) => {
      return line.reduce((obj, value, index) => {
          obj[properties[index]] = value
          return obj
      }, {})
  })

  // Now, filter the data to only include the dates we want
  const filteredData = data.filter((row) => {
    return moment(row.Date) >= moment(startDate) && moment(row.Date) < moment(endDate)
  })

  return filteredData
}