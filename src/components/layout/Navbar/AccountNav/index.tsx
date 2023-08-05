'use client';

import { useState } from 'react';

import { Box, Menu, MenuButton, MenuDivider, Avatar, Flex } from '@chakra-ui/react';

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
                    px={3}
                    py={2}
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
                    <Avatar bg={'monotone_dark.500'} h={6} w={6} />
                </Flex>
            </MenuButton>

            {isAuthenticated ? (
                <MenuList zIndex={1}>
                    <MenuItem onClick={toProfile}>Profile</MenuItem>
                    <MenuItem>My reservations</MenuItem>
                    <MenuItem as={Link} href={`/wishlist`}>
                        Wishlist
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem>Settings</MenuItem>
                    <MenuItem
                        fontWeight={'semibold'}
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
                    <MenuItem onClick={() => router.push('/account/login')}>Login</MenuItem>
                    <MenuDivider />
                    <MenuItem>Help center</MenuItem>
                </MenuList>
            )}
        </Menu>
    );
}
