'use client';

type ProfileContentProps = {
    profileData: ProfileData;
};

import { Avatar, Flex, Text, Heading, List, ListItem, ListIcon, Icon, Divider } from '@chakra-ui/react';

import { CheckIcon, StarIcon } from '@chakra-ui/icons';
import { PrimaryOutlineButton } from '@/components/Buttons';
import { ProfileData } from '@/types/types';

export default function ProfileContent({ profileData }: ProfileContentProps) {
    return (
        <Flex px={'6rem'} py={'4rem'} fontSize={'sm'} h={'calc(100vh - 65px)'} align={'center'} gap={10}>
            <Flex
                h={'full'}
                direction={'column'}
                rounded={'lg'}
                bg={'monotone.200'}
                px={6}
                py={12}
                w={'300px'}
                gap={8}
                justify={'center'}
            >
                <Flex w={'full'} align={'center'} direction={'column'} gap={4}>
                    <Avatar bg={'monotone.500'} size={'2xl'} />
                    <Text fontWeight={'semibold'}>Edit profile picture</Text>
                </Flex>

                <Flex w={'full'} direction={'column'} gap={2}>
                    <Heading w={'full'} size={'md'}>
                        Identity Verification
                    </Heading>
                    <Text color={'monotone.700'}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat.
                    </Text>
                </Flex>

                <Flex w={'full'} direction={'column'} gap={2}>
                    <Heading w={'full'} size={'md'}>
                        {profileData.name}
                    </Heading>
                    <List spacing={1} color={'monotone.700'}>
                        <ListItem>
                            <ListIcon as={CheckIcon} color={'primary.400'} />
                            Email confirmed
                        </ListItem>
                        <ListItem>
                            <ListIcon as={CheckIcon} color={'primary.400'} />
                            Phone number confirmed
                        </ListItem>
                        <ListItem>
                            <ListIcon as={CheckIcon} color={'primary.400'} />
                            Identity verified
                        </ListItem>
                    </List>
                </Flex>
            </Flex>

            <Flex flex={1} h={'full'} direction={'column'} gap={8}>
                <Flex direction={'column'} gap={4}>
                    <Flex direction={'column'} gap={2}>
                        <Heading size={'lg'}>Welcome back, {profileData.name}!</Heading>
                        <Text color={'monotone.600'}>Joined in {profileData.joinDate}</Text>
                    </Flex>

                    <PrimaryOutlineButton w={'40'}>Edit profile</PrimaryOutlineButton>
                </Flex>

                <Flex align={'center'} gap={2}>
                    <Icon fontSize={'lg'} as={StarIcon} />

                    <Text fontSize={'md'} fontWeight={'semibold'}>
                        {profileData.reviewCount} review{profileData.reviewCount !== 1 ? 's' : ''}
                    </Text>
                </Flex>

                <Divider />
            </Flex>
        </Flex>
    );
}
