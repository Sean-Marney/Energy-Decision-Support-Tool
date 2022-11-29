import fs from 'fs';
import path from 'path';

let postsDirectory =  path.join(process.cwd(),"/..");
function readCSVFile(organisation){
    try{
      postsDirectory = path.join(postsDirectory,"energyData/",organisation,"/Abacws")
      let file = getMostRecentFile(postsDirectory);
      // Reads the CSV file with all the energy data for the organisation
      const fullPath = path.join(postsDirectory,"/",file);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      return fileContents.split("\n");
    }catch(err){
      console.log(err);
      return -1;
    }
}

function getMostRecentFile(dir){
  const files = orderRecentFiles(dir);
  return files.length ? files[0].file : undefined;
}

function orderRecentFiles(dir){
  return fs.readdirSync(dir)
  .filter((file) => fs.lstatSync(path.join(dir, file)).isFile())
  .map((file) => ({ file, mtime: fs.lstatSync(path.join(dir, file)).mtime }))
  .sort((a, b) => b.mtime.getTime() - a.mtime.getTime());
}

function readEnergyData(content){
  let numberOfDaysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31]
    // Gathers all the relevant energy data for the last week and last month from the csv file 
    // Collecting the energy consumption, energy cost and carbon emissions
  let monthlyUsage = 0,monthlyCost = 0,weeklyUsage = 0,weeklyCost = 0;
  // Iterates through the last month and weeks data
  let date = content[content.length-2].split(",")[0];
  let month = date.substring(3,5);
  let numberOfDays = 0 ;
  if (isNaN(month)== true || (parseInt(month) < 0 || parseInt(month) > 12)){
    numberOfDays = 30 
  }else{
    let year = date.substring(6, 10);
    numberOfDays = numberOfDaysInMonth[parseInt(month) -1];
    if (parseInt(month)==2 && parseInt(year) % 4){
      numberOfDays = 29;
    }
  }
  let index = content.length - ((numberOfDays*48)+1);
  while (index < (content.length-1)){
      // Retrieves the energy cost and energy data
      let energyData = content[index].split(",");
    //  Retrieves the previous days day ahead energy cost
      let costData = content[(index-48)].split(",");
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
  let monthlyData = {"energyUsage":Math.round(monthlyUsage),"energyCost":Math.round(monthlyCost),"carbonEmissions":"40"} 
  let weeklyData = {"energyUsage":Math.round(weeklyUsage),"energyCost":Math.round(weeklyCost),"carbonEmissions":"10"} 
  return [monthlyData,weeklyData];
}

export function calculateEnergyData(organisation) {
    // Opens the data file and reads the data from within
    let content = readCSVFile(organisation);
    if(content  == - 1){
      return [{"energyUsage":0,"energyCost":0,"carbonEmissions":0},{"energyUsage":0,"energyCost":0,"carbonEmissions":0}]
    }else{
      let data = readEnergyData(content);
      return data;
    }
  };