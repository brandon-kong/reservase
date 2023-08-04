'use client';

import { Flex, FormLabel, FormControl, Select } from '@chakra-ui/react';

import Input, { NumberInput, Textarea } from '@/components/Input';
import { PrimaryButton } from '@/components/Buttons';
import { createProperty } from '@/lib/property';

import propertyTypes from '@/lib/property/type';

export default function PropertyCreate() {
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const data = new FormData(e.target);

        const propertyData = await createProperty({
            name: data.get('name') as string,
            description: data.get('description') as string,
            address: data.get('address') as string,
            city: data.get('city') as string,
            state: data.get('state') as string,
            zip_code: data.get('zip_code') as string,
            country: data.get('country') as string,
            price: data.get('price') as unknown as number,
            type: data.get('type') as string,
            status: data.get('status') as string,
            area: data.get('area') as string,
            bedrooms: data.get('bedrooms') as unknown as number,
            bathrooms: data.get('bathrooms') as unknown as number,
            garages: data.get('garages') as string,
        });

        if (propertyData) {
            alert(JSON.stringify(propertyData));
        }
    };
    return (
        <Flex p={20}>
            <FormControl onSubmit={handleSubmit} as={'form'} display={'flex'} flexDirection={'column'} gap={8}>
                <Flex direction={'column'} gap={2}>
                    <FormLabel>Property Name</FormLabel>
                    <Input name={'name'} placeholder={'Property Name'} />
                </Flex>
                <Flex direction={'column'} gap={4}>
                    <FormLabel>Property Description</FormLabel>
                    <Textarea name={'description'} placeholder={'Property Description'} />
                </Flex>

                <Flex direction={'column'} gap={2}>
                    <FormLabel>Property Address</FormLabel>
                    <Input name={'address'} placeholder={'Property Address'} />
                </Flex>
                <Flex direction={'column'} gap={2}>
                    <FormLabel>Property City</FormLabel>
                    <Input name={'city'} placeholder={'Property City'} />
                </Flex>
                <Flex direction={'column'} gap={2}>
                    <FormLabel>Property State</FormLabel>
                    <Input name={'state'} placeholder={'Property State'} />
                </Flex>
                <Flex direction={'column'} gap={2}>
                    <FormLabel>Property Zip Code</FormLabel>
                    <Input name={'zip_code'} placeholder={'Property Zip Code'} />
                </Flex>
                <Flex direction={'column'} gap={2}>
                    <FormLabel>Property Country</FormLabel>
                    <Input name={'country'} placeholder={'Property Country'} />
                </Flex>
                <Flex direction={'column'} gap={2}>
                    <FormLabel>Property Price</FormLabel>
                    <NumberInput defaultValue={0} min={0} name={'price'} placeholder={'Property Price'} />
                </Flex>
                <Flex direction={'column'} gap={2}>
                    <FormLabel>Property Type</FormLabel>
                    <Select name={'type'} defaultValue={propertyTypes[0].value}>
                        {propertyTypes.map((type, index) => (
                            <option key={index} value={type.value}>
                                {type.name}
                            </option>
                        ))}
                    </Select>
                </Flex>
                <Flex direction={'column'} gap={2}>
                    <FormLabel>Property Status</FormLabel>
                    <Input name={'status'} placeholder={'Property Status'} />
                </Flex>
                <Flex direction={'column'} gap={2}>
                    <FormLabel>Property Area</FormLabel>
                    <Input name={'area'} placeholder={'Property Area'} />
                </Flex>
                <Flex direction={'column'} gap={2}>
                    <FormLabel>Property Bedrooms</FormLabel>
                    <NumberInput name={'bedrooms'} placeholder={'Property Bedrooms'} defaultValue={0} min={0} />
                </Flex>
                <Flex direction={'column'} gap={2}>
                    <FormLabel>Property Bathrooms</FormLabel>
                    <NumberInput name={'bathrooms'} placeholder={'Property Bathrooms'} defaultValue={0} min={0} />
                </Flex>
                <Flex direction={'column'} gap={2}>
                    <FormLabel>Property Garages</FormLabel>
                    <Input name={'garages'} placeholder={'Property Garages'} />
                </Flex>

                <PrimaryButton w={'full'} type={'submit'}>
                    Create Property
                </PrimaryButton>
            </FormControl>
        </Flex>
    );
}
