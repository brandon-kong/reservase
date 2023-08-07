import { Reservation } from '@/types/reservation/types';

export type Property = {
    name: string;
    description: string;
    price: number;
    property_type: string;
    bedrooms: number;
    bathrooms: number;
    address: string;
    city: string;
    state: string;
    zip_code: string;
    country: string;
    amenities: string[];
    rules: string[];
    images: string[];
    owner: number;
    is_published: boolean;
    is_archived: boolean;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    wishlisted: boolean;
    pk: number;

    host: User;

    reservations?: Reservation[];

    reviews: Review[];
};

export type CreatePropertyParams = {
    name: string;
    description: string;
    price: number;
    property_type: string;
    address: string;
    city: string;
    state: string;
    zip_code: string;
    country: string;
    bedrooms: number;
    bathrooms: number;
    garages: string;
    guests: number;
};

export type GetUserPropertiesReturn = {
    properties: Property[];
    host: User;
};

export type ReviewCreate = {
    property: number;
    comment: string;
    rating: number;
};

export type Review = {
    pk: number;
    property: number;
    comment: string;
    rating: number;
    created_at: string;
    updated_at: string;
    user: User;
};

export type User = {
    pk: number;
    first_name: string;
    last_name: string;
};
