import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { api } from '@/lib/axios';

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { email, password, first_name, last_name } = body as any;

    // TODO: Validate email, password, first_name, last_name

    try {
        const { data, status } = await api.post('/users/register/', {
            email,
            password1: password,
            password2: password,
            first_name,
            last_name,
        });

        console.log(data, status);

        if (!(status === 201)) {
            return NextResponse.json(
                {
                    error: data,
                },
                {
                    status: status,
                },
            );
        } else {
            return NextResponse.json(
                {
                    message: 'User created successfully',
                },
                {
                    status: 200,
                },
            );
        }
    } catch (error: any) {
        return NextResponse.json(
            {
                error: error.response?.data || 'Something went wrong',
            },
            {
                status: error.response?.status || 500,
            },
        );
    }
}
