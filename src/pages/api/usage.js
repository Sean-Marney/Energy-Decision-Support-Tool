import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import { calculateEnergyUsage } from '../../lib/csv';

export default async function handler(req, res) {
    if (!Object.keys(req.query).includes("organisation") || !Object.keys(req.query).includes("site") || !Object.keys(req.query).includes("startDate") || !Object.keys(req.query).includes("endDate")){
        res.status(400).json({error: "Missing query parameters"});
    }

    let organisationID = req.query.organisation;
    let start = req.query.startDate;
    let end = req.query.endDate;

    let targets

    //Get site
    const site = await prisma.site.findUnique({
        where: {
            id: parseInt(req.query.site)
        },
        include: {
            organisation: true
        }
    })

    //Get KPIs
    const energyData = await calculateEnergyUsage(site.organisation.name, site.name, start, end)
    console.log("ooga",energyData)
    res.json({
        "data": energyData
    })
}