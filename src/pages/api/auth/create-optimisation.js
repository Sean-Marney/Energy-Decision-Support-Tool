import { prisma } from "../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    if (!req.body) return res.status(404).json({ error: "No user input " });
    const { organisation, title, body, priority, archived } = req.body; // getting user input from form

    const checkExisting = await prisma.optimisations.findFirst({
      where: {
        title,
      },
    });
    if (checkExisting)
      return res.status(422).json({ message: "Optimisation already exists" });

    await prisma.optimisations.create({
      data: {
        organisation,
        title,
        body,
        priority,
        archived,
      },
    });
    res.status(200).json({ message: "Organisation created" });
  } else {
    res.status(500).json({ message: "HTTP method must be POST" });
  }
}
