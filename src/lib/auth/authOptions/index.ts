import GoogleProvider from 'next-auth/providers/google';
import CredentialProvider from 'next-auth/providers/credentials';
import type { NextAuthOptions } from 'next-auth';
import { JWTCallbackParams, SessionCallbackParams } from '@/types/types';
import type { JWT } from 'next-auth/jwt';

import { api } from '@/lib/axios';
import { refreshToken } from '@/lib/auth';

import jwtDecode from 'jwt-decode';

const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET as string,
    session: {
        strategy: 'jwt',
    },

    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,

            authorization: {
                params: {
                    prompt: 'consent',
                    access_type: 'offline',
                    response_type: 'code',
                },
            },
        }),

        CredentialProvider({
            name: 'Credentials',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'text',
                    placeholder: 'Email',
                },
                password: {
                    label: 'Password',
                    type: 'password',
                    placeholder: 'Password',
                },
            },

            async authorize(credentials: any, req: any): Promise<any> {
                const { email, password } = credentials;

                try {
                    const { data, status } = await api.post('/users/login/', {
                        email,
                        password,
                    });

                    if (status === 200) {
                        return {
                            access: data.access,
                            refresh: data.refresh,
                            ...data.user,
                        };
                    }

                    return null;
                } catch (error: any) {
                    return null;
                }
            },
        }),
    ],

    callbacks: {
        async jwt({ token, user, account, profile, trigger }: JWTCallbackParams): Promise<any> {
            if (user) {
                if (!user.access || !user.refresh) {
                    return token;
                }
                token.access = user.access;
                token.refresh = user.refresh;

                token.user = user;
            }

            const tokenAccess = token.access;
            const tokenRefresh = token.refresh;

            const decodedAccess = jwtDecode<JWT>(tokenAccess);
            const decodedRefresh = jwtDecode<JWT>(tokenRefresh);

            if (decodedAccess.exp * 1000 > Date.now()) {
                return Promise.resolve(token);
            }

            if (decodedRefresh.exp * 1000 < Date.now()) {
                return {
                    ...token,
                    error: 'Refresh token expired',
                    exp: 0,
                };
            }

            const newToken = await refreshToken(token);
            if (newToken) {
                newToken.user = token.user;
                newToken.user.access = newToken.access;
                newToken.user.refresh = newToken.refresh;

                return newToken;
            }
        },

        async session({ session, token, user }: SessionCallbackParams): Promise<any> {
            session.access = token.access;
            session.refresh = token.refresh;
            session.error = token.error;

            session.user = token.user;
            return session;
        },

        async signIn({ user, account, profile, email, credentials }: any) {
            if (credentials) {
                return true;
            }

            if (account) {
                const { access_token, id_token, provider } = account;
                try {
                    const response = await api.post('/users/oauth/google/', {
                        access_token: id_token,
                    });

                    if (response.status === 200) {
                        account.user = response.data.user;
                        user.pk = response.data.user.pk;
                        user.access = response.data.access;
                        user.refresh = response.data.refresh;

                        return true;
                    }

                    return false;
                } catch (error: any) {
                    return false;
                }
            }

            return false;
        },
    },
};

export default authOptions;