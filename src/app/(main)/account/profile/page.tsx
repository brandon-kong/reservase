import { getCurrentUser } from '@/lib/session';
import { notFound } from 'next/navigation';

import ProfileContent from '@/components/layout/Account/ProfileContent';

export default async function UserProfile() {
    const user = await getCurrentUser();
    if (!user) {
        return notFound();
    }

    return <ProfileContent user={user} id={user.pk} />;
}
