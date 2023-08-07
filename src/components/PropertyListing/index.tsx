'use client';

import { Property } from '@/types/properties/types';
import { PrimaryButton, PrimaryOutlineButton } from '@/components/Buttons';

import { Flex, Text, Table, Thead, Tbody, Tr, Th, Td, TableCaption } from '@chakra-ui/react';

import { Link } from '@chakra-ui/next-js';

import { acceptReservation, declineReservation } from '@/lib/reservation';

import { useRouter } from 'next/navigation';

type PropertyListingProps = {
    property: Property;
    userIsOnOwnPropertyListing: boolean;
    handleWishlistProperty: (id: number) => void;
    handleDeleteProperty: (id: number) => void;
    mutate: any;
};

export default function PropertyListing({
    property,
    userIsOnOwnPropertyListing,
    handleWishlistProperty,
    handleDeleteProperty,
    mutate,
}: PropertyListingProps) {
    const router = useRouter();

    const handleAcceptReservation = async (id: string) => {
        const reservation = await acceptReservation(id);
        if (reservation) {
            mutate();
            //router.push(`/reservations/${reservation.pk}`);
        }
    };

    const handleDeclineReservation = async (id: string) => {
        const reservation = await declineReservation(id);
        if (reservation) {
            mutate();
            //router.push(`/reservations/${reservation.pk}`);
        }
    };

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

            {userIsOnOwnPropertyListing ? (
                <Table variant="striped" colorScheme="teal">
                    <TableCaption>Property Reservations</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>User</Th>
                            <Th>Check In</Th>
                            <Th>Check Out</Th>
                            <Th>Guests</Th>
                            <Th>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {property.reservations?.map((reservation: any) => {
                            return (
                                <Tr key={reservation.pk}>
                                    <Td>
                                        <Link href={`/account/profile/${reservation.user.pk}`}>
                                            {reservation.user.first_name} {reservation.user.last_name}
                                        </Link>
                                    </Td>
                                    <Td>{reservation.check_in}</Td>
                                    <Td>{reservation.check_out}</Td>
                                    <Td>{reservation.guests}</Td>
                                    <Td>
                                        <Flex direction={'column'} gap={2}>
                                            <PrimaryButton
                                                colorScheme={'blue'}
                                                as={Link}
                                                href={`/reservations/${reservation.pk}`}
                                            >
                                                View Reservation
                                            </PrimaryButton>
                                            {reservation.status === 'pending' ? (
                                                <PrimaryButton
                                                    colorScheme={'primary'}
                                                    onClick={() => handleAcceptReservation(reservation.pk)}
                                                >
                                                    Approve Reservation
                                                </PrimaryButton>
                                            ) : null}

                                            {reservation.status === 'pending' ? (
                                                <PrimaryButton
                                                    colorScheme={'red'}
                                                    onClick={() => handleDeclineReservation(reservation.pk)}
                                                >
                                                    Decline Reservation
                                                </PrimaryButton>
                                            ) : null}
                                        </Flex>
                                    </Td>
                                </Tr>
                            );
                        })}
                    </Tbody>
                </Table>
            ) : null}
        </Flex>
    );
}
