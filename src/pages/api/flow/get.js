import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import { calculateForSankey } from '../../../lib/csv';

export default async function handler(req, res) {
    console.log("3")
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




    //Get KPIs
    const energyData = calculateForSankey(organisation.name)
    res.json({
        "data": energyData
    })
}