import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import { calculateEnergyData } from '../../../lib/csv';

import { getDataProperties } from '../../../lib/csv';

export default async function handler(req, res) {
    if(!Object.keys(req.query).includes("site")){
        res.status(400).json({error: "Missing query parameters"}).end()
    }else{
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
    
    
        // Get properties
        const properties = await getDataProperties(site.organisation.name, site.name)
    
        res.json(properties)
    }
}