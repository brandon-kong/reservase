import { api } from '@/lib/axios';
import { TokenTypes } from '@/types/types';

import axios from 'axios';

import { Error, Success } from '@/types/response/types';
import { emailIsValid } from '../email';

type RegisterUserWithPhoneProps = {
    phone: string;
    countryCode: string;
    otp: string;
    firstName: string;
    lastName: string;
    email: string;
    birth_date?: string;
};

type RegisterUserWithEmailProps = {
    email: string;
    firstName: string;
    lastName: string;
    birth_date?: string;
    password: string;
};

export async function tokenIsValid(token: string): Promise<boolean> {
    try {
        const { data, status } = await api.post('/users/token/verify/', {
            token,
        });

        if (status === 200) {
            return true;
        }
    } catch (error: any) {
        return false;
    }

    return false;
}

export async function refreshToken(token: TokenTypes): Promise<TokenTypes | null> {
    //console.log("used as parameter: ", refresh)
    // To prevent unnecessary requests to the server
    const refresh = token.refresh;

    if (!refresh) {
        return {
            ...token,
            error: 'No refresh token provided',
        };
    }

    try {
        const { data, status } = await api.post('/users/token/refresh/', {
            refresh,
        });

        if (status === 200) {
            return {
                ...token,
                access: data.access,
                refresh: data.refresh,
            };
        }
    } catch (error: any) {
        return {
            ...token,
            error: error,
        };
    }

    return null;
}

export async function sendPhoneOTP(phone: string, countryCode: string): Promise<Success | Error> {
    const phoneWithCountryCode = countryCode + phone;

    try {
        const { data, status } = await axios.post('/users/otp/phone/send/', {
            phone: phoneWithCountryCode,
        });

        const response: Success | Error = data;
        return response;
    } catch (error: any) {
        const response: Error = error.response.data;
        return response;
    }
}

type VerifyPhoneOTPProps = {
    phone: string;
    countryCode: string;
    otp: string;
};

export async function verifyPhoneOTP({ phone, countryCode, otp }: VerifyPhoneOTPProps): Promise<Success | Error> {
    const phoneWithCountryCode = countryCode + phone;

    try {
        const { data, status } = await axios.post('/users/otp/phone/verify/', {
            phone: phoneWithCountryCode,
            token: otp,
        });

        const response: Success | Error = data;
        return response;
    } catch (error: any) {
        const response: Error = error.response.data;
        return response;
    }
}

export async function userExistsWithPhone(phone: string, countryCode: string): Promise<Success | Error> {
    const phoneWithCountryCode = countryCode + phone;

    try {
        const { data, status } = await axios.post('/users/exists/phone/', {
            phone: phoneWithCountryCode,
        });

        const response: Success | Error = data;
        return response;
    } catch (error: any) {
        const response: Error = error.response.data;
        return response;
    }
}

export async function userExistsWithEmail(email: string): Promise<Success | Error> {
    if (!emailIsValid(email)) {
        const response: Error = {
            status_code: 400,
            detail: 'The email provided is not valid',
            error_type: 'invalid_email',
            error_message: 'The email provided is not valid',
        };

        return response;
    }

    try {
        const { data } = await axios.post('/users/exists/email/', {
            email: email,
        });

        const response: Success | Error = data;
        return response;
    } catch (error: any) {
        const response: Error = error.response.data;
        return response;
    }
}

export async function registerUserWithPhone({
    phone,
    countryCode,
    otp,
    firstName,
    lastName,
    email,
    birth_date,
}: RegisterUserWithPhoneProps) {
    const phoneWithCountryCode = countryCode + phone;

    try {
        const { data } = await axios.post('/users/register/phone/', {
            phone: phoneWithCountryCode,
            token: otp,
            first_name: firstName,
            last_name: lastName,
            email,
            birth_date,
            country_code: countryCode,
        });

        const response: Success | Error = data;
        return response;
    } catch (error: any) {
        const response: Error = error.response.data;
        return response;
    }
}

export async function registerUserWithEmail({
    firstName,
    lastName,
    email,
    birth_date,
    password,
}: RegisterUserWithEmailProps) {
    try {
        const { data } = await axios.post('/users/register/email/', {
            first_name: firstName,
            last_name: lastName,
            email,
            birth_date,
            password,
        });

        const response: Success | Error = data;
        return response;
    } catch (error: any) {
        const response: Error = error.response.data;
        return response;
    }
}
