'use client';

import { useRouter, notFound } from 'next/navigation';

import {
    Flex,
    TableContainer,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    Tabs,
    Tab,
    TabList,
    TabPanels,
    TabPanel,
} from '@chakra-ui/react';

import { SessionUser } from '@/types/types';
import useSWR from 'swr';
import { fetcherGet } from '@/lib/axios';
import { Link } from '@chakra-ui/next-js';
import ReservationTable from '@/components/ReservationTable';

type WishlistProps = {
    user: SessionUser;
};

export default function ReservationList() {
    const router = useRouter();

    const { data, error: error, isLoading, mutate } = useSWR(`/properties/user/reservations/`, fetcherGet);

    const { reservations } = data || { reservations: [] };

    if (!data && error) return notFound();
    if (!data && isLoading) return <div>loading...</div>;

    return (
        <Tabs isFitted variant={'enclosed-colored'} colorScheme="primary">
            <TabList>
                <Tab>Past</Tab>
                <Tab>Upcoming</Tab>
                <Tab>Cancelled</Tab>
                <Tab>Current</Tab>
                <Tab>All</Tab>
            </TabList>

            {/* TODO: put each panel in reusable component to 
            make code more readable
            */}

            <TabPanels>
                {/* Past */}
                <TabPanel>
                    <ReservationTable reservations={reservations.past} />
                </TabPanel>

                {/* Upcoming */}
                <TabPanel>
                    <ReservationTable reservations={reservations.upcoming} />
                </TabPanel>

                {/* Cancelled */}
                <TabPanel>
                    <ReservationTable reservations={reservations.cancelled} />
                </TabPanel>

                {/* Current */}
                <TabPanel>
                    <ReservationTable reservations={reservations.current} />
                </TabPanel>

                {/* All */}
                <TabPanel>
                    <ReservationTable reservations={reservations.all} />
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
}
