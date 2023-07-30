import { getCurrentUser } from '@/lib/session';
import { notFound } from 'next/navigation';
import { getProfileData } from '@/lib/account';

import ProfileContent from '@/components/layout/Account/ProfileContent';
import { ProfileData } from '@/types/types';

type ProfileViewProps = {
    params: {
        id: number;
    };
};

export default async function ProfileView({ params }: ProfileViewProps) {
    const { id } = params;

    const user = await getCurrentUser();

    const userProfile: ProfileData = await getProfileData(id);

    if (!userProfile) {
        notFound();
    }

    return <ProfileContent user={user} profileData={userProfile} />;
}
