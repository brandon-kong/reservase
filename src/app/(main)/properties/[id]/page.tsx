import UserPropertyList from '@/components/layout/Pages/Properties';
import { getCurrentUser } from '@/lib/session';

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
