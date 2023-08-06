'use client';

import { useRouter, notFound } from 'next/navigation';

import { Flex, TableContainer, Table, Thead, Tbody, Tr, Th, Td, TableCaption } from '@chakra-ui/react';

import { SessionUser } from '@/types/types';
import useSWR from 'swr';
import { fetcherGet } from '@/lib/axios';
import { Link } from '@chakra-ui/next-js';

type WishlistProps = {
    user: SessionUser;
};

export default function ReservationList() {
    const router = useRouter();

    const { data, error: error, isLoading, mutate } = useSWR(`/properties/user/reservations/`, fetcherGet);

    //alert(JSON.stringify(propertiesData))
    const { reservations } = data || { reservations: [] };

    if (!data && error) return notFound();
    if (!data && isLoading) return <div>loading...</div>;

    return (
        <TableContainer>
            <Table size="md" variant="striped" colorScheme="blackAlpha">
                <TableCaption>Your reservation table</TableCaption>
                <Thead>
                    <Tr>
                        <Th>Property</Th>
                        <Th>Check In</Th>
                        <Th>Check Out</Th>
                        <Th>Guests</Th>
                        <Th>Status</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {reservations.map((reservation: any) => {
                        const { property } = reservation;
                        return (
                            <Tr key={reservation.pk}>
                                <Td h={'full'} bg={'transparent'} as={Link} href={`/property/${property.pk}`}>
                                    {property.name}
                                </Td>
                                <Td>{reservation.check_in}</Td>
                                <Td>{reservation.check_out}</Td>
                                <Td>{reservation.guests}</Td>
                                <Td>{reservation.status}</Td>
                            </Tr>
                        );
                    })}
                </Tbody>
            </Table>
        </TableContainer>
    );
}
