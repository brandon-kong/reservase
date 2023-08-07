'use client';

type ProfileContentProps = {
    id: string;
    user?: any;
};

import { useState } from 'react';
import { Avatar, Flex, Text, Heading, List, ListItem, ListIcon, Icon, Divider } from '@chakra-ui/react';

import { CheckIcon, StarIcon } from '@chakra-ui/icons';
import { PrimaryButton, PrimaryOutlineButton, TransparentButton } from '@/components/Buttons';
import { ProfileData } from '@/types/types';
import EditProfileView from '@/components/EditProfileView';

import useSWR from 'swr';
import { fetcherGet } from '@/lib/axios';

import { notFound } from 'next/navigation';

export default function ProfileContent({ user, id }: ProfileContentProps) {
    const [editing, setEditing] = useState<boolean>(false);
    const [imageChanged, setImageChanged] = useState<boolean>(false);

    const { data: profile, error: profileError, isLoading, mutate } = useSWR(`/users/profile/${id}`, fetcherGet);

    if (isLoading) {
        return (
            <Flex direction={'column'} gap={4}>
                <Text>Loading...</Text>
            </Flex>
        );
    }

    if (profileError) {
        return notFound();
    }

    const userIsOnOwnProfile = user && user.pk === profile.pk;

    return (
        <Flex
            px={{
                base: 8,
                md: 20,
            }}
            py={'4rem'}
            fontSize={'sm'}
            minH={'calc(100vh - 65px)'}
            align={'flex-start'}
            direction={{
                base: 'column-reverse',
                md: 'row',
            }}
            gap={10}
        >
            <Flex
                w={{
                    base: 'full',
                    md: '300px',
                }}
                h={'full'}
                direction={'column'}
                rounded={'lg'}
                bg={'monotone.200'}
                px={6}
                py={12}
                gap={8}
                justify={'center'}
            >
                <Flex w={'full'} align={'center'} direction={'column'} gap={4}>
                    <Avatar bg={'monotone_dark.300'} size={'2xl'} />
                    {userIsOnOwnProfile ? (
                        <PrimaryOutlineButton w={'full'} onClick={() => setImageChanged(true)}>
                            Edit profile picture
                        </PrimaryOutlineButton>
                    ) : null}

                    {imageChanged ? (
                        <Flex w={'full'} direction={'row'} gap={4}>
                            <PrimaryOutlineButton w={'full'} onClick={() => setImageChanged(false)}>
                                Cancel
                            </PrimaryOutlineButton>
                            <PrimaryButton w={'full'}>Save</PrimaryButton>
                        </Flex>
                    ) : null}
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
                        {profile.first_name + ' ' + profile.last_name}
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

            <Flex w={'full'} flex={1} h={'full'} direction={'column'} gap={8}>
                <Flex direction={'column'} gap={4}>
                    <Flex direction={'column'} gap={2}>
                        <Heading size={'lg'}>
                            {userIsOnOwnProfile
                                ? 'Welcome back, ' + profile.first_name
                                : profile.first_name + ' ' + profile.last_name}
                        </Heading>
                        <Text color={'monotone.600'}>Joined on {profile.join_date}</Text>
                    </Flex>
                </Flex>

                <Flex direction={'column'} gap={8} display={editing ? 'none' : 'flex'}>
                    {userIsOnOwnProfile ? (
                        <PrimaryOutlineButton onClick={() => setEditing(true)} w={'40'}>
                            Edit profile
                        </PrimaryOutlineButton>
                    ) : null}

                    <Flex align={'center'} gap={2} color={'primary.600'}>
                        <Icon fontSize={'lg'} as={StarIcon} />

                        <Text fontSize={'md'} fontWeight={'semibold'}>
                            {profile.review_count} review{profile.review_count !== 1 ? 's' : ''}
                        </Text>
                    </Flex>

                    <Flex direction={'column'} gap={8}>
                        <Flex direction={'column'} gap={2}>
                            <Text fontWeight={'bold'} fontSize={'md'}>
                                About me
                            </Text>
                            <Text color={'monotone.600'}>{profile.about_me}</Text>
                        </Flex>
                        <Flex direction={'column'} gap={2}>
                            <Text fontWeight={'bold'} fontSize={'md'}>
                                Occupation
                            </Text>
                            <Text color={'monotone.600'}>{profile.occupation}</Text>
                        </Flex>
                    </Flex>

                    <Divider />
                </Flex>

                {!editing ? null : (
                    <EditProfileView profileData={profile} setEditing={setEditing} mutate={mutate} user={user} />
                )}
            </Flex>
        </Flex>
    );
}
