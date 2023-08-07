import { getCurrentUser } from '@/lib/session';
import { notFound } from 'next/navigation';
import { getProfileData } from '@/lib/account';

import ProfileContent from '@/components/layout/Account/ProfileContent';
import { ProfileData } from '@/types/types';

type ProfileViewProps = {
    params: {
        id: string;
    };
};

export default async function ProfileView({ params }: ProfileViewProps) {
    const { id } = params;

    const user = await getCurrentUser();

    return <ProfileContent user={user} id={id} />;
}
