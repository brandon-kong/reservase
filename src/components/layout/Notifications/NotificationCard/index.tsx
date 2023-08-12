'use client';

import { Box, Center, CloseButton, Flex, Heading, Skeleton, SkeletonCircle, Text } from '@chakra-ui/react';

import Image from 'next/image';

import type { Notification } from '@/types/account/notification/types';
import { BodyTextMd } from '@/components/Typography';

type NotificationCardProps = {
    notification: Notification;
    attemptArchiveNotification: (id: number) => Promise<void>;
};
export default function NotificationCard({ notification, attemptArchiveNotification }: NotificationCardProps) {
    const image = notification.image ? notification.image : '/brand/reservine-circle.svg';

    return (
        <Box
            p={4}
            w={'full'}
            cursor={'pointer'}
            rounded={'lg'}
            border={'1px solid'}
            borderColor={'monotone_light.500'}
            transition={'box-shadow 0.3s ease-in-out'}
            _hover={{
                boxShadow: 'md',
            }}
        >
            <Flex w={'full'} justify={'space-between'} align={'center'} gap={4}>
                <Image src={image} alt={'logo'} objectFit="contain" width={50} height={50} />
                <Flex h={'full'} w={'full'} direction={'column'} gap={1}>
                    <Heading size={'xs'} fontWeight={'600'}>
                        {notification.body}
                    </Heading>
                    <Text fontWeight={500} fontSize={'sm'} color={'monotone_dark.500'}>
                        {notification.created_at}
                    </Text>
                </Flex>
                <CloseButton onClick={async () => await attemptArchiveNotification(notification.id)} rounded={'full'} />
            </Flex>
        </Box>
    );
}

export function SkeletonNotificationCard() {
    return (
        <Box p={4} w={'full'} cursor={'pointer'} rounded={'md'}>
            <Flex gap={4}>
                <SkeletonCircle size={'50px'}>
                    <Box w={'50px'} h={'50px'}></Box>
                </SkeletonCircle>
                <Flex w={'full'} direction={'column'} align={'flex-start'} justify={'center'} gap={2}>
                    <Skeleton w={'full'} h={'15px'}>
                        <Box w={'full'} h={'20px'}>
                            Hello
                        </Box>
                    </Skeleton>
                    <Skeleton w={'25%'} h={'10px'}>
                        <Box w={'full'} h={'20px'}>
                            Hello
                        </Box>
                    </Skeleton>
                </Flex>
            </Flex>
        </Box>
    );
}

export function EmptyNotifications() {
    return (
        <Center w={'full'} flexDirection={'column-reverse'} gap={2}>
            <BodyTextMd fontWeight={'400'} color={'monotone_dark.500'}>
                No notifications (yet)
            </BodyTextMd>

            <Image src={'/gifs/empty-gif.gif'} quality={75} alt={'logo'} objectFit="contain" width={300} height={300} />
        </Center>
    );
}
