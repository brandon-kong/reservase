'use client';

import { useState } from 'react';
import { AsYouType } from 'libphonenumber-js';

import { getCountryCodes } from '@/lib/phone/countryCodes';

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    Heading,
    Text,
    Container,
    Flex,
    Spinner,
    useToast,
    Divider,
    CloseButton,
    InputGroup,
    InputLeftAddon,
    Stack,
    HStack,
    PinInput,
    PinInputField,
    IconButton,
    Icon,
} from '@chakra-ui/react';

import { signIn } from 'next-auth/react';
import { Link } from '@chakra-ui/next-js';

import {
    EmailSocialButton,
    GoogleSocialButton,
    PhoneSocialButton,
    PrimaryButton,
    TransparentButton,
} from '@/components/Buttons';
import Input, { Select } from '@/components/Input';

import type { CountryCode } from 'libphonenumber-js/min';

import Image from '@/components/Image';

import { useSearchParams, useRouter } from 'next/navigation';
import { sendPhoneOTP, userExistsWithPhone, verifyPhoneOTP } from '@/lib/auth';
import { ChevronLeftIcon } from '@chakra-ui/icons';

type LoginModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onOpen: () => void;
};

export const LoginModal = ({ isOpen, onClose, onOpen }: LoginModalProps) => {
    const toast = useToast();
    const router = useRouter();
    const searchParams = useSearchParams();

    const [view, setView] = useState<'login' | 'verify-number' | 'registration'>('login');
    const [formAuthType, setformAuthType] = useState<'phone' | 'email'>('phone');
    const [loading, setLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [countryCode, setCountryCode] = useState<string>('+1');
    const [countryValue, setCountryValue] = useState<string>('United States:1:US');
    const [phone, setPhone] = useState<string>('');
    const [phoneFormatted, setPhoneFormatted] = useState<string>('');
    const [country, setCountry] = useState<CountryCode>('US');

    const formatPhone = (value: string) => {
        if (!value) {
            setPhoneFormatted('');
            return '';
        }
        value = value.toString();
        if (value.includes('(') && !value.includes(')')) {
            const b = value.replace('(', '');

            setPhoneFormatted(b);
            return;
        }

        const formatted = new AsYouType(country).input(value);
        setPhoneFormatted(formatted);
    };

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

    const verifyCredentials = async (e: any) => {
        e.preventDefault();

        setLoading(true);
        if (formAuthType == 'phone') {
            // verify phone

            const sentOTP = await sendPhoneOTP(phone, countryCode);

            setLoading(false);

            if (sentOTP.status_code === 200) {
                setView('verify-number');
            }
        }
    };

    const attemptLogin = () => {
        setLoading(true);
        if (formAuthType == 'phone') {
        }
    };

    const attemptLoginWithGoogle = () => {
        setLoading(true);
        signIn('google', {
            redirect: false,
            callbackUrl: `${window.location.origin}/`,
        });
    };

    const attemptPhoneOTPVerify = async (otp: string) => {
        setLoading(true);

        const verifiedOTP = await verifyPhoneOTP({ phone, countryCode, otp });

        if (verifiedOTP.status_code === 200) {
            // Check if user exists

            const userExists = await userExistsWithPhone(phone, countryCode);

            if (userExists.status_code === 200) {
                const detail = userExists.detail as { [key: string]: any };
                const { exists } = detail;

                if (exists) {
                    const signedUp = await signIn('phone-otp', {
                        phone: phoneFormatted,
                        country_code: countryCode,
                        token: otp,
                        redirect: false,
                        callbackUrl: `${window.location.origin}/`,
                    });

                    if (!signedUp) {
                        setLoading(false);
                        return;
                    }

                    if (signedUp.ok) {
                        onClose();
                        router.push('/');
                        return;
                    }

                    // TODO: Handle error
                    setLoading(false);
                }
            }
            setView('registration');
        } else {
            alert(JSON.stringify(verifiedOTP));
        }

        setLoading(false);
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
                            {view == 'login'
                                ? 'Log in or sign up'
                                : view == 'verify-number'
                                ? 'Verify your phone number'
                                : 'Almost there!'}
                        </Heading>
                        {view !== 'login' ? (
                            <IconButton
                                position={'absolute'}
                                left={4}
                                colorScheme="monotone_dark"
                                variant={'ghost'}
                                aria-label="Back"
                                color={'monotone_dark.900'}
                                rounded={'full'}
                                onClick={() => {
                                    return setView('login');
                                }}
                            >
                                <Icon fontSize={'md'} as={ChevronLeftIcon} w={6} h={6} />
                            </IconButton>
                        ) : (
                            <CloseButton
                                w={10}
                                h={10}
                                rounded={'full'}
                                position={'absolute'}
                                left={4}
                                color={'monotone_dark.900'}
                                onClick={onClose}
                            />
                        )}
                    </ModalHeader>

                    <ModalBody px={2} py={8}>
                        {view == 'login' ? (
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
                                countryCode={countryCode}
                                setCountryCode={setCountryCode}
                                countryValue={countryValue}
                                setCountryValue={setCountryValue}
                                phoneFormatted={phoneFormatted}
                                setPhoneFormatted={setPhoneFormatted}
                                phone={phone}
                                setPhone={setPhone}
                                formatPhone={formatPhone}
                                country={country}
                                setCountry={setCountry}
                                verifyCredentials={verifyCredentials}
                            />
                        ) : view == 'verify-number' ? (
                            <VerifyView
                                loading={loading}
                                setLoading={setLoading}
                                phoneFormatted={phoneFormatted}
                                attemptPhoneOTPVerify={attemptPhoneOTPVerify}
                            />
                        ) : (
                            // registration

                            <RegisterView
                                loading={loading}
                                email={email}
                                password={password}
                                setEmail={setEmail}
                                setPassword={setPassword}
                                attemptLogin={attemptLogin}
                                attemptLoginWithGoogle={attemptLoginWithGoogle}
                                formAuthType={formAuthType}
                                setformAuthType={setformAuthType}
                                countryCode={countryCode}
                                setCountryCode={setCountryCode}
                                countryValue={countryValue}
                                setCountryValue={setCountryValue}
                                phoneFormatted={phoneFormatted}
                                setPhoneFormatted={setPhoneFormatted}
                                phone={phone}
                                setPhone={setPhone}
                                formatPhone={formatPhone}
                                country={country}
                                setCountry={setCountry}
                                verifyCredentials={verifyCredentials}
                            />
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

const LoginView = ({
    loading,
    email,
    setEmail,
    attemptLoginWithGoogle,
    formAuthType,
    setformAuthType,
    countryCode,
    setCountryCode,
    countryValue,
    setCountryValue,
    phoneFormatted,
    phone,
    setPhone,
    formatPhone,
    country,
    setCountry,
    verifyCredentials,
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
            filter={loading ? 'blur(2px)' : 'none'}
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

                <Flex onSubmit={verifyCredentials} w={'full'} direction={'column'} gap={4} as={'form'}>
                    {formAuthType == 'phone' ? (
                        <Flex w={'full'} direction={'column'} gap={2}>
                            <Flex w={'full'} direction={'column'}>
                                <Select
                                    defaultValue={countryValue}
                                    value={countryValue}
                                    onChange={(e: any) => {
                                        const code = e.target.value.split(':')[1];
                                        const country = e.target.value.split(':')[2];

                                        setCountry(country);
                                        setCountryValue(e.target.value);
                                        setCountryCode(`+${code}`);

                                        formatPhone(phone);
                                    }}
                                    borderBottomWidth={'.5px'}
                                    borderBottomRadius={'none'}
                                    w={'full'}
                                    placeholder={'Country'}
                                    name={'country'}
                                    options={getCountryCodes()}
                                />
                                <InputGroup>
                                    <InputLeftAddon
                                        h={'12'}
                                        borderRightWidth={0}
                                        bg={'monotone_light.200'}
                                        borderTopLeftRadius={'none'}
                                        pointerEvents="none"
                                        color="monotone_dark.500"
                                        fontSize="sm"
                                    >
                                        {countryCode}
                                    </InputLeftAddon>
                                    <Input
                                        value={phoneFormatted}
                                        onChange={(e: any) => {
                                            setPhone(e.target.value);
                                            formatPhone(e.target.value);
                                        }}
                                        zIndex={2}
                                        pl={'4'}
                                        borderTopWidth={'.5px'}
                                        borderBottomLeftRadius={'none'}
                                        borderTopRadius={'none'}
                                        w={'full'}
                                        placeholder={'Phone number'}
                                        name={'phone'}
                                    />
                                </InputGroup>
                            </Flex>
                            <Text fontWeight={'500'} fontSize={'sm'}>
                                We&apos;ll send you a one time SMS message. Message and data rates may apply. See our{' '}
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

                    <PrimaryButton w={'full'} type={'submit'}>
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

const VerifyView = ({ loading, setLoading, phoneFormatted, attemptPhoneOTPVerify }: any) => {
    return (
        <Container
            as={Flex}
            direction={'column'}
            align={'center'}
            justify={'center'}
            maxW={'600px'}
            gap={4}
            opacity={loading ? 0.5 : 1}
            filter={loading ? 'blur(2px)' : 'none'}
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
            <Flex w={'full'} direction={'column'} align={'flex-start'} gap={2}>
                <Heading fontSize={'2xl'} fontWeight={'600'} textAlign={'left'}>
                    Verify your phone number
                </Heading>

                <Stack w={'full'} direction={'column'} gap={4}>
                    <Text fontWeight={'500'} fontSize={'sm'}>
                        We sent a 6-digit code to the number {phoneFormatted}. Enter the code below to verify your
                        number.
                    </Text>

                    <HStack>
                        <PinInput
                            focusBorderColor="primary.500"
                            size={'lg'}
                            type={'number'}
                            otp
                            autoFocus
                            placeholder=""
                            onComplete={(value: any) => {
                                attemptPhoneOTPVerify(value);
                            }}
                        >
                            <PinInputField />
                            <PinInputField />
                            <PinInputField />
                            <PinInputField />
                            <PinInputField />
                            <PinInputField />
                        </PinInput>
                    </HStack>
                </Stack>
            </Flex>
        </Container>
    );
};

const RegisterView = ({ loading, email, setEmail, verifyCredentials }: any) => {
    return (
        <Container
            as={Flex}
            direction={'column'}
            align={'center'}
            justify={'center'}
            maxW={'600px'}
            gap={4}
            opacity={loading ? 0.5 : 1}
            filter={loading ? 'blur(2px)' : 'none'}
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
                    Just a few more steps!
                </Heading>

                <Flex onSubmit={verifyCredentials} w={'full'} direction={'column'} gap={5} as={'form'}>
                    <Flex direction={'column'}>
                        <Input
                            borderBottomWidth={'.5px'}
                            borderBottomRadius={'none'}
                            w={'full'}
                            placeholder={'First name'}
                            name={'first_name'}
                            value={email}
                            onChange={(e: any) => setEmail(e.target.value)}
                        />

                        <Input
                            borderTopWidth={'.5px'}
                            borderTopRadius={'none'}
                            w={'full'}
                            placeholder={'Last name'}
                            name={'last_name'}
                            value={email}
                            onChange={(e: any) => setEmail(e.target.value)}
                        />
                        <Text mt={2} fontSize={'xs'} color={'monotone_light.800'} fontWeight={'400'}>
                            Enter your first and last name as it appears on your government issued ID.
                        </Text>
                    </Flex>

                    <Flex direction={'column'}>
                        <Input type={'date'} />

                        <Text mt={2} fontSize={'xs'} color={'monotone_light.800'} fontWeight={'400'}>
                            In order to book/host reservations, you must be at least 18 years old. We will not share
                            your birthday with other users. See our{' '}
                            <Link href={'/privacy'} color={'#783F8E'}>
                                Privacy Policy
                            </Link>
                            .
                        </Text>
                    </Flex>

                    <Flex direction={'column'}>
                        <Input
                            placeholder={'Email'}
                            name={'email'}
                            value={email}
                            onChange={(e: any) => setEmail(e.target.value)}
                        />

                        <Text mt={2} fontSize={'xs'} color={'monotone_light.800'} fontWeight={'400'}>
                            We&apos;ll send trip confirmations and receipts to this email address.
                        </Text>
                    </Flex>

                    <PrimaryButton w={'full'} type={'submit'}>
                        Finish registration
                    </PrimaryButton>
                </Flex>
            </Flex>
        </Container>
    );
};
