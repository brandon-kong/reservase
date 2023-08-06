import MakeReservationView from '@/components/layout/Pages/Reserve/Create';

type ReserveViewProps = {
    params: {
        id: string;
    };
};

export default function ReserveView({ params }: ReserveViewProps) {
    const { id } = params;

    return <MakeReservationView id={id} />;
}
