'use client';

import React from 'react';
import { signOut, signIn } from 'next-auth/react';
import { Button, Flex, IconButton, Text } from '@chakra-ui/react';
import Image from '../Image';

export function DefaultButton(props: any) {
    const { children, ...rest } = props;

    return (
        <Button
            color={'text.primary'}
            fontWeight={'normal'}
            rounded={'full'}
            fontSize={'sm'}
            _hover={{
                bg: 'monotone_light.200',
            }}
            h={12}
            _active={{
                bg: 'monotone_light.300',
            }}
            {...rest}
        >
            {children}
        </Button>
    );
}

export function TransparentButton(props: any) {
    const { children, ...rest } = props;

    return (
        <DefaultButton variant={'ghost'} bg={'transparent'} {...rest}>
            {children}
        </DefaultButton>
    );
}

export function TransparentIconButton(props: any) {
    const { children, ...rest } = props;

    return (
        <TransparentButton as={IconButton} rounded={'full'} {...rest}>
            {children}
        </TransparentButton>
    );
}

export function PrimaryButton(props: any) {
    const { children, ...rest } = props;

    return (
        <Button colorScheme="primary" fontWeight={'semibold'} rounded={'lg'} fontSize={'sm'} h={12} {...rest}>
            {children}
        </Button>
    );
}

export function GoogleSocialButton(props: any) {
    return (
        <PrimaryButton
            display={'flex'}
            bg={'white'}
            border={'1px solid'}
            borderColor={'monotone_light.300'}
            color={'black'}
            _hover={{
                bg: 'monotone_light.200',
                borderColor: 'monotone_light.500',
            }}
            _active={{
                bg: 'monotone_light.300',
                borderColor: 'monotone_light.800',
            }}
            gap={2}
            cursor={'pointer'}
            {...props}
        >
            <Image src={'/icons/google.svg'} alt={'social icon'} width={6} height={6} />
            <Text fontWeight={'500'} color={'monotone_dark.800'}>
                Sign in with Google
            </Text>
        </PrimaryButton>
    );
}

export function PrimaryIconButton(props: any) {
    const { children, ...rest } = props;

    return (
        <PrimaryButton as={IconButton} rounded={'full'} {...rest}>
            {children}
        </PrimaryButton>
    );
}

export function LogoutButton() {
    return <button onClick={() => signOut()}>Logout</button>;
}

export function LoginButton() {
    return <button onClick={() => signIn()}>Login</button>;
}

export function PrimaryOutlineButton(props: any) {
    const { children, ...rest } = props;

    return (
        <PrimaryButton
            display={'flex'}
            bg={'white'}
            border={'1px solid'}
            borderColor={'monotone_light.500'}
            color={'black'}
            _hover={{
                bg: 'monotone_light.200',
            }}
            _active={{
                bg: 'monotone_light.300',
                borderColor: 'monotone_light.600',
            }}
            gap={2}
            cursor={'pointer'}
            {...rest}
        >
            {children}
        </PrimaryButton>
    );
}
