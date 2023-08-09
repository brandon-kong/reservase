'use client';

import Image from '@/components/Image';

import { Flex, Text, Spinner } from '@chakra-ui/react';

import { TransparentButton, TransparentIconButton, TransparentIconButtonWithText } from '@/components/Buttons';
import AccountNav from './AccountNav';

import { FiGlobe } from '@react-icons/all-files/fi/FiGlobe';
import Link from 'next/link';

import useSWR from 'swr';

import { useRouter } from 'next/navigation';

type NavbarProps = {
    isAuthenticated: boolean;
    user: any;
};

import ScreenContainer from '@/components/Formatting/Container';

import { fetcherGet } from '@/lib/axios';

export default function Navbar({ isAuthenticated, user }: NavbarProps = { isAuthenticated: false, user: null }) {
    const router = useRouter();

    const isLoading = false;
    //const { data: hostData, error: hostError, isLoading } = useSWR('/users/is/host/', fetcherGet);

    const is_host = false;

    return (
        <>
            <Flex h={'65px'} w={'full'} bg={'white'} border={'1px solid'} borderColor={'monotone_light.400'}>
                <Flex w={'full'} justify={'space-between'} as={ScreenContainer}>
                    <Flex h={'full'} align={'center'} gap={4}>
                        <Link href={'/'}>
                            <Image
                                cursor={'pointer'}
                                userSelect={'none'}
                                draggable={false}
                                src={'/brand/reservine.svg'}
                                alt={'logo'}
                                width={12}
                                height={12}
                            />
                        </Link>
                    </Flex>

                    <Flex h={'full'} align={'center'} gap={8}>
                        <Flex h={'full'} align={'center'}>
                            <Flex h={'full'} align={'center'}>
                                {isLoading ? (
                                    <Spinner mr={2} />
                                ) : (
                                    <>
                                        {is_host ? (
                                            <TransparentButton as={Link} href={'/host'}>
                                                <Text>Continue hosting</Text>
                                            </TransparentButton>
                                        ) : (
                                            <>
                                                <TransparentButton as={Link} href={'/places'}>
                                                    <Text>Places</Text>
                                                </TransparentButton>

                                                <TransparentButton as={Link} href={'/blog'}>
                                                    <Text>Blog</Text>
                                                </TransparentButton>

                                                <TransparentButton as={Link} href={'/host/become'}>
                                                    <Text>Become a host</Text>
                                                </TransparentButton>
                                            </>
                                        )}
                                    </>
                                )}
                            </Flex>

                            <TransparentIconButtonWithText icon={<FiGlobe />} aria_label={'language'}>
                                Language
                            </TransparentIconButtonWithText>
                        </Flex>
                        <AccountNav isAuthenticated={isAuthenticated} user={user} />
                    </Flex>
                </Flex>
            </Flex>
        </>
    );
}
