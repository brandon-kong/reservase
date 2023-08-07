'use client';

import { Flex, TableContainer, Table, Thead, Tbody, Tr, Th, Td, TableCaption } from '@chakra-ui/react';

import { Link } from '@chakra-ui/next-js';

import { Reservation } from '@/types/reservation/types';

type ReservationTableProps = {
    reservations: Reservation[];
};

export default function ReservationTable({ reservations }: ReservationTableProps) {
    return (
        <TableContainer>
            <Table size="md" variant="striped" colorScheme="blackAlpha">
                <TableCaption>Your reservation table</TableCaption>
                <Thead>
                    <Tr>
                        <Th>Reservation Id</Th>
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
                                <Td>
                                    <Link href={`/reservations/${reservation.pk}`}>{reservation.pk}</Link>
                                </Td>
                                <Td>
                                    <Link href={`/property/${property.pk}`}>{property.name}</Link>
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
