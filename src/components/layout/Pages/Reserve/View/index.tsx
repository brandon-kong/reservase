'use client';

import { useState } from 'react';

import { fetcherGet } from '@/lib/axios';
import { Box, Flex, Text } from '@chakra-ui/react';

import useSWR from 'swr';

type ViewReservationViewProps = {
    id: string;
    user?: any;
};

import { notFound, useRouter } from 'next/navigation';
import Input, { NumberInput } from '@/components/Input';
import { PrimaryButton } from '@/components/Buttons';
import { reserveProperty, cancelReservation } from '@/lib/reservation';
import { Reservation } from '@/types/reservation/types';

export default function ViewReservationView({ id, user }: ViewReservationViewProps) {
    const router = useRouter();

    const {
        data,
        error: propertyError,
        isLoading,
        mutate,
    }: {
        data: Reservation;
        error: any;
        isLoading: boolean;
        mutate: any;
    } = useSWR(`/properties/reservation/${id}`, fetcherGet);

    const { property: propertyData } = data || {};

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

    const handleCancel = async () => {
        const cancelSuccessful = await cancelReservation(id);
        if (cancelSuccessful) {
            mutate();
        }
    };

    const userIsOnOwnReservation = user && user.pk === data.user.pk;

    return (
        <Flex p={20} direction={'column'} gap={4}>
            <Text>Reservation</Text>
            <Text>Property Name: {propertyData.name}</Text>
            <Text>Property Price: ${propertyData.price}/night</Text>
            <Text>Property Address: {propertyData.address}</Text>
            <Text>Property Description: {propertyData.description}</Text>
            <Text>Property ID: {id}</Text>
            <Text>Check In: {data.check_in}</Text>
            <Text>Check Out: {data.check_out}</Text>

            <Text>Status: {data.status}</Text>

            {userIsOnOwnReservation ? (
                <PrimaryButton isDisabled={data.status === 'cancelled'} onClick={handleCancel}>
                    {data.status === 'cancelled' ? 'Cancelled' : 'Cancel Reservation'}
                </PrimaryButton>
            ) : null}
        </Flex>
    );
}
