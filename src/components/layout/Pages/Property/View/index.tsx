'use client';

import { useState } from 'react';
import { PrimaryButton, PrimaryIconButton, PrimaryOutlineButton } from '@/components/Buttons';
import { addReviewToProperty, deleteProperty, editProperty, wishlistProperty } from '@/lib/property';
import { Property, Review } from '@/types/properties/types';
import { useRouter, redirect, notFound } from 'next/navigation';

import { Divider, Flex, Select, Text } from '@chakra-ui/react';
import { SessionUser } from '@/types/types';
import useSWR from 'swr';
import { fetcherGet } from '@/lib/axios';

import PROPERTY_TYPES from '@/lib/property/type';

type PropertyViewListProps = {
    id: number;
    user?: SessionUser;
};

import { EditIcon } from '@chakra-ui/icons';
import { Link } from '@chakra-ui/next-js';
import Input, { NumberInput, Textarea } from '@/components/Input';
import ReviewCard from '@/components/ReviewCard';
import { useSession } from 'next-auth/react';

export default function UserPropertyList({ id }: PropertyViewListProps) {
    const router = useRouter();

    const [editing, setEditing] = useState<boolean>(false);
    const { data: session } = useSession() as any;

    const user = session?.user as SessionUser;

    const { data: propertyData, error: error, isLoading, mutate } = useSWR(`/properties/${id}/`, fetcherGet);
    const { host: propertyHost, property } = propertyData || { host: null };

    if (!propertyData && error) return notFound();
    if (!propertyData && isLoading) return <div>loading...</div>;

    const userIsOnOwnPropertyListing = user?.pk === propertyHost.pk;

    const handleDeleteProperty = async (propertyId: number) => {
        const deleted = await deleteProperty(propertyId);
        if (deleted) {
            router.push('/properties');
        }

        // TODO: Add error handling

        return;
    };

    const handleWishlistProperty = async (propertyId: number) => {
        if (!user) {
            return router.push('/account/login');
        }

        const successfullyWishlisted = await wishlistProperty(propertyId);
        if (successfullyWishlisted) {
            mutate();
        }

        // TODO: Add error handling
    };

    const handleReviewAdd = async (e: any) => {
        e.preventDefault();

        if (!user) {
            return router.push('/account/login');
        }

        const formData = new FormData(e.target);
        const property = id;
        const rating = formData.get('rating') as unknown as number;
        const comment = formData.get('comment') as string;

        const reviewData = {
            property,
            rating,
            comment,
        };

        const addedReview = await addReviewToProperty(property, reviewData);

        if (addedReview) {
            mutate();
        }
    };

    const handleEditProperty = async (e: any) => {
        e.preventDefault();

        if (!user) {
            return redirect('/account/login');
        }

        const formData = new FormData(e.target);
        const name = formData.get('name') as string;
        const description = formData.get('description') as string;
        const price = formData.get('price') as unknown as number;
        const property_type = formData.get('property_type') as string;
        const state = formData.get('state') as string;
        const city = formData.get('city') as string;
        const address = formData.get('address') as string;
        const zip_code = formData.get('zipcode') as string;
        const bedrooms = formData.get('bedrooms') as unknown as number;
        const bathrooms = formData.get('bathrooms') as unknown as number;
        const guests = formData.get('guests') as unknown as number;
        const country = formData.get('country') as string;
        const garages = formData.get('garages') as string;

        const propertyData = {
            name,
            description,
            price,
            property_type,
            state,
            city,
            address,
            zip_code,
            bedrooms,
            bathrooms,
            guests,
            country,
            garages,
        };

        const edited = await editProperty(id, propertyData);

        if (edited) {
            setEditing(false);
            mutate();
        }
    };

    return (
        <Flex direction={'column'} gap={4} p={20}>
            {userIsOnOwnPropertyListing ? (
                <PrimaryIconButton
                    colorScheme={'blue'}
                    display={editing ? 'none' : 'flex'}
                    icon={<EditIcon />}
                    onClick={() => {
                        setEditing(true);
                    }}
                />
            ) : null}
            <Flex
                display={editing ? 'none' : 'flex'}
                border={'1px solid'}
                borderColor={'monotone.500'}
                borderRadius={'md'}
                p={4}
                direction={'column'}
                gap={2}
            >
                <Text>{property.name}</Text>
                <Text>
                    Host:{' '}
                    <Link href={`/account/profile/${propertyHost.pk}`}>
                        {propertyHost.first_name + ' ' + propertyHost.last_name}
                    </Link>
                </Text>
                <Text>${property.price}</Text>
                <Text>Property Type: {property.property_type || 'undefined'}</Text>
                <Text>Wislisted: {`${property.wishlisted}`}</Text>
                <Text>Address: {property.address}</Text>
                <Text>City: {property.city}</Text>
                <Text>State: {property.state}</Text>
                <Text>Zipcode: {property.zipcode}</Text>
                <Text>Bedrooms: {property.bedrooms}</Text>
                <Text>Bathrooms: {property.bathrooms}</Text>
                <Text>Description: {property.description}</Text>
                <Text>Created: {property.created_at}</Text>
                <Text>Type: {property.property_type}</Text>
                {!userIsOnOwnPropertyListing ? (
                    <PrimaryOutlineButton
                        onClick={() => {
                            handleWishlistProperty(property.pk);
                        }}
                    >
                        {property.wishlisted ? 'Unwishlist Property' : 'Wishlist Property'}
                    </PrimaryOutlineButton>
                ) : null}

                {!userIsOnOwnPropertyListing ? (
                    <PrimaryButton
                        colorScheme={'blue'}
                        onClick={() => {
                            router.push(`/reserve/${property.pk}`);
                        }}
                    >
                        Make a Reservation
                    </PrimaryButton>
                ) : null}

                {userIsOnOwnPropertyListing ? (
                    <PrimaryButton
                        colorScheme={'red'}
                        onClick={() => {
                            handleDeleteProperty(property.pk);
                        }}
                    >
                        Delete Property
                    </PrimaryButton>
                ) : null}

                <Flex onSubmit={handleReviewAdd} as={'form'} direction={'column'} gap={4}>
                    <Text>Leave a review for this property:</Text>
                    <NumberInput name={'rating'} min={1} max={5} defaultValue={1} />
                    <Textarea name={'comment'} placeholder={'Leave a review for this property'} />
                    <PrimaryButton type={'submit'}>Submit review</PrimaryButton>
                </Flex>

                <Divider my={'8'} />

                <Flex direction={'column'} gap={4}>
                    <Text>Reviews:</Text>
                    <Flex direction={'column'} gap={4}>
                        {property.reviews.map((review: Review) => {
                            return <ReviewCard key={review.pk} review={review} />;
                        })}
                    </Flex>
                </Flex>
            </Flex>

            <Flex
                onSubmit={handleEditProperty}
                as={'form'}
                display={editing ? 'flex' : 'none'}
                border={'1px solid'}
                borderColor={'monotone.500'}
                borderRadius={'md'}
                p={4}
                direction={'column'}
                gap={2}
            >
                <Flex direction={'column'}>
                    <Text>Property Name</Text>
                    <Input name={'name'} defaultValue={property.name} />
                </Flex>

                <Flex direction={'column'}>
                    <Text>Property Description</Text>
                    <Input name={'description'} defaultValue={property.description} />
                </Flex>

                <Flex direction={'column'}>
                    <Text>Property Address</Text>
                    <Input name={'address'} defaultValue={property.address} />
                </Flex>

                <Flex direction={'column'}>
                    <Text>Property City</Text>
                    <Input name={'city'} defaultValue={property.city} />
                </Flex>

                <Flex direction={'column'}>
                    <Text>Property State</Text>
                    <Input name={'state'} defaultValue={property.state} />
                </Flex>

                <Flex direction={'column'}>
                    <Text>Property Zipcode</Text>
                    <Input name={'zipcode'} defaultValue={property.zipcode} />
                </Flex>

                <Flex direction={'column'}>
                    <Text>Property Country</Text>
                    <Input name={'country'} defaultValue={property.country} />
                </Flex>

                <Flex direction={'column'}>
                    <Text>Property Bedrooms</Text>
                    <NumberInput name={'bedrooms'} defaultValue={property.bedrooms} />
                </Flex>

                <Flex direction={'column'}>
                    <Text>Property Bathrooms</Text>
                    <NumberInput name={'bathrooms'} defaultValue={property.bathrooms} />
                </Flex>

                <Flex direction={'column'}>
                    <Text>Property Guests</Text>
                    <NumberInput name={'guests'} defaultValue={property.guests || 1} />
                </Flex>

                <Flex direction={'column'}>
                    <Text>Property Garages</Text>
                    <NumberInput name={'garages'} defaultValue={property.garages || 0} />
                </Flex>

                <Flex direction={'column'}>
                    <Text>Property Price</Text>
                    <NumberInput name={'price'} defaultValue={property.price} />
                </Flex>

                <Flex direction={'column'}>
                    <Text>Property Type</Text>
                    <Select name={'property_type'} defaultValue={property.property_type}>
                        {PROPERTY_TYPES.map((type: { name: string; value: string }) => {
                            return (
                                <option key={type.name} value={type.value}>
                                    {type.name}
                                </option>
                            );
                        })}
                    </Select>
                </Flex>

                <PrimaryButton type={'submit'}>Save</PrimaryButton>
                <PrimaryOutlineButton
                    onClick={() => {
                        setEditing(false);
                    }}
                >
                    Cancel
                </PrimaryOutlineButton>
            </Flex>
        </Flex>
    );
}
