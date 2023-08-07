import { getSession } from 'next-auth/react';
import { clientApi } from '@/lib/axios';

export const reserveProperty = async (pk: string, reservation: any) => {
    const session = await getSession();

    const user = session?.user as any;

    if (!user) {
        throw new Error('User not found');
    }

    try {
        const { data, status } = await clientApi.post(`/properties/reserve/${pk}/`, reservation, {
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
        return null;
    }
};

export const cancelReservation = async (pk: string) => {
    const session = await getSession();

    const user = session?.user as any;

    if (!user) {
        throw new Error('User not found');
    }

    try {
        const { data, status } = await clientApi.post(
            `/properties/reservation/${pk}/cancel/`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${user.access}`,
                },
            },
        );

        if (status !== 200) {
            return null;
        } else {
            return true;
        }
    } catch (error) {
        return null;
    }
};

export const acceptReservation = async (pk: string) => {
    const session = await getSession();

    const user = session?.user as any;

    if (!user) {
        throw new Error('User not found');
    }

    try {
        const { data, status } = await clientApi.post(
            `/properties/reservation/${pk}/status/`,
            {
                status: 'accepted',
            },
            {
                headers: {
                    Authorization: `Bearer ${user.access}`,
                },
            },
        );

        if (status !== 200) {
            return null;
        } else {
            return true;
        }
    } catch (error) {
        return null;
    }
};

export const declineReservation = async (pk: string) => {
    const session = await getSession();

    const user = session?.user as any;

    if (!user) {
        throw new Error('User not found');
    }

    try {
        const { data, status } = await clientApi.post(
            `/properties/reservation/${pk}/status/`,
            {
                status: 'declined',
            },
            {
                headers: {
                    Authorization: `Bearer ${user.access}`,
                },
            },
        );

        if (status !== 200) {
            return null;
        } else {
            return true;
        }
    } catch (error) {
        return null;
    }
};
