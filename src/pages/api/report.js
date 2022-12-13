import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import { calculateEnergyData } from '../../lib/csv';

import { getDataBetween } from '../../lib/csv';

import moment from 'moment';

export default async function handler(req, res) {
    if(!Object.keys(req.query).includes("site") || !Object.keys(req.query).includes("dateStart") || !Object.keys(req.query).includes("dateEnd") || !Object.keys(req.query).includes("frequency")){
        res.status(400).json({error: "Missing query parameters"});
    }

    let siteID = req.query.site;

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

    // Get data
    const data = await getDataBetween(req.query.dateStart, req.query.dateEnd, site.organisation.name, site.name)

    // Filter to certain frequency
    let filteredData = []
    if(req.query.frequency == "Day"){
        filteredData = data.filter((row) => {
            return moment(row.Date).format("HH:mm:ss") == "00:00:00"
        })
    }else if(req.query.frequency == "Hour"){
        filteredData = data.filter((row) => {
            return moment(row.Date).format("mm") == "00"
        })
    }else if(req.query.frequency == "Month"){
        filteredData = data.filter((row) => {
            return moment(row.Date).format("DD HH:mm:ss") == "01 00:00:00"
        })
    }else if(req.query.frequency == "Week"){
        filteredData = data.filter((row) => {
            return moment(row.Date).format("d HH:mm:ss") == "0 00:00:00"
        })
    }

    res.json(filteredData)
}