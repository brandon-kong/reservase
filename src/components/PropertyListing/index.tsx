'use client';

import { Property } from '@/types/properties/types';
import { PrimaryButton, PrimaryOutlineButton } from '@/components/Buttons';

import { Flex, Text } from '@chakra-ui/react';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

type PropertyListingProps = {
    property: Property;
    userIsOnOwnPropertyListing: boolean;
    handleWishlistProperty: (id: number) => void;
    handleDeleteProperty: (id: number) => void;
};

export default function PropertyListing({
    property,
    userIsOnOwnPropertyListing,
    handleWishlistProperty,
    handleDeleteProperty,
}: PropertyListingProps) {
    const router = useRouter();

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
                    {property.wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                </PrimaryOutlineButton>
            ) : null}

            {!userIsOnOwnPropertyListing ? (
                <PrimaryOutlineButton as={Link} href={`/reserve/${property.pk}`}>
                    Make reservation
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
}
