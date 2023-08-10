import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { api } from '@/lib/axios';
import { Error } from '@/types/response/types';

export async function POST(request: NextRequest) {
    const data = await request.json();

    const { email } = data;

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

    try {
        const { data, status } = await api.post('/users/exists/email/', {
            email,
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
