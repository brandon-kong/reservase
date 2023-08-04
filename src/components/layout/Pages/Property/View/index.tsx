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

export default function UserPropertyList({ user, id }: PropertyViewListProps) {
    const router = useRouter();

    const [editing, setEditing] = useState<boolean>(false);

    const {
        data: propertyData,
        error: error,
        isLoading,
        mutate,
    } = useSWR([`/properties/${id}/`, user?.access], fetcherGet);
    const { user: propertyHost } = propertyData || { user: null };

    if (!propertyData && error) return notFound();
    if (!propertyData && isLoading) return <div>loading...</div>;

    const userIsOnOwnPropertyListing = user?.pk === propertyHost.pk;

    const handleDeleteProperty = async (propertyId: number) => {
        const deleted = await deleteProperty(propertyId);
        if (deleted) {
            mutate();
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
                <Text>{propertyData.name}</Text>
                <Text>
                    Host:{' '}
                    <Link href={`/account/profile/${propertyHost.pk}`}>
                        {propertyHost.first_name + ' ' + propertyHost.last_name}
                    </Link>
                </Text>
                <Text>${propertyData.price}</Text>
                <Text>Property Type: {propertyData.property_type || 'undefined'}</Text>
                <Text>Wislisted: {`${propertyData.wishlisted}`}</Text>
                <Text>Address: {propertyData.address}</Text>
                <Text>City: {propertyData.city}</Text>
                <Text>State: {propertyData.state}</Text>
                <Text>Zipcode: {propertyData.zipcode}</Text>
                <Text>Bedrooms: {propertyData.bedrooms}</Text>
                <Text>Bathrooms: {propertyData.bathrooms}</Text>
                <Text>Description: {propertyData.description}</Text>
                <Text>Created: {propertyData.created_at}</Text>
                <Text>Type: {propertyData.property_type}</Text>
                {!userIsOnOwnPropertyListing ? (
                    <PrimaryOutlineButton
                        onClick={() => {
                            handleWishlistProperty(propertyData.pk);
                        }}
                    >
                        {propertyData.wishlisted ? 'Unwishlist Property' : 'Wishlist Property'}
                    </PrimaryOutlineButton>
                ) : null}
                {userIsOnOwnPropertyListing ? (
                    <PrimaryButton
                        colorScheme={'red'}
                        onClick={() => {
                            handleDeleteProperty(propertyData.pk);
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
                        {propertyData.reviews.map((review: Review) => {
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
                    <Input name={'name'} defaultValue={propertyData.name} />
                </Flex>

                <Flex direction={'column'}>
                    <Text>Property Description</Text>
                    <Input name={'description'} defaultValue={propertyData.description} />
                </Flex>

                <Flex direction={'column'}>
                    <Text>Property Address</Text>
                    <Input name={'address'} defaultValue={propertyData.address} />
                </Flex>

                <Flex direction={'column'}>
                    <Text>Property City</Text>
                    <Input name={'city'} defaultValue={propertyData.city} />
                </Flex>

                <Flex direction={'column'}>
                    <Text>Property State</Text>
                    <Input name={'state'} defaultValue={propertyData.state} />
                </Flex>

                <Flex direction={'column'}>
                    <Text>Property Zipcode</Text>
                    <Input name={'zipcode'} defaultValue={propertyData.zipcode} />
                </Flex>

                <Flex direction={'column'}>
                    <Text>Property Country</Text>
                    <Input name={'country'} defaultValue={propertyData.country} />
                </Flex>

                <Flex direction={'column'}>
                    <Text>Property Bedrooms</Text>
                    <NumberInput name={'bedrooms'} defaultValue={propertyData.bedrooms} />
                </Flex>

                <Flex direction={'column'}>
                    <Text>Property Bathrooms</Text>
                    <NumberInput name={'bathrooms'} defaultValue={propertyData.bathrooms} />
                </Flex>

                <Flex direction={'column'}>
                    <Text>Property Guests</Text>
                    <NumberInput name={'guests'} defaultValue={propertyData.guests || 1} />
                </Flex>

                <Flex direction={'column'}>
                    <Text>Property Garages</Text>
                    <NumberInput name={'garages'} defaultValue={propertyData.garages || 0} />
                </Flex>

                <Flex direction={'column'}>
                    <Text>Property Price</Text>
                    <NumberInput name={'price'} defaultValue={propertyData.price} />
                </Flex>

                <Flex direction={'column'}>
                    <Text>Property Type</Text>
                    <Select name={'property_type'} defaultValue={propertyData.property_type}>
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
