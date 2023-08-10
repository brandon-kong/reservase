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

    pages: {
        signIn: '/?open-sign-in=true',
        signOut: '/?open-sign-in=true',
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
            id: 'email-password',
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
                    const { data, status } = await api.post('/users/token/email/', {
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

        CredentialProvider({
            id: 'phone-otp',
            name: 'Phone OTP',
            credentials: {
                phone: {
                    label: 'Phone',
                    type: 'text',
                    placeholder: 'Phone',
                },
                token: {
                    label: 'Token',
                    type: 'text',
                    placeholder: 'Token',
                },
                country_code: {
                    label: 'Country Code',
                    type: 'text',
                    placeholder: 'Country Code',
                },
            },

            async authorize(credentials: any, req: any): Promise<any> {
                const { phone, token, country_code } = credentials;

                const phoneWithCountryCode = country_code + phone;

                try {
                    const { data, status } = await api.post('/users/login/otp/phone/', {
                        phone: phoneWithCountryCode,
                        token,
                    });

                    const detail = data.detail as { [key: string]: any };

                    if (status === 200) {
                        return {
                            access: detail.access,
                            refresh: detail.refresh,
                            ...detail.user,
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
                    const response = await api.post('/users/token/oauth/google/', {
                        access_token: id_token,
                    });

                    if (response.status === 200) {
                        account.user = response.data.user;
                        user.first_name = response.data.user.first_name;
                        user.last_name = response.data.user.last_name;
                        user.pk = response.data.user.pk;
                        user.access = response.data.access;
                        user.refresh = response.data.refresh;

                        return true;
                    }

                    return '/?open-sign-in=true&error=oauth';
                } catch (error: any) {
                    return '/?open-sign-in=true&error=oauth';
                }
            }

            return false;
        },
    },
};

export default authOptions;
