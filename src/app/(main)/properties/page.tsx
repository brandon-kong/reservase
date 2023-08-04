import UserPropertyList from '@/components/layout/Pages/Properties';
import { getUserProperties } from '@/lib/property';
import { getSession } from '@/lib/session';

import { redirect } from 'next/navigation';

export default async function UserPropertiesView() {
    const session = await getSession();

    if (!session) {
        return redirect('/account/login');
    }

    const user = session.user;

    if (!user) {
        return redirect('/account/login');
    }

    return <UserPropertyList id={user.pk} user={user} />;
}
