import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { api } from '@/lib/axios';
import { Error } from '@/types/response/types';

export async function POST(request: NextRequest) {
    const data = await request.json();

    const { email, first_name, last_name, birth_date, password } = data;

    if (!email) {
        return NextResponse.json(
            {
                error: 'Email is required',
            },
            {
                status: 400,
            },
        );
    }

    if (!first_name) {
        return NextResponse.json(
            {
                error: 'First name is required',
            },
            {
                status: 400,
            },
        );
    }

    if (!last_name) {
        return NextResponse.json(
            {
                error: 'Last name is required',
            },
            {
                status: 400,
            },
        );
    }

    if (!birth_date) {
        return NextResponse.json(
            {
                error: 'Birthday is required',
            },
            {
                status: 400,
            },
        );
    }

    try {
        const { data, status } = await api.post('/users/register/email/', {
            email,
            first_name,
            last_name,
            birth_date,
            password,
        });

        return NextResponse.json(data || {}, {
            status,
        });
    } catch (error: any) {
        const response: Error = error.response.data;
        return NextResponse.json(response, {
            status: response.status_code,
        });
    }
}
