import { prisma } from "../../lib/prisma";

export default async function handler(req, res) {
  switch(req.method){
    case "GET":
      if(!Object.keys(req.query).includes("site")){
        res.status(400).json({error: "Missing query parameters"});
      }

      const targets = await prisma.target.findMany({
          where: {
              siteID: parseInt(req.query.site),
          }
      })

      res.json(targets)
      break
    
    case "PUT":
      if(req.body == null || !Object.keys(req.query).includes("site")){
        res.status(400).json({error: "Missing query parameters"});
      }
      
      const targetsData = req.body

      targetsData.forEach(async (target) => {
        await prisma.target.update({
          where: {
            id: parseInt(target.id),
          },
          data: {
            value: parseInt(target.value),
          }
        })
      })

      res.status(204).end()
      break

    default:
      res.status(405).json({ message: "HTTP method must be GET or PUT" });
  }
}
