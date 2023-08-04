import UserPropertyList from '@/components/layout/Pages/Properties';
import { getUserProperties } from '@/lib/property';
import { getSession } from '@/lib/session';
import { Property } from '@/types/properties/types';

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

    const propertyData = await getUserProperties(user.pk);

    if (!propertyData) {
        return redirect('/account/login');
    }

    const { properties, user: propertyHost } = propertyData;

    return <UserPropertyList properties={properties} propertyHost={propertyHost} user={user} />;
}
