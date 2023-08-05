'use client';

import { PrimaryButton, PrimaryOutlineButton } from '@/components/Buttons';
import {
    deleteProperty,
    getUserProperties,
    wishlistProperty,
    handleDeleteProperty,
    handleWishlistProperty,
} from '@/lib/property';
import { Property } from '@/types/properties/types';
import { useRouter, redirect, notFound } from 'next/navigation';

import { Flex, Text } from '@chakra-ui/react';
import { SessionUser } from '@/types/types';
import useSWR from 'swr';
import { fetcherGet } from '@/lib/axios';
import PropertyListing from '@/components/PropertyListing';
import { useSession } from 'next-auth/react';

type WishlistProps = {
    user: SessionUser;
};

export default function WishlistPropertiesView({ user }: WishlistProps) {
    const router = useRouter();

    const id = user.pk;

    const {
        data: propertiesData,
        error: error,
        isLoading,
        mutate,
    } = useSWR([`/properties/wishlist/`, user.access], fetcherGet);
    const { user: propertyHost, wishlist } = propertiesData || { user: null, properties: [] };

    if (!propertiesData && error) return notFound();
    if (!propertiesData && isLoading) return <div>loading...</div>;

    const handleDeletePropertyCallback = async (propertyId: number) => {
        if (!user) {
            return router.push('/account/login');
        }

        handleDeleteProperty({
            propertyId,
            mutate,
            user,
        });

        // TODO: Add error handling

        return;
    };

    const handleWishlistPropertyCallback = async (propertyId: number) => {
        if (!user) {
            return router.push('/account/login');
        }

        handleWishlistProperty({
            propertyId,
            mutate,
            user,
        });
    };

    return (
        <Flex direction={'column'} gap={4} p={20}>
            {wishlist.map((property: Property) => {
                return (
                    <PropertyListing
                        key={property.pk}
                        property={property}
                        userIsOnOwnPropertyListing={property.user.pk === user.pk}
                        handleWishlistProperty={handleWishlistPropertyCallback}
                        handleDeleteProperty={handleDeletePropertyCallback}
                    />
                );
            })}
        </Flex>
    );
}
