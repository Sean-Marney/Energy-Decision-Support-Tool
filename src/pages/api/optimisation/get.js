import { prisma } from "../../../lib/prisma";

export default async function handler(req, res) {
    if(!Object.keys(req.query).includes("organisation") || !Object.keys(req.query).includes("site")){
        res.status(400).json({error: "Missing query parameters"});
    }

    let site = req.query.site;

    let optimisations

    //Get optimisations
    try {
        optimisations = await prisma.optimisation.findMany({
            where: {
                siteID: parseInt(site)
            }
        })
    } catch(err){
        console.log(err)
        res.status(500).json({error: "Error reading optimisations from database"})
    }

    res.json(optimisations)
}