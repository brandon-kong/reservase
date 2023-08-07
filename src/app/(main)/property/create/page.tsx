import PropertyCreate from '@/components/layout/Pages/Property/Create';

import { getCurrentUser } from '@/lib/session';
import { redirect } from 'next/navigation';

export default async function CreatePropertyView() {
    const user = await getCurrentUser();

    if (!user) {
        return redirect('/account/login');
    }
    return <PropertyCreate />;
}
