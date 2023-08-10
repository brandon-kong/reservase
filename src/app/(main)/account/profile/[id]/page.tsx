import { getCurrentUser } from '@/lib/session';

import ProfileContent from '@/components/layout/Account/ProfileContent';

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
