'use client';

import { Box, Center, Container, Heading, List, ListItem, Spinner, VStack } from '@chakra-ui/react';

import useSWR from 'swr';
import { localFetcherGet } from '@/lib/axios';

import NotificationCard, { SkeletonNotificationCard } from './NotificationCard';
import { Notification } from '@/types/account/notification/types';

export default function NotificationPageView() {
    const { data, isLoading } = useSWR('/accounts/notifications/show', localFetcherGet);

    const notifications = data ? data.detail.notifications : [];

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
                                <NotificationCard notification={notification} />
                            </ListItem>
                        ))
                    )}
                </List>
            </VStack>
        </Container>
    );
}
