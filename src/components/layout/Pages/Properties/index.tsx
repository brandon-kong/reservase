'use client';

import { PrimaryButton } from '@/components/Buttons';
import { getUserProperties } from '@/lib/property';
import { Property } from '@/types/properties/types';
import { useRouter, redirect } from 'next/navigation';

import { Flex, Text } from '@chakra-ui/react';
import { SessionUser } from '@/types/types';

type UserPropertyListProps = {
    properties: Property[];
    user?: SessionUser;
    propertyHost: {
        pk: number;
        first_name: string;
        last_name: string;
    };
};

export default function UserPropertyList({ properties, user, propertyHost }: UserPropertyListProps) {
    const router = useRouter();

    const userIsOnOwnProfile = user?.pk === propertyHost.pk;

    return (
        <Flex direction={'column'} gap={4} p={20}>
            {userIsOnOwnProfile ? (
                <Text>Your Properties</Text>
            ) : (
                <Text>{propertyHost.first_name + ' ' + propertyHost.last_name + "'s Properties"}</Text>
            )}
            {userIsOnOwnProfile ? (
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
                    {userIsOnOwnProfile ? 'You have no properties. Create one now!' : 'This user has no properties.'}
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
                        </Flex>
                    );
                })
            )}
        </Flex>
    );
}
