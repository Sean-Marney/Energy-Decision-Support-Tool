import path from 'path';
import { emitWarning } from 'process';
export default async function handler(req, res) {
  // console.log(req.body.newfile);
    let fs = require('fs');
    if (req.method === "POST") {
        let mainDirectory = path.join(process.cwd(),"/..");
        let organisation = req.body.organisation;
        let site = req.body.site;
        let file = req.body.file;
        const postsDirectory = path.join(mainDirectory, 'energyData/',organisation,"/",site,"/");
        const fullPath = path.join(postsDirectory,"/energyData.csv");
        const fileContents = fs.readFileSync(file, 'utf8');
        try {
            if (!fs.existsSync(path.join(mainDirectory, 'energyData/',organisation))) {
              fs.mkdirSync(path.join(mainDirectory, 'energyData/',organisation));
            }
            if (!fs.existsSync(path.join(mainDirectory, 'energyData/',organisation,"/",site))) {
                fs.mkdirSync(path.join(mainDirectory, 'energyData/',organisation,"/",site));
            }
          } catch (err) {
            console.error(err);
        }
        fs.appendFile(fullPath, fileContents, err => {
            if (err) {
              console.error(err);
            }
        });
    res.status(200).json({ message: "Modified" });
  // } else {
  //   res.status(500).json({ message: "HTTP method must be POST" });
  // }
}