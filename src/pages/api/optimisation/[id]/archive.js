import { prisma } from "../../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "PATCH") {

    console.log(req.body)

    if(req.body == null || !Object.keys(req.body).includes("value")){
        res.status(400).json({error: "Missing query parameters"});
    }

    await prisma.optimisation.update({
      where: {
        id: parseInt(req.query.id),
      },
      data: {
        archived: req.body.value,
      },
    })
    res.status(204).end()
  } else {
    res.status(405).json({ message: "HTTP method must be PATCH" });
  }
}
