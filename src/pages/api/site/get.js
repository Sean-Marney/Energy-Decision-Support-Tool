import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handler(req, res) {
    if(!Object.keys(req.query).includes("organisation")){
        res.status(400).json({error: "Missing query parameters"});
    }
    let organisationID = req.query.organisation;
    let sites;
    console.log(organisationID);  
    try {
        sites = await prisma.site.findMany({
            where: {
                organisationID: parseInt(organisationID)
            }, select: {
                id: true,
            name: true,
            },
        });
        } catch (error) {
            console.log(error);
        };
        res.json({
            "sites": sites
        })
}