import ViewReservationView from '@/components/layout/Pages/Reserve/View';

type ReservationViewPageProps = {
    params: {
        id: string;
    };
};

export default function ReservationViewPage({ params }: ReservationViewPageProps) {
    const { id } = params;

    return <ViewReservationView id={id} />;
}
