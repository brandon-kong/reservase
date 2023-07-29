'use client';

import { signIn } from "next-auth/react";
import { useState } from "react";
import { GoogleSocialButton, PrimaryButton } from '@/components/Buttons';
import Input from '@/components/Input';
import { useRouter } from "next/navigation";
import {
    Container,
    Text,
    Flex,
    Heading,
    Divider,
} from '@chakra-ui/react';
import Image from "@/components/Image";

export default function LoginContent () {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const attemptLogin = () => {
        signIn('credentials', {
            redirect: false,
            email,
            password,
            callbackUrl: `${window.location.origin}/`,
        }).then((res: any) => {
            if (!res.ok) {
                alert('Invalid credentials')
            }
            else {
                router.push('/')
            }
        }).catch((err) => {
            alert(err)
        })
    }

    const attemptLoginWithGoogle = () => {
        signIn('google', {
            redirect: false,
            callbackUrl: `${window.location.origin}/`,
        })
        .then((res: any) => {
            if (!res) {
                return false;
                //alert('Invalid credentials')
            }
            if (res.error) {
                //alert(res.error)
            }
            else {
                router.push('/')
            }
        })
        .catch((err) => {
            alert(err)
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
                        Welcome back
                    </Heading>
                    <Text
                    fontSize={'md'}
                    color={'monotone.600'}
                    >
                        Sign in to your account to continue
                    </Text>
                </Flex>
                

                <Flex
                w={'full'}
                direction={'column'}
                gap={4}
                >
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
                        Sign in
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

                </Flex>
                
            </Flex>            
        </Container>
    )
}