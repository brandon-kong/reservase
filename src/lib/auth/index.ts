import { api } from '@/lib/axios';
import { TokenTypes } from '@/types/types';

export async function tokenIsValid(token: string): Promise<boolean> {
    try {
        const { data, status } = await api.post('/users/token/verify/', {
            token,
        });

        if (status === 200) {
            return true;
        }
    } catch (error: any) {
        return false;
    }

    return false;
}

export async function refreshToken(token: TokenTypes): Promise<TokenTypes | null> {
    //console.log("used as parameter: ", refresh)
    // To prevent unnecessary requests to the server
    const refresh = token.refresh;

    if (!refresh) {
        return {
            ...token,
            error: 'No refresh token provided',
        };
    }

    try {
        const { data, status } = await api.post('/users/token/refresh/', {
            refresh,
        });

        if (status === 200) {
            return {
                ...token,
                access: data.access,
                refresh: data.refresh,
            };
        }
    } catch (error: any) {
        return {
            ...token,
            error: error,
        };
    }

    return null;
}
