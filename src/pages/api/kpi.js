import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import { calculateEnergyData } from '../../lib/csv';

export default async function handler(req, res) {
    if(!Object.keys(req.query).includes("site")){
        res.status(400).json({error: "Missing query parameters"});
    }

    let siteID = req.query.site;

    let targets

    //Get site
    const site = await prisma.site.findUnique({
        where: {
            id: parseInt(siteID)
        },
        include: {
            organisation: true
        }
    })
    
    if(!site){
        res.status(400).json({error: "Site not found"})
    }


    //Get targets
    try {
        targets = await prisma.target.findMany({
            where: {
                siteID: parseInt(siteID)
            }
        })
    } catch(err){
        console.log(err)
        res.status(500).json({error: "Error reading targets from database"})
    }

    //Prepare KPI targets
    let kpiTargets = {"weekly": {}, "monthly": {}}
    targets.forEach((target) => {
        if(Object.keys(kpiTargets).includes(target.timeframe)){
            kpiTargets[target.timeframe][target.name] = target.value
        }else{
            kpiTargets[target.timeframe] = {
                [target.name]: target.value
            }
        }
    })

    //Get KPIs
    const energyData = calculateEnergyData(site.organisation.name)

    res.json({
        "targets": kpiTargets,
        "actual": energyData
    })
}