import { prisma } from "../../lib/prisma";
import { Prisma } from "@prisma/client";

export default async function handler(req, res) {
    try {

        await prisma.targets.updateMany({
            where: {
                name: 'cost',
                organisation: req.body.organisationID,
                timeframe: req.body.timeframe
            },
            data: {
                value: req.body.cost,
            }
        });

        await prisma.targets.updateMany({
            where: {
                name: 'energy',
                organisation: req.body.organisationID,
                timeframe: req.body.timeframe
            },
            data: {
                value: req.body.energy,
            }
        });

        await prisma.targets.updateMany({
            where: {
                name: 'carbon',
                organisation: req.body.organisationID,
                timeframe: req.body.timeframe
            },
            data: {
                value: req.body.carbon,
            }
        });

    
        res.status(200).json({ response: 'Records updated successfully.' })
    } catch (error) {
        res.status(200).json({ response: 'Something went wrong.' })
    };

}