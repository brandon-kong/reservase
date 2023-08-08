'use client';

type ProfileContentProps = {
    id: string;
    user?: any;
};

import { useState } from 'react';
import {
    Avatar,
    Flex,
    Text,
    Heading,
    List,
    ListItem,
    ListIcon,
    Icon,
    Divider,
    AvatarBadge,
    StatGroup,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    Spinner,
} from '@chakra-ui/react';

import { CheckIcon, StarIcon } from '@chakra-ui/icons';
import { PrimaryButton, PrimaryOutlineButton, TransparentButton } from '@/components/Buttons';
import { ProfileData } from '@/types/types';
import EditProfileView from '@/components/EditProfileView';

import useSWR from 'swr';
import { fetcherGet } from '@/lib/axios';

import { notFound } from 'next/navigation';
import Loading from '../../Loading';

export default function ProfileContent({ user, id }: ProfileContentProps) {
    const [editing, setEditing] = useState<boolean>(false);
    const [imageChanged, setImageChanged] = useState<boolean>(false);

    const { data: profile, error: profileError, isLoading, mutate } = useSWR(`/users/${id}`, fetcherGet);

    if (isLoading) {
        return <Loading />;
    }

    if (profileError) {
        return notFound();
    }

    const userIsOnOwnProfile = user && user.pk === profile.pk;

    return (
        <Flex
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
                position={'sticky'}
                top={'4rem'}
                w={{
                    base: 'full',
                    md: '350px',
                }}
                h={'full'}
                direction={'column'}
                gap={8}
                justify={'center'}
            >
                {/* Left side */}
                <Flex px={8} py={8} rounded={'lg'} bg={'monotone_light.200'} justify={'center'} w={'full'} gap={12}>
                    <Flex direction={'column'} align={'center'} flex={1} justify={'center'} gap={2}>
                        <Avatar
                            size={'xl'}
                            icon={<Icon as={StarIcon} fontSize="1rem" />}
                            name={profile.first_name}
                            bg={'monotone_dark.900'}
                        >
                            <AvatarBadge
                                boxSize=".8em"
                                bg="primary.500"
                                borderColor={'monotone_light.200'}
                                borderWidth={'2px'}
                            />
                        </Avatar>

                        <Flex direction={'column'} align={'center'}>
                            <Heading fontWeight={'bold'}>{profile.first_name}</Heading>
                            <Text fontSize={'md'} color={'monotone_dark.700'}>
                                Guest
                            </Text>
                        </Flex>
                    </Flex>

                    <Flex flex={1} gap={4} direction={'column'}>
                        <Flex w={'full'} direction={'column'}>
                            <Heading fontWeight={'semibold'} fontSize={'2xl'}>
                                {profile.review_count}
                            </Heading>
                            <Text fontSize={'xs'} color={'monotone_dark.600'} fontWeight={'semibold'}>
                                {' '}
                                Reviews
                            </Text>
                        </Flex>
                        <Divider borderColor={'monotone_light.600'} />
                        <Flex w={'full'} direction={'column'}>
                            <Heading as={Flex} align={'center'} gap={2} fontWeight={'semibold'} fontSize={'2xl'}>
                                4.88
                                <Icon fontSize={'md'} as={StarIcon} color={'primary.500'} />
                            </Heading>
                            <Text fontSize={'xs'} color={'monotone_dark.600'} fontWeight={'semibold'}>
                                {' '}
                                Rating
                            </Text>
                        </Flex>
                        <Divider borderColor={'monotone_light.600'} />

                        <Flex w={'full'} direction={'column'}>
                            <Heading as={Flex} align={'center'} gap={2} fontWeight={'semibold'} fontSize={'2xl'}>
                                12
                            </Heading>
                            <Text fontSize={'xs'} color={'monotone_dark.600'} fontWeight={'semibold'}>
                                {' '}
                                Years hosting
                            </Text>
                        </Flex>
                    </Flex>
                </Flex>

                <Flex px={8} py={8} rounded={'lg'} bg={'monotone_light.200'} justify={'center'} w={'full'} gap={12}>
                    <Flex flex={1} gap={4} direction={'column'}>
                        <Heading fontSize={'2xl'}>{profile.first_name + "'s" + ' identity verification'}</Heading>
                        <List spacing={1}>
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

                {/*<Flex w={'full'} align={'center'} direction={'column'} gap={4}>
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

                    */}
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

                <Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et,
                    consequat nibh. Etiam non elit dui. Nullam vel eros sit amet arcu vestibulum accumsan in in leo.
                    Fusce malesuada vulputate faucibus. Nullam tempus quam sed nulla mattis, nec tempor magna efficitur.
                    Quisque faucibus, nisl quis volutpat venenatis, justo sem placerat risus, eu volutpat enim diam eget
                    metus. Etiam eget lacinia est. Proin vitae sodales nisl. Aliquam erat volutpat. Curabitur convallis
                    fringilla diam sed aliquam. Sed tempor iaculis massa faucibus feugiat. In fermentum facilisis massa,
                    a consequat purus viverra.
                    <br />
                    <br />
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et,
                    consequat nibh. Etiam non elit dui. Nullam vel eros sit amet arcu vestibulum accumsan in in leo.
                    Fusce malesuada vulputate faucibus. Nullam tempus quam sed nulla mattis, nec tempor magna efficitur.
                    Quisque faucibus, nisl quis volutpat venenatis, justo sem placerat risus, eu volutpat enim diam eget
                    metus. Etiam eget lacinia est. Proin vitae sodales nisl. Aliquam erat volutpat. Curabitur convallis
                    fringilla diam sed aliquam. Sed tempor iaculis massa faucibus feugiat. In fermentum facilisis massa,
                    a consequat purus viverra.
                    <br />
                    <br />
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et,
                    consequat nibh. Etiam non elit dui. Nullam vel eros sit amet arcu vestibulum accumsan in in leo.
                    Fusce malesuada vulputate faucibus. Nullam tempus quam sed nulla mattis, nec tempor magna efficitur.
                    Quisque faucibus, nisl quis volutpat venenatis, justo sem placerat risus, eu volutpat enim diam eget
                    metus. Etiam eget lacinia est. Proin vitae sodales nisl. Aliquam erat volutpat. Curabitur convallis
                    fringilla diam sed aliquam. Sed tempor iaculis massa faucibus feugiat. In fermentum facilisis massa,
                    a consequat purus viverra.
                    <br />
                    <br />
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et,
                    consequat nibh. Etiam non elit dui. Nullam vel eros sit amet arcu vestibulum accumsan in in leo.
                    Fusce malesuada vulputate faucibus. Nullam tempus quam sed nulla mattis, nec tempor magna efficitur.
                    Quisque faucibus, nisl quis volutpat venenatis, justo sem placerat risus, eu volutpat enim diam eget
                    metus. Etiam eget lacinia est. Proin vitae sodales nisl. Aliquam erat volutpat. Curabitur convallis
                    fringilla diam sed aliquam. Sed tempor iaculis massa faucibus feugiat. In fermentum facilisis massa,
                    a consequat purus viverra.
                    <br />
                    <br />
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et,
                    consequat nibh. Etiam non elit dui. Nullam vel eros sit amet arcu vestibulum accumsan in in leo.
                    Fusce malesuada vulputate faucibus. Nullam tempus quam sed nulla mattis, nec tempor magna efficitur.
                    Quisque faucibus, nisl quis volutpat venenatis, justo sem placerat risus, eu volutpat enim diam eget
                    metus. Etiam eget lacinia est. Proin vitae sodales nisl. Aliquam erat volutpat. Curabitur convallis
                    fringilla diam sed aliquam. Sed tempor iaculis massa faucibus feugiat. In fermentum facilisis massa,
                    a consequat purus viverra.
                    <br />
                    <br />
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et,
                    consequat nibh. Etiam non elit dui. Nullam vel eros sit amet arcu vestibulum accumsan in in leo.
                    Fusce malesuada vulputate faucibus. Nullam tempus quam sed nulla mattis, nec tempor magna efficitur.
                    Quisque faucibus, nisl quis volutpat venenatis, justo sem placerat risus, eu volutpat enim diam eget
                    metus. Etiam eget lacinia est. Proin vitae sodales nisl. Aliquam erat volutpat. Curabitur convallis
                    fringilla diam sed aliquam. Sed tempor iaculis massa faucibus feugiat. In fermentum facilisis massa,
                    a consequat purus viverra.
                    <br />
                    <br />
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et,
                    consequat nibh. Etiam non elit dui. Nullam vel eros sit amet arcu vestibulum accumsan in in leo.
                    Fusce malesuada vulputate faucibus. Nullam tempus quam sed nulla mattis, nec tempor magna efficitur.
                    Quisque faucibus, nisl quis volutpat venenatis, justo sem placerat risus, eu volutpat enim diam eget
                    metus. Etiam eget lacinia est. Proin vitae sodales nisl. Aliquam erat volutpat. Curabitur convallis
                    fringilla diam sed aliquam. Sed tempor iaculis massa faucibus feugiat. In fermentum facilisis massa,
                    a consequat purus viverra.
                </Text>
            </Flex>
        </Flex>
    );
}
