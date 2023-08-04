'use client';

import Image from '@/components/Image';

import { Flex, Text } from '@chakra-ui/react';

import { TransparentButton, TransparentIconButton } from '@/components/Buttons';
import AccountNav from './AccountNav';

import { FiGlobe } from '@react-icons/all-files/fi/FiGlobe';
import Link from 'next/link';

import useSWR from 'swr';

import { useRouter } from 'next/navigation';

type NavbarProps = {
    isAuthenticated: boolean;
    user: any;
};

import { fetcherGet } from '@/lib/axios';

export default function Navbar({ isAuthenticated, user }: NavbarProps = { isAuthenticated: false, user: null }) {
    const router = useRouter();

    const { data: hostData, error: hostError } = useSWR(['/users/is/host/', user?.access], fetcherGet);

    const { is_host } = hostData || { is_host: false };

    return (
        <>
            <Flex
                top={0}
                bg={'white'}
                zIndex={1}
                direction={'column'}
                w={'full'}
                h={'65px'}
                border={'1px solid'}
                borderColor={'monotone_light.500'}
                align={'center'}
                justify={{
                    base: 'flex-start',
                    md: 'space-between',
                }}
                px={{
                    base: 4,
                    md: 8,
                    lg: 20,
                }}
                transition={'all 0.2s ease-in-out'}
            >
                <Flex py={5} h={'full'} align={'flex-start'} w={'full'} justify={'space-between'}>
                    <Flex flex={1} h={'full'} align={'center'} maxH={'80px'} gap={2}>
                        <Image
                            src={'/reservine.png'}
                            alt={'Reservine'}
                            h={'full'}
                            maxH={'80px'}
                            width={55}
                            height={55}
                        />
                        <Text>Reservine</Text>
                    </Flex>

                    <Flex gap={2} h={'full'} align={'center'} maxH={'80px'}>
                        <Flex
                            display={{
                                base: 'none',
                                sm: 'flex',
                            }}
                        >
                            <Flex
                                display={{
                                    base: 'none',
                                    md: 'flex',
                                }}
                            >
                                <TransparentButton>Explore</TransparentButton>
                                <TransparentButton>Blog</TransparentButton>

                                {is_host ? (
                                    <TransparentButton as={Link} href={'/properties'}>
                                        Properties
                                    </TransparentButton>
                                ) : (
                                    <TransparentButton as={Link} href={'/host'}>
                                        Become a host
                                    </TransparentButton>
                                )}
                            </Flex>

                            <TransparentIconButton icon={<FiGlobe />} w={12} h={12} />
                        </Flex>

                        <AccountNav isAuthenticated={isAuthenticated} user={user} />
                    </Flex>
                </Flex>
            </Flex>
        </>
    );
}
