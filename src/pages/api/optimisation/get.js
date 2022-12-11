import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handler(req, res) {
    if(!Object.keys(req.query).includes("organisation") || !Object.keys(req.query).includes("site")){
        res.status(400).json({error: "Missing query parameters"});
    }

    let organisationID = req.query.organisation;
    let site = req.query.site;

    let optimisations

    //Get optimisations
    try {
        optimisations = await prisma.optimisation.findMany({
            where: {
                organisationID: parseInt(organisationID),
                siteID: parseInt(site)
            }
        })
    } catch(err){
        console.log(err)
        res.status(500).json({error: "Error reading optimisations from database"})
    }

    res.json(optimisations)
}