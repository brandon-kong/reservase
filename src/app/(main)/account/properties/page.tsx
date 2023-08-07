import UserPropertyList from '@/components/layout/Pages/Properties';
import { getCurrentUser } from '@/lib/session';
import { redirect } from 'next/navigation';

type UserPropertiesViewProps = {
    params: {
        id: number;
    };
};

export default async function UserPropertiesView() {
    const user = await getCurrentUser();

    if (!user) {
        return redirect('/account/login');
    }

    return <UserPropertyList id={user.pk} user={user} />;
}
