'use client';

import { useState } from 'react';

import { Box, Menu, MenuButton, MenuDivider, Avatar, Flex, Icon } from '@chakra-ui/react';

import { getSession } from 'next-auth/react';

import { MenuItem, MenuList } from '@/components/Menu';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Session } from 'next-auth';
import { signOut, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type AccountNavProps = {
    isAuthenticated: boolean;
    user: any;
};

import { AiOutlineUser } from '@react-icons/all-files/ai/AiOutlineUser';

export default function AccountNav({ isAuthenticated, user }: AccountNavProps) {
    const router = useRouter();

    const toProfile = () => {
        if (isAuthenticated) router.push(`/account/profile`);
        else router.push('/account/login');
    };

    return (
        <Menu>
            <MenuButton>
                <Flex
                    display={'flex'}
                    as={Flex}
                    px={4}
                    pr={2}
                    py={1}
                    rounded={'full'}
                    border={'1px solid'}
                    borderColor={'monotone_dark.300'}
                    pointerEvents={'auto'}
                    transition={'all 0.2s ease-in-out'}
                    _hover={{
                        shadow: 'md',
                    }}
                    gap={2}
                    align={'center'}
                    justify={'center'}
                >
                    <HamburgerIcon />
                    <Avatar
                        size={'xs'}
                        icon={<Icon as={AiOutlineUser} fontSize="1rem" />}
                        fontSize={'2px'}
                        name={user?.name.split(' ')[0] || null}
                        bg={'monotone_dark.900'}
                        h={7}
                        w={7}
                    />
                </Flex>
            </MenuButton>

            {isAuthenticated ? (
                <MenuList zIndex={1}>
                    <MenuItem onClick={toProfile}>Messages</MenuItem>

                    <MenuItem onClick={toProfile}>Notifications</MenuItem>
                    <MenuItem as={Link} href={`/account/reservations`}>
                        Trips
                    </MenuItem>

                    <MenuItem as={Link} href={`/account/wishlist`}>
                        Wishlist
                    </MenuItem>

                    <MenuDivider />

                    <MenuItem fontWeight={'500'} onClick={toProfile}>
                        Manage listings
                    </MenuItem>

                    <MenuItem fontWeight={'500'} onClick={toProfile}>
                        Account
                    </MenuItem>

                    <MenuDivider />
                    <MenuItem fontWeight={'500'}>Help center</MenuItem>
                    <MenuItem
                        fontWeight={'500'}
                        onClick={() =>
                            signOut({
                                callbackUrl: 'http://127.0.0.1:3000/account/login',
                            })
                        }
                    >
                        Logout
                    </MenuItem>
                </MenuList>
            ) : (
                <MenuList zIndex={1}>
                    <MenuItem fontWeight={'semibold'} onClick={() => router.push('/account/register')}>
                        Sign up
                    </MenuItem>
                    <MenuItem fontWeight={'500'} onClick={() => router.push('/account/login')}>
                        Login
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem fontWeight={'500'}>Help center</MenuItem>
                </MenuList>
            )}
        </Menu>
    );
}
