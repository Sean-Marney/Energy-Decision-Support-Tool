import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";

export default class Session {
    async getSession(context){
        return await unstable_getServerSession(context.req, context.res, authOptions)
    }
}