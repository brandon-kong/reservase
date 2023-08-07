import { Property } from '../properties/types';

export type ReservationStatus = 'pending' | 'accepted' | 'rejected' | 'cancelled' | 'completed';

export type Reservation = {
    pk: number;
    property: Property;

    check_in: string;
    check_out: string;

    guests: number;
    total: number;
    status: ReservationStatus;

    user: User;
};
