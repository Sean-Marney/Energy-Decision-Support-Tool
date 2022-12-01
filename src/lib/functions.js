import fs from 'fs';
import path from 'path';

let postsDirectory =  path.join(process.cwd(),"/..");
export function checkWhileFileExists(file,organisation,site) {
  let postsDirectory =  path.join(process.cwd(),"/..");
  title = title + ".csv";
  postsDirectory = path.join(postsDirectory,"energyData/",organisation,"/",site+"/"+title);
  console.log(postsDirectory);
};
