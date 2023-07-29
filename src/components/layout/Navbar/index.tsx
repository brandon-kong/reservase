'use client';

import Image from '@/components/Image';

import { Flex, Text } from '@chakra-ui/react';

import { TransparentButton, TransparentIconButton } from '@/components/Buttons';
import AccountNav from './AccountNav';

import { FiGlobe } from '@react-icons/all-files/fi/FiGlobe';

type NavbarProps = {
    isAuthenticated: boolean;
};

export default function Navbar({ isAuthenticated }: NavbarProps = { isAuthenticated: false }) {
    return (
        <>
            <Flex
                top={0}
                position={'fixed'}
                bg={'white'}
                zIndex={1}
                direction={'column'}
                w={'full'}
                h={'80px'}
                border={'1px solid'}
                borderColor={'monotone.300'}
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
                                <TransparentButton>Become a host</TransparentButton>
                            </Flex>

                            <TransparentIconButton icon={<FiGlobe />} w={12} h={12} />
                        </Flex>

                        <AccountNav isAuthenticated={isAuthenticated} />
                    </Flex>
                </Flex>
            </Flex>
        </>
    );
}
