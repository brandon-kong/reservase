import authOptions from '@/lib/auth/authOptions';
import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';

const handler = (req: any, res: any) => NextAuth(req, res, authOptions);

export { handler as POST, handler as GET };
