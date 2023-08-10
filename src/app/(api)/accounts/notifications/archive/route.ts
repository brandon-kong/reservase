import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { api } from '@/lib/axios';
import { getSession } from '@/lib/session';

import { Success, Error } from '@/types/response/types';

export async function POST(req: NextRequest) {
    const data = await req.json();

    const { id } = data;

    if (!id) {
        return NextResponse.json(
            {
                detail: {
                    message: 'Notification id is required',
                },
            },
            {
                status: 400,
            },
        );
    }

    const session = await getSession();

    if (!session) {
        return NextResponse.json(
            {
                detail: {
                    message: 'You are not authenticated',
                },
            },
            {
                status: 401,
            },
        );
    }

    const access = session.user.access;

    if (!access) {
        return NextResponse.json(
            {
                detail: {
                    message: 'You are not authenticated',
                },
            },
            {
                status: 401,
            },
        );
    }

    try {
        const { data, status } = await api.post(
            '/accounts/notifications/archive/',
            {
                id,
            },
            {
                headers: {
                    Authorization: `Bearer ${access}`,
                },
            },
        );

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
