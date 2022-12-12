import path from 'path';
import { emitWarning } from 'process';
import {IncomingForm} from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false
  }
};

async function saveFile(file, site, organisation,title){
  try {
    title = title +".csv";

    const data = fs.readFileSync(file.path);
    const mainDirectory = path.join(process.cwd(),"/..");
    const postsDirectory = path.join(mainDirectory, 'energyData/',organisation,"/",site,"/");
    const fullPath = path.join(postsDirectory,title);
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
    await fs.unlinkSync(file.path);
    return;
  } catch (error) {
    console.log(error);
  }
}

export default async function handler(req,res){
  try {
    const form = new IncomingForm();
    form.parse(req, async function (err, fields, files) {
      await saveFile(files.file,fields.site,fields.organisation,fields.title);
      return res.status(200).json({ message: "File uploaded" });
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Error" });
  }
}