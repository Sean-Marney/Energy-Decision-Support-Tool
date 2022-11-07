import { hash } from "bcrypt";
import { prisma } from "../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    if (!req.body) return res.status(404).json({ error: "No user input " });
    const { email, password } = req.body; // getting user input from form

    const checkExisting = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (checkExisting)
      return res.status(422).json({ message: "User already exists" });

    await prisma.user.create({
      data: {
        email,
        password: await hash(password, 12),
      },
    });
    res.status(200).json({ message: "User created" });
  } else {
    res.status(500).json({ message: "HTTP method must be POST" });
  }
}
