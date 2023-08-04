import UserPropertyList from '@/components/layout/Pages/Properties';
import { getUserProperties } from '@/lib/property';
import { getCurrentUser, getSession } from '@/lib/session';
import { Property } from '@/types/properties/types';

import { redirect, notFound } from 'next/navigation';

type UserPropertiesViewProps = {
    params: {
        id: number;
    };
};

export default async function UserPropertiesView({ params }: UserPropertiesViewProps) {
    const user = await getCurrentUser();
    const id = Number(params.id);

    const propertyData = await getUserProperties(id);

    if (!propertyData) {
        return notFound();
    }

    const { properties, user: propertyHost } = propertyData;

    return <UserPropertyList user={user} propertyHost={propertyHost} properties={properties} />;
}
