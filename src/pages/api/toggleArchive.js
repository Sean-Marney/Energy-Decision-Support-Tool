import { hash } from "bcrypt";
import { prisma } from "../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    if (!req.body) return res.status(404).json({ error: "No user input " });
    await prisma.optimisations.update({
      where: {
        id: req.body.id,
      },
      data: {
        archived: req.body.value,
      },
    })
    res.status(200).json({ message: "Modified" });
  } else {
    res.status(500).json({ message: "HTTP method must be POST" });
  }
}
