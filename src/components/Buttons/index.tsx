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
            rounded={'full'}
            fontSize={'sm'}
            _hover={{
                bg: 'monotone_light.200',
            }}
            h={10}
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

export function TransparentIconButtonWithText(props: any) {
    const { children, icon, aria_label, ...rest } = props;

    return (
        <TransparentButton
            as={Flex}
            align={'center'}
            justify={'center'}
            rounded={'full'}
            cursor={'pointer'}
            pl={0}
            {...rest}
        >
            <TransparentButton
                px={0}
                py={0}
                width={3}
                as={IconButton}
                aria-label={aria_label || 'icon button'}
                icon={icon}
                rounded={'full'}
            />
            <Text>{children}</Text>
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

export function SocialButton(props: any) {
    const { src, children, ...rest } = props;

    return (
        <PrimaryButton
            display={'flex'}
            bg={'white'}
            border={'1px solid'}
            borderColor={'monotone_light.800'}
            color={'black'}
            _hover={{
                bg: 'monotone_light.200',
            }}
            _active={{
                bg: 'monotone_light.300',
            }}
            gap={2}
            cursor={'pointer'}
            {...props}
        >
            <Image position={'absolute'} left={4} src={src} alt={'social icon'} width={6} height={6} />
            <Text fontWeight={600} color={'monotone_dark.800'}>
                {children}
            </Text>
        </PrimaryButton>
    );
}

export function GoogleSocialButton(props: any) {
    return (
        <SocialButton src={'/icons/google.svg'} {...props}>
            Continue with Google
        </SocialButton>
    );
}

export function PhoneSocialButton(props: any) {
    return (
        <SocialButton src={'/icons/phone.svg'} {...props}>
            Continue with Phone
        </SocialButton>
    );
}

export function EmailSocialButton(props: any) {
    return (
        <SocialButton src={'/icons/mail.svg'} {...props}>
            Continue with Email
        </SocialButton>
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
