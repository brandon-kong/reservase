import ViewReservationView from '@/components/layout/Pages/Reserve/View';
import { getCurrentUser } from '@/lib/session';

type ReservationViewPageProps = {
    params: {
        id: string;
    };
};

export default async function ReservationViewPage({ params }: ReservationViewPageProps) {
    const { id } = params;

    const user = await getCurrentUser();

    return <ViewReservationView id={id} user={user} />;
}
