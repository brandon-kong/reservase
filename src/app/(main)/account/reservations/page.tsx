import ReservationList from '@/components/layout/Pages/Reservations';
import { getCurrentUser } from '@/lib/session';

import { getSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default async function ReservationViewPage() {
    const user = await getCurrentUser();

    if (!user) {
        return redirect('/account/login');
    }

    return <ReservationList />;
}
