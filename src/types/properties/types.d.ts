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
    status: string;
    area: string;
    bedrooms: number;
    bathrooms: number;
    garages: string;
};

export type GetUserPropertiesReturn = {
    properties: Property[];
    user: {
        pk: number;
        first_name: string;
        last_name: string;
    };
};
