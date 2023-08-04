import axios from 'axios';

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

export const fetcherGet = ([url, token]: FetcherProps) =>
    clientApi
        .get(url, {
            headers: {
                Authorization: `${token ? `Bearer ${token}` : null}`,
            },
        })
        .then(res => res.data);

export const fetcherPost = (url: string) => clientApi.post(url).then(res => res.data);
