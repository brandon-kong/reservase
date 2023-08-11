import { PrimaryIconButton } from '@/components/Buttons';
import { Box, Card, Center, CloseButton, Flex, Heading, Skeleton, SkeletonCircle, Text } from '@chakra-ui/react';
import Image from 'next/image';

import { PlusSquareIcon } from '@chakra-ui/icons';

export function EmptyTrips() {
    return (
        <Center w={'full'} flexDirection={'column'} gap={2}>
            <Card
                bg={'white'}
                border={'1px dashed'}
                borderColor={'monotone_dark.500'}
                w={'fit-content'}
                p={4}
                px={8}
                borderRadius={'md'}
            >
                <Flex w={'full'} justifyContent={'center'} direction={'column'} gap={4} alignItems={'center'}>
                    <Text fontSize={'sm'} fontWeight={'400'} color={'monotone_dark.500'}>
                        You have no trips yet. Create a new trip today!
                    </Text>
                    <PrimaryIconButton fontSize={'lg'} icon={<PlusSquareIcon />} />
                </Flex>
            </Card>
        </Center>
    );
}
