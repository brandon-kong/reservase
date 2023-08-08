'use client';

import { handleDeleteProperty, handleWishlistProperty } from '@/lib/property';
import { useRouter, notFound } from 'next/navigation';

import { Flex } from '@chakra-ui/react';
import { SessionUser } from '@/types/types';
import useSWR from 'swr';
import { fetcherGet } from '@/lib/axios';
import PropertyListing from '@/components/PropertyListing';

type WishlistProps = {
    user: SessionUser;
};

export default function WishlistPropertiesView({ user }: WishlistProps) {
    const router = useRouter();

    const { data: propertiesData, error: error, isLoading, mutate } = useSWR(`/properties/wishlist/`, fetcherGet);

    //alert(JSON.stringify(propertiesData))
    const { wishlist } = propertiesData || { wishlist: [] };

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
            {wishlist.map((propertyGroup: any) => {
                const { property } = propertyGroup;
                return (
                    <PropertyListing
                        mutate={mutate}
                        key={property.pk}
                        property={property}
                        userIsOnOwnPropertyListing={property.host.pk === user.pk}
                        handleWishlistProperty={handleWishlistPropertyCallback}
                        handleDeleteProperty={handleDeletePropertyCallback}
                    />
                );
            })}
        </Flex>
    );
}
