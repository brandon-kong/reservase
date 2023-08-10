'use client';

import { useState, useEffect } from 'react';
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

import { EmailSocialButton, GoogleSocialButton, PhoneSocialButton, PrimaryButton } from '@/components/Buttons';
import Input, { Select } from '@/components/Input';

import type { CountryCode } from 'libphonenumber-js/min';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import {
    registerUserWithEmail,
    registerUserWithPhone,
    sendPhoneOTP,
    userExistsWithEmail,
    userExistsWithPhone,
    verifyPhoneOTP,
} from '@/lib/auth';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { Error } from '@/types/response/types';
import InputLabel from '../Typography/InputLabel';

type LoginModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onOpen: () => void;
};

export const LoginModal = ({ isOpen, onClose, onOpen }: LoginModalProps) => {
    const toast = useToast();
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const [view, setView] = useState<
        'login' | 'verify-number' | 'verify-email' | 'email-registration' | 'phone-registration'
    >('login');
    const [formAuthType, setformAuthType] = useState<'phone' | 'email'>('phone');
    const [loading, setLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [birthday, setBirthday] = useState<Date | null>(new Date());

    const [countryCode, setCountryCode] = useState<string>('+1');
    const [countryValue, setCountryValue] = useState<string>('United States:1:US');
    const [phone, setPhone] = useState<string>('');
    const [phoneFormatted, setPhoneFormatted] = useState<string>('');
    const [country, setCountry] = useState<CountryCode>('US');

    const [otp, setOTP] = useState<string>('');

    function getAge(dateString: string) {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

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

    useEffect(() => {
        let shouldRefresh = false;

        if (searchParams?.has('open-sign-in')) {
            onOpen();

            shouldRefresh = true;
        }

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
                        position: 'top',
                    });
                    break;
                case 'oauth':
                    if (toast.isActive('oauth-signin')) break;
                    toast({
                        id: 'oauth-signin',
                        title: 'Problem while authenticating with Provider',
                        variant: 'left-accent',
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                        position: 'top',
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
                        position: 'top',
                    });
                    break;
                default:
                    break;
            }

            shouldRefresh = true;
        }

        if (shouldRefresh) {
            router.replace(pathname, undefined);
        }
    });

    const verifyCredentials = async (e: any) => {
        e.preventDefault();

        setLoading(true);
        if (formAuthType == 'phone') {
            // verify phone

            let sentOTP = await sendPhoneOTP(phone, countryCode);

            setLoading(false);

            if (sentOTP.status_code === 200) {
                setView('verify-number');
            } else {
                sentOTP = sentOTP as Error;

                switch (sentOTP.error_type) {
                    case 'invalid_request':
                        if (toast.isActive('otp-send-invalid-request')) break;
                        toast({
                            id: 'otp-send-invalid-request',
                            title: 'Invalid request',
                            variant: 'left-accent',
                            status: 'error',
                            duration: 3000,
                            isClosable: true,
                            position: 'top',
                        });

                        break;
                    case 'invalid_phone_number':
                        if (toast.isActive('otp-send-invalid-phone')) break;
                        toast({
                            id: 'otp-send-invalid-phone',
                            title: 'Invalid phone number',
                            variant: 'left-accent',
                            status: 'error',
                            duration: 3000,
                            isClosable: true,
                            position: 'top',
                        });

                        break;
                }
            }
        } else {
            // email

            await verifyEmailCredentials(e);
        }
    };

    const verifyEmailCredentials = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        let emailExists = await userExistsWithEmail(email);

        if (emailExists.status_code === 200) {
            const detail = emailExists.detail as { [key: string]: any };
            const { exists } = detail;
            if (exists) {
                // send to email login view
                setView('verify-email');
            } else {
                // send to email registration view
                setView('email-registration');
            }
        } else {
            emailExists = emailExists as Error;

            switch (emailExists.error_type) {
                case 'invalid_request':
                    if (toast.isActive('email-verify-invalid-request')) break;
                    toast({
                        id: 'email-verify-invalid-request',
                        title: 'Invalid request',
                        variant: 'left-accent',
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                        position: 'top',
                    });

                    break;
                case 'invalid_email':
                    if (toast.isActive('email-verify-invalid-email')) break;
                    toast({
                        id: 'email-verify-invalid-email',
                        title: 'Invalid email address',
                        variant: 'left-accent',
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                        position: 'top',
                    });

                    break;
            }
        }

        setLoading(false);
    };

    const attemptLoginWithGoogle = () => {
        if (!window.location) return;
        setLoading(true);
        signIn('google', {
            redirect: false,
            callbackUrl: `${window.location.origin}/`,
        });
    };

    const attemptPhoneOTPVerify = async (otp: string) => {
        setLoading(true);

        let verifiedOTP = await verifyPhoneOTP({ phone, countryCode, otp });

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

                setView('phone-registration');
            }
        } else {
            verifiedOTP = verifiedOTP as Error;

            alert(JSON.stringify(verifiedOTP));
            switch (verifiedOTP.error_type) {
                case 'invalid_request':
                    if (toast.isActive('otp-verify-invalid-request')) break;
                    toast({
                        id: 'otp-verify-invalid-request',
                        title: 'Invalid request',
                        variant: 'left-accent',
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                        position: 'top',
                    });

                    break;
                case 'invalid_phone_number':
                    if (toast.isActive('otp-verify-invalid-phone')) break;
                    toast({
                        id: 'otp-verify-invalid-phone',
                        title: 'Invalid phone number',
                        variant: 'left-accent',
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                        position: 'top',
                    });

                    break;

                case 'invalid_token':
                    if (toast.isActive('otp-verify-invalid-token')) break;
                    toast({
                        id: 'otp-verify-invalid-token',
                        title: 'Token is invalid or expired',
                        variant: 'left-accent',
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                        position: 'top',
                    });

                    break;

                case 'token_attempts_exceeded':
                    if (toast.isActive('otp-verify-token-attempts-exceeded')) break;
                    toast({
                        id: 'otp-verify-token-attempts-exceeded',
                        title: 'Too many attempts',
                        variant: 'left-accent',
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                        position: 'top',
                    });

                    setView('login');
                    break;
            }
        }

        setLoading(false);
    };

    const attemptEmailVerify = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        const signedUp = await signIn('email-password', {
            email,
            password,
            token: otp,
            redirect: false,
            callbackUrl: `${window.location.origin}/`,
        });

        if (!signedUp) {
            setLoading(false);
            return;
        }

        if (!signedUp.error) {
            onClose();
            router.push('/');
            setView('login');
        } else {
            alert(JSON.stringify(signedUp));
        }

        // TODO: Handle error
        setLoading(false);
    };

    const attemptPhoneRegistration = async (e: any) => {
        e.preventDefault();

        setLoading(true);
        const registeredUser = await registerUserWithPhone({
            phone,
            countryCode,
            email,
            firstName,
            lastName,
            birth_date: birthday?.toISOString().split('T')[0],
            otp: otp,
        });

        if (registeredUser.status_code === 200) {
            const signedIn = await signIn('phone-otp', {
                phone: phoneFormatted,
                country_code: countryCode,
                token: otp,
                redirect: false,
                callbackUrl: `${window.location.origin}/`,
            });

            if (!signedIn) {
                setLoading(false);
                return;
            }

            if (signedIn.ok) {
                onClose();
                router.push('/account/profile');
                return;
            }
        } else {
            alert(JSON.stringify(registeredUser));
        }

        setLoading(false);
    };

    const attemptEmailRegistration = async (e: any) => {
        e.preventDefault();

        setLoading(true);

        const registeredUser = await registerUserWithEmail({
            email,
            firstName,
            lastName,
            birth_date: birthday?.toISOString().split('T')[0],
            password,
        });

        if (registeredUser.status_code === 200) {
            const signedIn = await signIn('email-password', {
                email,
                password,
                redirect: false,
                callbackUrl: `${window.location.origin}/`,
            });

            if (!signedIn) {
                setLoading(false);
                return;
            }

            if (signedIn.ok) {
                onClose();
                router.push('/account/profile');
                return;
            }
        } else {
            alert(JSON.stringify(registeredUser));
        }

        setLoading(false);
    };

    return (
        <>
            <Modal size={'lg'} motionPreset="slideInBottom" isCentered isOpen={isOpen} onClose={onClose}>
                <ModalOverlay bg={'rgba(0,0,0,0.55)'} />
                <ModalContent rounded={'xl'}>
                    <Spinner
                        zIndex={2}
                        position={'absolute'}
                        top={'50%'}
                        left={0}
                        right={0}
                        marginLeft={'auto'}
                        marginRight={'auto'}
                        transform={'translate(-50%, -50%)'}
                        display={loading ? 'block' : 'none'}
                    />
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
                                verifyEmailCredentials={verifyEmailCredentials}
                            />
                        ) : view == 'verify-number' ? (
                            <PhoneVerifyView
                                loading={loading}
                                setLoading={setLoading}
                                phoneFormatted={phoneFormatted}
                                attemptPhoneOTPVerify={attemptPhoneOTPVerify}
                                otp={otp}
                                setOTP={setOTP}
                            />
                        ) : view === 'phone-registration' ? (
                            // registration

                            <PhoneRegistrationView
                                loading={loading}
                                email={email}
                                password={password}
                                setEmail={setEmail}
                                setPassword={setPassword}
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
                                attemptPhoneRegistration={attemptPhoneRegistration}
                                firstName={firstName}
                                setFirstName={setFirstName}
                                lastName={lastName}
                                setLastName={setLastName}
                                birthday={birthday}
                                setBirthday={setBirthday}
                                getAge={getAge}
                            />
                        ) : view === 'email-registration' ? (
                            <EmailRegistrationView
                                loading={loading}
                                email={email}
                                password={password}
                                setEmail={setEmail}
                                setPassword={setPassword}
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
                                firstName={firstName}
                                setFirstName={setFirstName}
                                lastName={lastName}
                                setLastName={setLastName}
                                birthday={birthday}
                                setBirthday={setBirthday}
                                getAge={getAge}
                                attemptEmailRegistration={attemptEmailRegistration}
                            />
                        ) : (
                            <EmailVerifyView
                                loading={loading}
                                email={email}
                                setEmail={setEmail}
                                password={password}
                                setPassword={setPassword}
                                attemptEmailVerify={attemptEmailVerify}
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
                                    borderBottomWidth={'0'}
                                    borderBottomRadius={'none'}
                                    w={'full'}
                                    placeholder={'Country'}
                                    name={'country'}
                                    options={getCountryCodes()}
                                />
                                <Divider borderColor={'monotone_light.500'} />
                                <InputGroup>
                                    <InputLeftAddon
                                        borderTopWidth={0}
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
                                        autoFocus
                                        value={phoneFormatted}
                                        onChange={(e: any) => {
                                            setPhone(e.target.value);
                                            formatPhone(e.target.value);
                                        }}
                                        _focus={{
                                            borderTopWidth: '1px',
                                        }}
                                        zIndex={2}
                                        pl={'4'}
                                        borderTopWidth={'0px'}
                                        borderBottomLeftRadius={'none'}
                                        borderTopRadius={'none'}
                                        w={'full'}
                                        placeholder={'Phone number'}
                                        name={'phone'}
                                    />
                                </InputGroup>
                            </Flex>
                            <Text fontWeight={'500'} fontSize={'xs'}>
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
                            autoFocus
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
                        <Text color={'monotone.600'} fontSize={'xs'} userSelect={'none'}>
                            or
                        </Text>
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

const PhoneVerifyView = ({ loading, setLoading, phoneFormatted, attemptPhoneOTPVerify, otp, setOTP }: any) => {
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
                            autoFocus={true}
                            focusBorderColor="primary.500"
                            size={'lg'}
                            type={'number'}
                            otp
                            placeholder=""
                            onComplete={(value: any) => {
                                attemptPhoneOTPVerify(value);
                            }}
                            onChange={(value: string) => {
                                setOTP(value);
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

const PhoneRegistrationView = ({
    loading,
    email,
    setEmail,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    birthday,
    setBirthday,
    attemptPhoneRegistration,
    getAge,
}: any) => {
    function isValidDate(d: Date) {
        return d instanceof Date && !isNaN(d as any);
    }

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
            <Flex w={'full'} direction={'column'} align={'flex-start'} gap={8}>
                <Heading fontSize={'2xl'} fontWeight={'600'} textAlign={'left'}>
                    Just a few more steps!
                </Heading>

                <Flex onSubmit={attemptPhoneRegistration} w={'full'} direction={'column'} gap={5} as={'form'}>
                    <Flex direction={'column'}>
                        <InputLabel htmlFor="first_name" mb={1} ml={2}>
                            Name
                        </InputLabel>
                        <Input
                            transition={'border-bottom-width 0s ease-in-out'}
                            _focus={{
                                borderBottomWidth: '1px',
                            }}
                            borderBottomWidth={'0px'}
                            borderBottomRadius={'none'}
                            w={'full'}
                            placeholder={'First name'}
                            name={'first_name'}
                            value={firstName}
                            onChange={(e: any) => setFirstName(e.target.value)}
                        />
                        <Divider borderColor={'monotone_light.500'} />
                        <Input
                            transition={'border-top-width 0s ease-in-out'}
                            _focus={{
                                borderTopWidth: '1px',
                            }}
                            borderTopWidth={'0px'}
                            borderTopRadius={'none'}
                            w={'full'}
                            placeholder={'Last name'}
                            name={'last_name'}
                            value={lastName}
                            onChange={(e: any) => setLastName(e.target.value)}
                        />
                        <Text mt={2} fontSize={'xs'} color={'monotone_light.800'} fontWeight={'400'}>
                            Enter your first and last name as it appears on your government issued ID.
                        </Text>
                    </Flex>

                    <Flex direction={'column'}>
                        <InputLabel htmlFor="date" mb={1} ml={2}>
                            Birth date
                        </InputLabel>
                        <Input
                            type={'date'}
                            name={'date'}
                            isInvalid={
                                birthday === null ||
                                // check if birthday is below 18
                                getAge(birthday?.toISOString().split('T')[0]) < 18
                            }
                            value={birthday?.toISOString().split('T')[0]}
                            onChange={(e: any) => {
                                const date = new Date(e.target.value);
                                if (!date || !isValidDate(date)) return;
                                setBirthday(new Date(e.target.value));
                            }}
                        />

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
                        <InputLabel htmlFor="email" mb={1} ml={2}>
                            Email
                        </InputLabel>
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

                    <Stack spacing={4}>
                        <Text mt={2} fontSize={'xs'} color={'monotone_light.800'} fontWeight={'400'}>
                            By continuing, you agree to Reservine&apos;s{' '}
                            <Link href={'/terms'} color={'#783F8E'}>
                                Terms of Service
                            </Link>{' '}
                            and
                            <Link href={'/privacy'} color={'#783F8E'}>
                                Privacy Policy
                            </Link>
                        </Text>
                        <PrimaryButton w={'full'} type={'submit'}>
                            Finish registration
                        </PrimaryButton>
                    </Stack>
                </Flex>
            </Flex>
        </Container>
    );
};

const EmailRegistrationView = ({
    loading,
    email,
    setEmail,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    birthday,
    setBirthday,
    attemptEmailRegistration,
    getAge,
    password,
    setPassword,
}: any) => {
    function isValidDate(d: Date) {
        return d instanceof Date && !isNaN(d as any);
    }

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
            <Flex w={'full'} direction={'column'} align={'flex-start'} gap={8}>
                <Heading fontSize={'2xl'} fontWeight={'600'} textAlign={'left'}>
                    Just a few more steps!
                </Heading>

                <Flex onSubmit={attemptEmailRegistration} w={'full'} direction={'column'} gap={5} as={'form'}>
                    <Flex direction={'column'}>
                        <InputLabel htmlFor="password" mb={1} ml={2}>
                            Name
                        </InputLabel>
                        <Input
                            transition={'border-bottom-width 0s ease-in-out'}
                            _focus={{
                                borderBottomWidth: '1px',
                            }}
                            borderBottomWidth={'0px'}
                            borderBottomRadius={'none'}
                            w={'full'}
                            placeholder={'First name'}
                            name={'first_name'}
                            value={firstName}
                            onChange={(e: any) => setFirstName(e.target.value)}
                        />
                        <Divider borderColor={'monotone_light.500'} />
                        <Input
                            transition={'border-top-width 0s ease-in-out'}
                            _focus={{
                                borderTopWidth: '1px',
                            }}
                            borderTopWidth={'0px'}
                            borderTopRadius={'none'}
                            w={'full'}
                            placeholder={'Last name'}
                            name={'last_name'}
                            value={lastName}
                            onChange={(e: any) => setLastName(e.target.value)}
                        />
                        <Text mt={2} fontSize={'xs'} color={'monotone_light.800'} fontWeight={'400'}>
                            Enter your first and last name as it appears on your government issued ID.
                        </Text>
                    </Flex>

                    <Flex direction={'column'}>
                        <InputLabel htmlFor="date" mb={1} ml={2}>
                            Birth date
                        </InputLabel>
                        <Input
                            type={'date'}
                            name={'date'}
                            isInvalid={
                                birthday === null ||
                                // check if birthday is below 18
                                getAge(birthday?.toISOString().split('T')[0]) < 18
                            }
                            value={birthday?.toISOString().split('T')[0]}
                            onChange={(e: any) => {
                                const date = new Date(e.target.value);
                                if (!date || !isValidDate(date)) return;
                                setBirthday(new Date(e.target.value));
                            }}
                        />

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
                        <InputLabel htmlFor="email" mb={1} ml={2}>
                            Email
                        </InputLabel>
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
                    <Flex direction={'column'}>
                        <InputLabel htmlFor="password" mb={1} ml={2}>
                            Password
                        </InputLabel>
                        <Input
                            type={'password'}
                            placeholder={'Password'}
                            name={'password'}
                            value={password}
                            onChange={(e: any) => setPassword(e.target.value)}
                        />
                    </Flex>

                    <Stack spacing={4}>
                        <Text mt={2} fontSize={'xs'} color={'monotone_light.800'} fontWeight={'400'}>
                            By selecting Finish registration, I agree to Reservine&apos;s{' '}
                            <Link href={'/terms'} color={'#783F8E'}>
                                Terms of Service
                            </Link>{' '}
                            and
                            <Link href={'/privacy'} color={'#783F8E'}>
                                {' '}
                                Privacy Policy
                            </Link>
                        </Text>
                        <PrimaryButton w={'full'} type={'submit'}>
                            Finish registration
                        </PrimaryButton>
                    </Stack>
                </Flex>
            </Flex>
        </Container>
    );
};

const EmailVerifyView = ({ loading, email, setEmail, password, setPassword, attemptEmailVerify }: any) => {
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
            <Flex w={'full'} direction={'column'} align={'flex-start'} gap={8}>
                <Heading fontSize={'2xl'} fontWeight={'600'} textAlign={'left'}>
                    Log in to Reservine
                </Heading>

                <Flex onSubmit={attemptEmailVerify} w={'full'} direction={'column'} gap={5} as={'form'}>
                    <Flex direction={'column'}>
                        <InputLabel htmlFor="email" mb={1} ml={2}>
                            Email
                        </InputLabel>

                        <Input
                            isDisabled={true}
                            bg={'monotone_light.400'}
                            w={'full'}
                            placeholder={'Email'}
                            name={'email'}
                            value={email}
                            onChange={(e: any) => setEmail(e.target.value)}
                        />
                    </Flex>

                    <Flex direction={'column'}>
                        <InputLabel htmlFor="password" mb={1} ml={2}>
                            Password
                        </InputLabel>

                        <Input
                            w={'full'}
                            placeholder={'Password'}
                            name={'password'}
                            value={password}
                            type={'password'}
                            onChange={(e: any) => setPassword(e.target.value)}
                        />
                    </Flex>

                    <PrimaryButton w={'full'} type={'submit'}>
                        Log in
                    </PrimaryButton>
                </Flex>
            </Flex>
        </Container>
    );
};
