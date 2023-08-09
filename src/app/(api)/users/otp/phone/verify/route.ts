import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { api } from '@/lib/axios';
import { Error } from '@/types/response/types';

export async function POST(request: NextRequest) {
    const data = await request.json();

    const { phone, token } = data;

    if (!phone) {
        return NextResponse.json(
            {
                error: 'Phone number is required',
            },
            {
                status: 400,
            },
        );
    }

    if (!token) {
        return NextResponse.json(
            {
                error: 'OTP token is required',
            },
            {
                status: 400,
            },
        );
    }

    try {
        const { data, status } = await api.post('/users/otp/verify/phone/', {
            phone,
            token,
        });

        return NextResponse.json(data, {
            status,
        });
    } catch (error: any) {
        const response: Error = error.response.data;
        return NextResponse.json(response, {
            status: response.status_code,
        });
    }
}
