import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handler(req, res) {
    let organisation = [];
    try {
       organisation = await prisma.organisation.findMany({
        include: {
            Site: true
        }    
        })
    } catch (error) {
        console.log(error);
    };
    res.json({
    "organisations": organisation
    })
}