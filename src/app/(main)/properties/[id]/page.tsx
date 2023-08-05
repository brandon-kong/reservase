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
    const id = Number(params.id);
    const user = await getCurrentUser();

    return <UserPropertyList id={id} user={user} />;
}
