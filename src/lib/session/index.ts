import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export const getSession = async () => {
    const session = await getServerSession({ ...authOptions });
    return session;
}

export const getCurrentUser = async () => {
    const session = await getSession();
    return session?.user;
}