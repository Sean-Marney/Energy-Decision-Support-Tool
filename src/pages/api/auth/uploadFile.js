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
    // const postsDirectory = path.join(mainDirectory, 'res/',organisation,"/",site,"/",title);
    let postsDirectory = path.join(mainDirectory, 'res/',organisation)
    try {
      if (!fs.existsSync(postsDirectory)) {
        fs.mkdirSync(postsDirectory);
      }
      postsDirectory = path.join(postsDirectory,"/",site)
      if (!fs.existsSync(path.join(postsDirectory))) {
          fs.mkdirSync(path.join(postsDirectory));
      }
      postsDirectory = path.join(postsDirectory,"/",title)
    } catch (err) {
      console.error(err);
    }
    fs.writeFileSync(postsDirectory, data);
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