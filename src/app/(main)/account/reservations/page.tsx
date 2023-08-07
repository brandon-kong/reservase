import ViewReservationView from '@/components/layout/Pages/Reserve/View';
import ReservationList from '@/components/layout/Pages/Reservations';

type ReservationViewPageProps = {
    params: {
        id: string;
    };
};

export default function ReservationViewPage({ params }: ReservationViewPageProps) {
    const { id } = params;

    return <ReservationList />;
}
