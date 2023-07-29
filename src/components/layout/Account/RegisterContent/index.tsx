'use client';

import { signIn } from "next-auth/react";
import { useState } from "react";
import { GoogleSocialButton, PrimaryButton } from '@/components/Buttons';
import Input from '@/components/Input';
import { useRouter, useSearchParams } from "next/navigation";
import {
    Container,
    Text,
    Flex,
    Heading,
    Divider,
    useToast,
} from '@chakra-ui/react';

import Image from "@/components/Image";
import { Link } from "@chakra-ui/next-js";

export default function RegisterContent () {
    const toast = useToast();
    const router = useRouter();
    const searchParams = useSearchParams();

    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    if (searchParams?.has('error')) {
        const error = searchParams.get('error');

        switch (error) {
            case 'CredentialsSignin':
                if (toast.isActive('credentials-signin')) break;
                toast({
                    id: 'credentials-signin',
                    title: 'Invalid credentials',
                    variant: 'left-accent',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'bottom-right'
                })
                break;
            case 'OAuthSignin':
                if (toast.isActive('oauth-signin')) break;
                toast({
                    id: 'oauth-signin',
                    title: 'Problem while authenticating with Provider',
                    variant: 'left-accent',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'bottom-right'
                })
                break;
            case 'AccessDenied':
                if (toast.isActive('access-denied')) break;
                toast({
                    id: 'access-denied',
                    title: 'User exists with different credentials',
                    variant: 'left-accent',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'bottom-right'
                })
                break;
            default:
                break;
        }
    }

    const attemptLogin = () => {
        signIn('credentials', {
            redirect: false,
            email,
            password,
            callbackUrl: `${window.location.origin}/`,
        }).then((res: any) => {
            if (!res.ok) {
                toast({
                    title: 'Invalid credentials',
                    variant: 'left-accent',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'bottom-right'
                })
            }
            else {
                router.push('/')
            }
        }).catch((err) => {
            toast({
                title: 'Invalid credentials',
                variant: 'left-accent',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'bottom-right'
            })
        })
    }

    const attemptLoginWithGoogle = () => {
        signIn('google', {
            redirect: false,
            callbackUrl: `${window.location.origin}/`,
        })
    }

    return (
        <Container
        as={Flex}
        direction={'column'}
        align={'center'}
        justify={'center'}
        h={'100vh'}
        maxW={'400px'}

        gap={4}
        >
            <Flex
            >
                <Image
                src={'/reservine.png'}
                alt="Reservine Logo"
                height={50}
                width={50}
                />
            </Flex>
            <Flex
            w={'full'}
            direction={'column'}
            align={'flex-start'}
            gap={8}
            >
                <Flex
                direction={'column'}
                gap={1}
                >
                    <Heading
                    size={'md'}
                    textAlign={'left'}  
                    >
                        So you're new here?
                    </Heading>
                    <Text
                    fontSize={'md'}
                    color={'monotone.600'}
                    >
                        Create an account to get started
                    </Text>
                </Flex>
                

                <Flex
                w={'full'}
                direction={'column'}
                gap={4}
                >
                    <Flex
                    gap={4}
                    >
                        <Input
                        w={'full'}
                        placeholder={'First name'}
                        name={'first_name'}
                        value={firstName}
                        onChange={(e: any) => setFirstName(e.target.value)}
                        />
                        <Input
                        w={'full'}
                        placeholder={'Last name'}
                        name={'last_name'}
                        value={lastName}
                        onChange={(e: any) => setFirstName(e.target.value)}
                        />
                    </Flex>

                    <Input
                    w={'full'}
                    placeholder={'Email'}
                    name={'email'}
                    value={email}
                    onChange={(e: any) => setEmail(e.target.value)}
                    />

                    <Input
                    w={'full'}
                    type={'password'}
                    placeholder={'Password'}
                    name={'password'}
                    value={password}
                    onChange={(e: any) => setPassword(e.target.value)}
                    />

                    <PrimaryButton
                    w={'full'}
                    colorScheme={'green'}

                    onClick={attemptLogin}
                    >
                        Sign up
                    </PrimaryButton>

                    <Flex
                    align={'center'}
                    justify={'center'}
                    gap={4}
                    >
                        <Divider />
                        <Text
                        color={'monotone.600'}
                        >
                            or
                        </Text>
                        <Divider />
                    </Flex>

                    <GoogleSocialButton 
                    onClick={attemptLoginWithGoogle}
                    />

                    <Text
                    textAlign={'center'}
                    color={'monotone.600'}
                    fontSize={'sm'}
                    >
                        Already have an account? {' '}
                        <Link
                        href={'/account/login'}
                        >
                            Sign in
                        </Link>
                    </Text>


                </Flex>
                
            </Flex>            
        </Container>
    )
}