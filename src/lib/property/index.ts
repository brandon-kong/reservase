import { api, clientApi } from '@/lib/axios';
import { CreatePropertyParams, GetUserPropertiesReturn, ReviewCreate } from '@/types/properties/types';
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
        return null;
    }
}

export async function getUserProperties(pk: number): Promise<GetUserPropertiesReturn | null> {
    try {
        const { data, status } = await api.get(`/properties/user/${pk}/`);

        if (status !== 200) {
            return null;
        } else {
            return data;
        }
    } catch (error) {
        return null;
    }
}

export async function getProperty(pk: number): Promise<GetUserPropertiesReturn | null> {
    try {
        const { data, status } = await api.get(`/properties/${pk}/`);

        if (status !== 200) {
            return null;
        } else {
            return data;
        }
    } catch (error) {
        return null;
    }
}

export async function deleteProperty(pk: number) {
    const session = await getSession();

    const user = session?.user as any;

    if (!user) {
        throw new Error('User not found');
    }

    try {
        const { status } = await clientApi.delete(`/properties/${pk}/delete/`, {
            headers: {
                Authorization: `Bearer ${user.access}`,
            },
        });

        if (status !== 204) {
            return false;
        } else {
            return true;
        }
    } catch (error) {
        return false;
    }
}

export async function wishlistProperty(pk: number) {
    const ACCEPTED_STATUSES = [201, 204];

    const session = await getSession();

    const user = session?.user as any;

    if (!user) {
        throw new Error('User not found');
    }

    try {
        const { status } = await clientApi.post(
            `/properties/${pk}/wishlist/`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${user.access}`,
                },
            },
        );

        if (!ACCEPTED_STATUSES.includes(status)) {
            return false;
        } else {
            return true;
        }
    } catch (error) {
        return false;
    }
}

export async function addReviewToProperty(pk: number, review: ReviewCreate) {
    const session = await getSession();

    const user = session?.user as any;

    if (!user) {
        throw new Error('User not found');
    }

    try {
        const { status } = await clientApi.post(`/properties/${pk}/review/create/`, review, {
            headers: {
                Authorization: `Bearer ${user.access}`,
            },
        });

        if (status !== 201) {
            return false;
        } else {
            return true;
        }
    } catch (error) {
        return false;
    }
}

export async function editProperty(pk: number, property: CreatePropertyParams) {
    const session = await getSession();

    const user = session?.user as any;

    if (!user) {
        throw new Error('User not found');
    }

    try {
        const { data, status } = await clientApi.post(`/properties/${pk}/edit/`, property, {
            headers: {
                Authorization: `Bearer ${user.access}`,
            },
        });

        if (status !== 200) {
            return null;
        } else {
            return true;
        }
    } catch (error) {
        return null;
    }
}

type HandlePropertyProps = {
    user: any;
    propertyId: number;
    mutate: () => void;
};

export const handleDeleteProperty = async ({ user, propertyId, mutate }: HandlePropertyProps) => {
    const deleted = await deleteProperty(propertyId);
    if (deleted) {
        mutate();
    }

    // TODO: Add error handling

    return;
};

export const handleWishlistProperty = async ({ user, propertyId, mutate }: HandlePropertyProps) => {
    const successfullyWishlisted = await wishlistProperty(propertyId);
    if (successfullyWishlisted) {
        mutate();
    }

    // TODO: Add error handling
};

export const reserveProperty = async (pk: number, reservation: any) => {
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

        if (status !== 200) {
            return null;
        } else {
            return true;
        }
    } catch (error) {
        return null;
    }
};
