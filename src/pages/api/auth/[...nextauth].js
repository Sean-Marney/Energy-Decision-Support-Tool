import NextAuth from "next-auth/next";
import {
  compare
} from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import {
  prisma
} from "../../../lib/prisma";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        var result = null
        try {
          result = await prisma.user.findFirst({
            where: {
              email: credentials.email,
            },
          })
        } catch (e) {
          console.error(e)
          return null
        }

        if (!result) {
          return null
        }

        const checkPassword = await compare(
          credentials.password, // db password
          result.password // signup password
        );

        if (!checkPassword || result.email !== credentials.email) {
          throw new Error("Email or password doesn't match")
        }
        return result
      },
    }),
  ],
}

export default NextAuth(authOptions);