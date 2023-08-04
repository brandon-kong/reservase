'use client';

import { PrimaryButton, PrimaryOutlineButton } from '@/components/Buttons';
import { deleteProperty, getUserProperties, wishlistProperty } from '@/lib/property';
import { Property } from '@/types/properties/types';
import { useRouter, redirect, notFound } from 'next/navigation';

import { Flex, Text } from '@chakra-ui/react';
import { SessionUser } from '@/types/types';
import useSWR from 'swr';
import { fetcherGet } from '@/lib/axios';

type UserPropertyListProps = {
    id: number;
    user?: SessionUser;
};

export default function UserPropertyList({ user, id }: UserPropertyListProps) {
    const router = useRouter();

    const {
        data: propertiesData,
        error: error,
        isLoading,
        mutate,
    } = useSWR([`http://127.0.0.1:8000/properties/user/${id}/`, user?.access], fetcherGet);
    const { user: propertyHost, properties } = propertiesData || { user: null, properties: [] };

    if (!propertiesData && error) return notFound();
    if (!propertiesData && isLoading) return <div>loading...</div>;

    const userIsOnOwnPropertyListing = user?.pk === propertyHost.pk;

    const handleDeleteProperty = async (propertyId: number) => {
        const deleted = await deleteProperty(propertyId);
        if (deleted) {
            mutate();
        }

        // TODO: Add error handling

        return;
    };

    const handleWishlistProperty = async (propertyId: number) => {
        if (!user) {
            return redirect('/account/login');
        }

        const successfullyWishlisted = await wishlistProperty(propertyId);
        if (successfullyWishlisted) {
            mutate();
        }

        // TODO: Add error handling
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
                        <Flex
                            key={property.pk}
                            border={'1px solid'}
                            borderColor={'monotone.500'}
                            borderRadius={'md'}
                            p={4}
                            direction={'column'}
                            gap={2}
                        >
                            <Text>{property.name}</Text>
                            <Text>${property.price}</Text>
                            <Text>Property Type: {property.property_type || 'undefined'}</Text>
                            <Text>Wislisted: {`${property.wishlisted}`}</Text>

                            {!userIsOnOwnPropertyListing ? (
                                <PrimaryOutlineButton
                                    onClick={() => {
                                        handleWishlistProperty(property.pk);
                                    }}
                                >
                                    Wishlist Property
                                </PrimaryOutlineButton>
                            ) : null}

                            <PrimaryButton
                                onClick={() => {
                                    router.push('/property/' + property.pk);
                                }}
                            >
                                View Property
                            </PrimaryButton>
                            {userIsOnOwnPropertyListing ? (
                                <PrimaryButton
                                    colorScheme={'red'}
                                    onClick={() => {
                                        handleDeleteProperty(property.pk);
                                    }}
                                >
                                    Delete Property
                                </PrimaryButton>
                            ) : null}
                        </Flex>
                    );
                })
            )}
        </Flex>
    );
}
