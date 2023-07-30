import { getCurrentUser } from '@/lib/session';
import { notFound } from 'next/navigation';
import { getProfileData } from '@/lib/account';

import { Container } from '@chakra-ui/react';
import ProfileContent from '@/components/layout/Account/ProfileContent';
import { ProfileData } from '@/types/types';

export default async function UserProfile() {
    const user = await getCurrentUser();

    if (!user) {
        notFound();
    }

    const userProfile: ProfileData = await getProfileData(user.pk);

    if (!userProfile) {
        notFound();
    }

    return <ProfileContent user={user} profileData={userProfile} />;
}
