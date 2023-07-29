'use client';

import { useState } from "react";

import {
    Box,
    Menu,
    MenuButton,
    MenuDivider,
    Avatar,
    Flex,
} from "@chakra-ui/react";

import {
    getSession
} from "next-auth/react";

import { MenuItem, MenuList } from "@/components/Menu";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Session } from "next-auth";
import { signOut, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

type AccountNavProps = {
    isAuthenticated: boolean;
}

export default function AccountNav( { isAuthenticated }: AccountNavProps) {
    const router = useRouter();

    return (
        <Menu
        >
            <MenuButton
            >
                <Flex
                display={'flex'}
                as={Flex}
                px={3}
                py={2}
                rounded={'full'}
                border={'1px solid'}
                borderColor={'monotone.300'}
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
                    bg={'monotone.400'}
                    h={6}
                    w={6}
                    />
                </Flex>
            </MenuButton>

            {
                isAuthenticated ? (
                    <MenuList
                    zIndex={1}
                    >
                        <MenuItem>Profile</MenuItem>
                        <MenuItem>Settings</MenuItem>
                        <MenuDivider />
                        <MenuItem
                        onClick={() => signOut()}
                        >Logout</MenuItem>
                    </MenuList>
                )
                : (
                    <MenuList
                    zIndex={1}
                    >
                        <MenuItem
                        onClick={() => router.push('/account/login')}
                        >Login</MenuItem>
                    </MenuList>
                )
            }
        </Menu>
    )
}