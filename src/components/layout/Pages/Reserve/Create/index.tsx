'use client';

import { useState } from 'react';

import { fetcherGet } from '@/lib/axios';
import { Box, Flex, Text } from '@chakra-ui/react';

import useSWR from 'swr';

type MakeReservationViewProps = {
    id: string;
};

import { notFound, useRouter } from 'next/navigation';
import Input, { NumberInput } from '@/components/Input';
import { PrimaryButton } from '@/components/Buttons';
import { reserveProperty } from '@/lib/reservation';

export default function MakeReservationView({ id }: MakeReservationViewProps) {
    const router = useRouter();

    const [checkIn, setCheckIn] = useState<string>('');
    const [checkOut, setCheckOut] = useState<string>('');

    const { data: propertyData, error: propertyError, isLoading } = useSWR(`/properties/${id}`, fetcherGet);

    if (isLoading) {
        return (
            <Flex direction={'column'} gap={4}>
                <Text>Loading...</Text>
            </Flex>
        );
    }

    if (propertyError) {
        return notFound();
    }

    const calculateTotal = () => {
        if (checkIn && checkOut) {
            const checkInDate = new Date(checkIn).getTime();
            const checkOutDate = new Date(checkOut).getTime();

            if (checkInDate > checkOutDate) {
                //setDisabled(true);
                return 0;
            }

            return ((checkOutDate - checkInDate) / (1000 * 3600 * 24)) * propertyData.price;
        }
        return 0;
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const reservationData = {
            property: id,
            check_in: new Date(checkIn).toUTCString(),
            check_out: new Date(checkOut).toUTCString(),
            guests: formData.get('guests'),
        };

        const reserveSuccessful = await reserveProperty(id, reservationData);
        if (reserveSuccessful) {
            alert('Reservation successful!');

            router.push(`/account/reservations/${reserveSuccessful.pk}`);
        }
    };

    return (
        <Flex p={20} direction={'column'} gap={4}>
            <Text>Make Reservation</Text>
            <Text>Property Name: {propertyData.name}</Text>
            <Text>Property Price: ${propertyData.price}/night</Text>
            <Text>Property Host: {propertyData.user.first_name + ' ' + propertyData.user.last_name}</Text>
            <Text>Property Address: {propertyData.address}</Text>
            <Text>Property Description: {propertyData.description}</Text>
            <Text>Property ID: {id}</Text>

            <Flex onSubmit={handleSubmit} as={'form'} direction={'column'}>
                <Flex direction={'column'} gap={2}>
                    <Text>Check in</Text>
                    <Input
                        type={'date'}
                        value={checkIn}
                        onChange={(e: any) => {
                            setCheckIn(e.target.value);
                        }}
                        name={'check_in'}
                    />
                </Flex>

                <Flex direction={'column'} gap={2}>
                    <Text>Check out</Text>
                    <Input
                        type={'date'}
                        value={checkOut}
                        onChange={(e: any) => setCheckOut(e.target.value)}
                        name={'check_out'}
                    />
                </Flex>

                <Flex direction={'column'} gap={2}>
                    <Text>Guests</Text>
                    <NumberInput name={'guests'} defaultValue={1} />
                </Flex>

                <Text>Estimated Total: ${calculateTotal()}</Text>

                <PrimaryButton type={'submit'}>Reserve</PrimaryButton>
            </Flex>
        </Flex>
    );
}
