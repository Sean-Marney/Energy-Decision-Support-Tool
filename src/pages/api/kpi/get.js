import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import { calculateEnergyData } from '../../../lib/csv';

export default async function handler(req, res) {
    if(!Object.keys(req.query).includes("organisation") || !Object.keys(req.query).includes("site")){
        res.status(400).json({error: "Missing query parameters"});
    }

    let organisationID = req.query.organisation;
    let siteID = req.query.site;

    let targets

    //Get organisation
    const site = await prisma.site.findUnique({
        where: {
            id: parseInt(organisationID)
        },
        include: {  
            organisation: true
        }
    })
    if(!site){
        res.status(400).json({error: "Organisation or site not found"})
    }

    //Get targets
    try {
        targets = await prisma.target.findMany({
            where: {
                organisationID: parseInt(site.organisation.id),
                siteID: parseInt(site.id)
            }
        })
    } catch(err){
        console.log(err)
        res.status(500).json({error: "Error reading targets from database"})
    }
    console.log(targets);
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
    const energyData = await calculateEnergyData(site.organisation.name, site.name)
    res.json({
        "targets": kpiTargets,
        "actual": energyData
    })
}