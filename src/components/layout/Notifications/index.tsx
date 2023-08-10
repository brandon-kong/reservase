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
        await mutate(await archiveNotification(id), {
            optimisticData: {
                detail: {
                    notifications: notifications.filter((notification: Notification) => notification.id !== id),
                },
            },
            rollbackOnError: true,
            populateCache: true,
        });
    };

    return (
        <Container maxW={'container.sm'} py={20}>
            <VStack w={'full'}>
                <Heading w={'full'} textAlign={'left'} size={'lg'} fontWeight={'500'}>
                    Notifications
                </Heading>
                <List w={'full'} spacing={4} mt={10}>
                    {isLoading ? (
                        <Center w={'full'}>
                            <Spinner size={'lg'} color={'primary.500'} />
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
