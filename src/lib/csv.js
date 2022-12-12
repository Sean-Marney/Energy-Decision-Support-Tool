const fs = require('fs');
const csv = require('@fast-csv/parse');
import path from 'path';
import Papa from 'papaparse';
const postsDirectory =  path.join(process.cwd(),"/..");

function fastCSV(organisation,site){
  const data = [];
  let energyData;
  let dir = path.join(postsDirectory,"energyData/",organisation,"/",site);
  let file = getMostRecentFile(dir);
  if (file == -1){
    return -1;
  }else{
    console.log(dir);
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
  let monthlyData = {"energyUsage":Math.round(monthlyUsage),"energyCost":Math.round(monthlyCost),"carbonEmissions":"40"}; 
  let weeklyData = {"energyUsage":Math.round(weeklyUsage),"energyCost":Math.round(weeklyCost),"carbonEmissions":"10"};
  return {"monthlyData":monthlyData,"weeklyData":weeklyData};
}
export async function calculateEnergyData(organisation, site) {
  // Opens the data file and reads the data from within
  // let content = await readCSVFile(organisation,  site);
  let content = (await fastCSV(organisation,site));
  // console.log(content);
  if(content  == - 1){
    return {"monthlyData":{"energyUsage":0,"energyCost":0,"carbonEmissions":0},"weeklyData":{"energyUsage":0,"energyCost":0,"carbonEmissions":0}};
  }else{
    let data = readEnergyData(content);
    return data;
  }
};
