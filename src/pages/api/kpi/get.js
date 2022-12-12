import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import { calculateEnergyData } from '../../../lib/csv';

export default async function handler(req, res) {
    if(!Object.keys(req.query).includes("organisation") || !Object.keys(req.query).includes("site")){
        res.status(400).json({error: "Missing query parameters"});
    }

    let organisationID = req.query.organisation;
    let site = req.query.site;

    let targets

    //Get organisation
    const organisation = await prisma.organisation.findUnique({
        where: {
            id: parseInt(organisationID)
        }
    })

    if(!organisation){
        res.status(400).json({error: "Organisation not found"})
    }


    //Get targets
    try {
        targets = await prisma.target.findMany({
            where: {
                organisationID: parseInt(organisationID),
                siteID: parseInt(site)
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
    const energyData = calculateEnergyData(organisation.name)

    res.json({
        "targets": kpiTargets,
        "actual": energyData
    })
}