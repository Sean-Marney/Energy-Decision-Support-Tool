import { prisma } from "../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {

    if(req.body == null || !Object.keys(req.query).includes("site")){
        res.status(400).json({error: "Missing query parameters"});
    }

    const targets = await prisma.target.findMany({
        where: {
            siteID: parseInt(req.query.site),
        }
    })

    res.json(targets)
  } else {
    res.status(405).json({ message: "HTTP method must be GET" });
  }
}
