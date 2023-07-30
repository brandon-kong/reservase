import NextAuth, { User, Account, Profile, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next"

import jwtDecode from "jwt-decode";

// These two values should be a bit less than actual token lifetimes
const BACKEND_ACCESS_TOKEN_LIFETIME = 45 * 60;            // 45 minutes
const BACKEND_REFRESH_TOKEN_LIFETIME = 6 * 24 * 60 * 60;  // 6 days

async function refreshAccessToken(token: any): Promise<any | null> {
    try {
      const res = await fetch(
        `${process.env.NEXTAUTH_BACKEND_URL}token/refresh/`,
        {
          method: "POST",
          body: JSON.stringify({ refresh: token.refresh }),
          headers: { "Content-Type": "application/json" },
        }
      );
      const refreshedToken = await res.json();
  
      if (res.status !== 200) throw refreshedToken;
  
      const { exp }: any = jwtDecode(refreshedToken.access);
  
      return {
        ...token,
        ...refreshedToken,
        exp,
      };
    } catch (error) {
      return {
        ...token,
        error: "RefreshAccessTokenError",
      };
    }
  }

type CredentialsProps = {
    user: any,
    account: any,
    profile?: any,
    email?: string,
    credentials?: any,
}

export const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: BACKEND_REFRESH_TOKEN_LIFETIME,
  },

  pages: {
    error: '/account/login',
    signIn: "/account/login",
    
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {label: "Email", type: "text", placeholder: "Email address"},
        password: {label: "Password", type: "password"}
      },

      async authorize(credentials, req) {
        try {
            const response = await axios({
                url: process.env.NEXTAUTH_BACKEND_URL + "login",
                method: "post",
                data: credentials,
            });
            const data = response.data;

            if (response.status === 200) {
                const user = data.user;

                user.accessToken = data.access;
                user.refreshToken = data.refresh;

                user.name = user.first_name + " " + user.last_name;


                return user;
            }
            
            return null;
        } catch (error: any) {
            return null
        }
      },
    }),
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        authorization: {
          params: {
            prompt: "consent",
            access_type: "offline",
            response_type: "code"
          }
        },
      }),
  ],
  callbacks: {
    async signIn({user, account, profile, email, credentials}: any) {
        if (credentials) {
            return true;
        }

        if (account) {
          const { access_token, id_token, provider } = account;
          try {
            const response = await axios({
                url: process.env.NEXTAUTH_BACKEND_URL + "oauth/google",
                method: "post",
                data: {
                    access_token: id_token,
                },
            });

            if (response.status === 200) {


                account.user = response.data.user;
                user.pk = response.data.user.pk;
                user.first_name = response.data.user.first_name;
                user.last_name = response.data.user.last_name;
                user.accessToken = response.data.access;

                return true;
            }
            
            return false;
        } catch (error: any) {
            return false
        }
        }

        return false;
    },

    async jwt({user, token, account}: any) {
        if (user && account) {
          token.user = user;
            return token;
        }

        if (Date.now() < token.exp * 1000) {
            return token;
        }

        const a = await refreshAccessToken(token);
        console.log(a)
        return await a || null;
    },

    async session({ session, token, user }: any) {
        session.user = token.user;
        session.accessToken = token.accessToken;
        return session;
    },
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await NextAuth(req, res, authOptions);
}
