'use client';

import { Box, Center, Container, Heading, List, ListItem, Spinner, VStack } from '@chakra-ui/react';

import useSWR from 'swr';
import { localFetcherGet } from '@/lib/axios';

import NotificationCard, { EmptyNotifications } from './NotificationCard';
import { Notification } from '@/types/account/notification/types';

import { archiveNotification } from '@/lib/account';

export default function NotificationPageView() {
    const { data, isLoading, mutate } = useSWR('/accounts/notifications/show', localFetcherGet);

    const notifications = data ? data.detail.notifications : [];

    const attemptArchiveNotification = async (id: number) => {
        const filtered = notifications.filter((notification: Notification) => notification.id !== id);

        await mutate(archiveNotification(id), {
            optimisticData: {
                detail: {
                    notifications: filtered,
                },
                status_code: 200,
            },
            populateCache: true,
            rollbackOnError: true,
            revalidate: false,
        });
    };

    return (
        <Container maxW={'container.sm'} py={20}>
            <VStack w={'full'}>
                <Heading w={'full'} textAlign={'left'} size={'lg'}>
                    Notifications
                </Heading>
                <List w={'full'} spacing={4} mt={10}>
                    {isLoading ? (
                        <Center w={'full'}>
                            <Spinner size={'lg'} />
                        </Center>
                    ) : (
                        notifications.map((notification: Notification) => (
                            <ListItem key={notification.id}>
                                <NotificationCard
                                    attemptArchiveNotification={attemptArchiveNotification}
                                    notification={notification}
                                />
                            </ListItem>
                        ))
                    )}

                    {notifications.length === 0 && !isLoading && <EmptyNotifications />}
                </List>
            </VStack>
        </Container>
    );
}
