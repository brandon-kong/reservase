import PropertyViewList from '@/components/layout/Pages/Property/View';
import { getCurrentUser } from '@/lib/session';

type PropertyView = {
    params: {
        id: number;
    };
};

export default async function PropertyView({ params }: PropertyView) {
    const user = await getCurrentUser();
    const id = Number(params.id);

    return <PropertyViewList user={user} id={id} />;
}
