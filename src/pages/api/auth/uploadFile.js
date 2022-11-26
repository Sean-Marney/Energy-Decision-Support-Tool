import path from 'path';
import { emitWarning } from 'process';
import {IncomingForm} from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false
  }
};

async function saveFile(file){
  try {
    let organisation = "Cardiff University";
    let site = "Abacws";
    const data = fs.readFileSync(file[0].filepath);
    const mainDirectory = path.join(process.cwd(),"/..");
    const postsDirectory = path.join(mainDirectory, 'energyData/',organisation,"/",site,"/");
    const fullPath = path.join(postsDirectory,file[0].originalFilename);
    try {
      if (!fs.existsSync(path.join(mainDirectory, 'energyData/',organisation))) {
        fs.mkdirSync(path.join(mainDirectory, 'energyData/',organisation));
      }
      if (!fs.existsSync(path.join(mainDirectory, 'energyData/',organisation,"/",site))) {
          fs.mkdirSync(path.join(mainDirectory, 'energyData/',organisation,"/",site));
      }
    } catch (err) {
      alert(err);
      console.error(err);
    }
    fs.writeFileSync(fullPath, data);
    await fs.unlinkSync(file[0].filepath);
    return;
  } catch (error) {
    console.log(error);
  }
}

export default async function handler(req,res){
  try {
    const form = new IncomingForm();
    form.parse(req, async function (err, fields, files) {
      await saveFile(files.file);
      return res.status(201).send("");
    });
  } catch (error) {
    console.log(error)
  }
}