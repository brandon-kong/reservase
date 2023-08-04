import { api, clientApi } from '@/lib/axios';
import { CreatePropertyParams, GetUserPropertiesReturn } from '@/types/properties/types';
import { getSession } from 'next-auth/react';

export async function createProperty(property: CreatePropertyParams) {
    const session = await getSession();

    const user = session?.user as any;

    if (!user) {
        throw new Error('User not found');
    }

    try {
        const { data, status } = await clientApi.post('/properties/create/', property, {
            headers: {
                Authorization: `Bearer ${user.access}`,
            },
        });

        if (status !== 201) {
            return null;
        } else {
            return data;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function getUserProperties(pk: number): Promise<GetUserPropertiesReturn | null> {
    try {
        const { data, status } = await api.get(`/properties/user/${pk}`);

        if (status !== 200) {
            return null;
        } else {
            return data;
        }
    } catch (error) {
        return null;
    }
}
