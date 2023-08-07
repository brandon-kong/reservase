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

type UserPropertyListProps = {
    id: number;
    user: SessionUser;
};

export default function UserPropertyList({ id }: UserPropertyListProps) {
    const router = useRouter();
    const { data: session, update } = useSession();

    const { user } = session || { user: null };

    const {
        data: propertiesData,
        error: error,
        isLoading,
        mutate,
    } = useSWR(`http://127.0.0.1:8000/properties/user/${id}/`, fetcherGet);
    const { host: propertyHost, properties } = propertiesData || { host: null, properties: [] };

    if (!propertiesData && error) return notFound();
    if (!propertiesData && isLoading) return <div>loading...</div>;

    update();

    const userIsOnOwnPropertyListing = user?.pk === propertyHost.pk;

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
            {userIsOnOwnPropertyListing ? (
                <Text>Your Properties</Text>
            ) : (
                <Text>{propertyHost.first_name + ' ' + propertyHost.last_name + "'s Properties"}</Text>
            )}
            {userIsOnOwnPropertyListing ? (
                <PrimaryButton
                    onClick={() => {
                        router.push('/property/create');
                    }}
                >
                    Create Property
                </PrimaryButton>
            ) : null}

            {properties.length === 0 ? (
                <Text>
                    {userIsOnOwnPropertyListing
                        ? 'You have no properties. Create one now!'
                        : 'This user has no properties.'}
                </Text>
            ) : (
                properties.map((property: Property) => {
                    return (
                        <PropertyListing
                            key={property.pk}
                            property={property}
                            userIsOnOwnPropertyListing={userIsOnOwnPropertyListing}
                            handleWishlistProperty={handleWishlistPropertyCallback}
                            handleDeleteProperty={handleDeletePropertyCallback}
                            mutate={mutate}
                        />
                    );
                })
            )}
        </Flex>
    );
}
