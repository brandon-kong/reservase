import axios from 'axios';
import { getSession } from 'next-auth/react';

export const api = axios.create({
    baseURL: process.env.BACKEND_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const clientApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL,
});

type FetcherProps = [string, string];

export const fetcherGet = async ([url, token]: FetcherProps) => {
    const session = await getSession();

    const user = session?.user as any;
    const access = user?.access;

    return clientApi
        .get(url, {
            headers: {
                Authorization: `${access ? `Bearer ${access}` : null}`,
            },
        })
        .then(res => res.data);
};

export const fetcherPost = (url: string) => clientApi.post(url).then(res => res.data);
