import NextAuth from "next-auth/next";
import { compare } from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "../../../lib/prisma";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        const result = await prisma.user.findFirst({
          where: {
            email: credentials.email,
          },
        });

        if (!result) {
          throw new Error("User not found with provided email");
        }

        const checkPassword = await compare(
          credentials.password, // db password
          result.password // signup password
        );

        if (!checkPassword || result.email !== credentials.email) {
          throw new Error("Email or password doesn't match");
        }

        return result;
      },
    }),
  ],
});
