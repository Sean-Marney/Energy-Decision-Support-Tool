import { prisma } from "../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    if (!req.body) return res.status(404).json({ error: "No user input " });
    const { orgName } = req.body; // getting user input from form

    const checkExisting = await prisma.organisation.findFirst({
      where: {
        orgName,
      },
    });
    if (checkExisting)
      return res.status(422).json({ message: "Organisation already exists" });

    await prisma.organisation.create({
      data: {
        orgName,
      },
    });
    try{
      await prisma.targets.createMany({
        data: [
          {
            name: "cost",
            timeframe: "weekly",
            value: 0,
            organisation: orgName
          }, {
            name: "energy",
            timeframe: "weekly",
            value: 0,
            organisation: orgName
          }, {
            name: "carbon",
            timeframe: "weekly",
            value: 0,
            organisation: orgName
          },
          {
            name: "cost",
            timeframe: "monthly",
            value: 0,
            organisation: orgName
          }, {
            name: "energy",
            timeframe: "monthly",
            value: 0,
            organisation: orgName
          }, {
            name: "carbon",
            timeframe: "monthly",
            value: 0,
            organisation: orgName
          }
        ]
      })      
    }catch(error){
      console.log(error)
    }


    res.status(200).json({ message: "Organisation created" });
  } else {
    res.status(500).json({ message: "HTTP method must be POST" });
  }
}
