'use client';

import { useState } from 'react';

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    Heading,
    Text,
    Container,
    useDisclosure,
    Flex,
    Spinner,
    useToast,
    Divider,
    CloseButton,
} from '@chakra-ui/react';

import { signUp } from '@/lib/session';
import { signIn } from 'next-auth/react';

import { Link } from '@chakra-ui/next-js';

import {
    EmailSocialButton,
    GoogleSocialButton,
    PhoneSocialButton,
    PrimaryButton,
    TransparentButton,
} from '@/components/Buttons';
import Input from '@/components/Input';

import Image from '@/components/Image';

import { useSearchParams, useRouter } from 'next/navigation';

type LoginModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onOpen: () => void;
};

export const LoginModal = ({ isOpen, onClose, onOpen }: LoginModalProps) => {
    const toast = useToast();
    const router = useRouter();
    const searchParams = useSearchParams();

    const [formAuthType, setformAuthType] = useState<'phone' | 'email'>('phone');
    const [loading, setLoading] = useState<boolean>(false);
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
                    position: 'bottom-right',
                });
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
                    position: 'bottom-right',
                });
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
                    position: 'bottom-right',
                });
                break;
            default:
                break;
        }
    }

    const attemptLogin = () => {
        setLoading(true);
        signIn('credentials', {
            redirect: false,
            email,
            password,
            callbackUrl: `${window.location.origin}/account/profile`,
        })
            .then((res: any) => {
                if (res.error) {
                    toast({
                        title: res.error,
                        variant: 'left-accent',
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                        position: 'bottom-right',
                    });
                    setLoading(false);
                } else {
                    //setLoading(false);
                    router.push('/account/profile');
                }
            })
            .catch(err => {
                toast({
                    title: 'Invalid credentials',
                    variant: 'left-accent',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'bottom-right',
                });

                setLoading(false);
            });
    };

    const attemptLoginWithGoogle = () => {
        setLoading(true);
        signIn('google', {
            redirect: false,
            callbackUrl: `${window.location.origin}/`,
        });
    };

    return (
        <>
            <Modal size={'lg'} motionPreset="slideInBottom" isCentered isOpen={isOpen} onClose={onClose}>
                <ModalOverlay bg={'rgba(0,0,0,0.55)'} />
                <ModalContent rounded={'xl'}>
                    <ModalHeader
                        as={Flex}
                        position={'relative'}
                        py={6}
                        align={'center'}
                        justify={'space-between'}
                        borderBottom={'1px solid'}
                        borderColor={'monotone_light.400'}
                    >
                        <Heading w={'full'} fontSize={'lg'} textAlign={'center'}>
                            Log in or sign up
                        </Heading>
                        <CloseButton position={'absolute'} left={4} rounded={'full'} onClick={onClose} />
                    </ModalHeader>

                    <ModalBody px={2} py={8}>
                        <LoginView
                            loading={loading}
                            email={email}
                            password={password}
                            setEmail={setEmail}
                            setPassword={setPassword}
                            attemptLogin={attemptLogin}
                            attemptLoginWithGoogle={attemptLoginWithGoogle}
                            formAuthType={formAuthType}
                            setformAuthType={setformAuthType}
                        />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

const LoginView = ({
    loading,
    email,
    password,
    setEmail,
    setPassword,
    attemptLogin,
    attemptLoginWithGoogle,
    formAuthType,
    setformAuthType,
}: any) => {
    return (
        <Container
            as={Flex}
            direction={'column'}
            align={'center'}
            justify={'center'}
            maxW={'600px'}
            gap={4}
            opacity={loading ? 0.5 : 1}
            pointerEvents={loading ? 'none' : 'auto'}
        >
            <Spinner
                zIndex={2}
                position={'absolute'}
                top={'50%'}
                left={'50%'}
                transform={'translate(-50%, -50%)'}
                display={loading ? 'block' : 'none'}
            />
            <Flex w={'full'} direction={'column'} align={'flex-start'} gap={8}>
                <Heading fontSize={'2xl'} fontWeight={'600'} textAlign={'left'}>
                    Welcome to Reservine!
                </Heading>

                <Flex w={'full'} direction={'column'} gap={4}>
                    {formAuthType == 'phone' ? (
                        <Flex w={'full'} direction={'column'} gap={2}>
                            <Input w={'full'} placeholder={'Phone number'} name={'phone'} />
                            <Text fontWeight={'500'} fontSize={'sm'}>
                                We'll send you a one time SMS message. Message and data rates may apply. See our{' '}
                                <Link href={'/terms'} color={'#783F8E'}>
                                    Terms of Service
                                </Link>{' '}
                                and
                                <Link href={'/privacy'} color={'#783F8E'}>
                                    {' '}
                                    Privacy Policy
                                </Link>
                                .
                            </Text>
                        </Flex>
                    ) : (
                        <Input
                            w={'full'}
                            placeholder={'Email'}
                            name={'email'}
                            value={email}
                            onChange={(e: any) => setEmail(e.target.value)}
                        />
                    )}

                    <PrimaryButton w={'full'} onClick={attemptLogin}>
                        Continue
                    </PrimaryButton>

                    <Flex align={'center'} justify={'center'} gap={4}>
                        <Divider borderColor={'monotone_light.400'} />
                        <Text color={'monotone.600'}>or</Text>
                        <Divider borderColor={'monotone_light.400'} />
                    </Flex>

                    <GoogleSocialButton onClick={attemptLoginWithGoogle} />

                    {formAuthType == 'phone' ? (
                        <EmailSocialButton onClick={() => setformAuthType('email')} />
                    ) : (
                        <PhoneSocialButton onClick={() => setformAuthType('phone')} />
                    )}
                </Flex>
            </Flex>
        </Container>
    );
};
