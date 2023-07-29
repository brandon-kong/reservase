'use client';


import React from "react";
import { signOut, signIn } from "next-auth/react";
import { Button, IconButton } from "@chakra-ui/react";

export function DefaultButton ( props: any ) {
    const { children, ...rest } = props;

    return (
        <Button
        fontWeight={'normal'}
        rounded={'full'}
        fontSize={'sm'}
        _hover={{
            bg: 'monotone.200',
        }}

        _active={{
            bg: 'monotone.300',
        }}
        {...rest}
        >
            {children}
        </Button>
    )
}

export function TransparentButton ( props: any ) {
    const { children, ...rest } = props;

    return (
        <DefaultButton
        variant={'ghost'}
        bg={'transparent'}
        {...rest}
        >
            {children}
        </DefaultButton>
    )
}

export function TransparentIconButton ( props: any ) {
    const { children, ...rest } = props;

    return (
        <TransparentButton
        as={IconButton}
        rounded={'full'}
        {...rest}
        >
            {children}
        </TransparentButton>
    )
}

export function PrimaryButton ( props: any ) {
    const { children, ...rest } = props;

    return (
        <DefaultButton
        bg={'monotone.800'}
        color={'white'}
        _hover={{
            bg: 'monotone.900',
        }}

        _active={{
            bg: 'monotone.900',
        }}
        {...rest}
        >
            {children}
        </DefaultButton>
    )
}

export function PrimaryIconButton ( props: any ) {
    const { children, ...rest } = props;

    return (
        <PrimaryButton
        as={IconButton}
        rounded={'full'}
        {...rest}
        >
            {children}
        </PrimaryButton>
    )
}

export function LogoutButton() {
    return (
        <button onClick={() => signOut()}>Logout</button>
    )
}

export function LoginButton() {
    return (
        <button onClick={() => signIn()}>Login</button>
    )
}