'use client';

import { PrimaryIconButton } from '@/components/Buttons';
import { Divider as ChakraDivider, Flex, Heading, Text } from '@chakra-ui/react';

import { SearchIcon } from '@chakra-ui/icons';

type SearchParamProps = {
    name: string;
    value?: string;
};

type AdvancedSearchProps = {
    isOpen: boolean;
    onOpen: () => void;
};

const Divider = (props: any) => {
    return <ChakraDivider orientation={'vertical'} h={'60%'} borderColor={'monotone.400'} {...props} />;
};

const SearchParam = (props: SearchParamProps) => {
    return (
        <Flex align={'center'} rounded={'full'} px={3} flex={1} h={'full'}>
            <Text fontSize={'sm'}>{props.name}</Text>
        </Flex>
    );
};

const RealSearchParam = (props: SearchParamProps) => {
    return (
        <Flex
            direction={'column'}
            align={'flex-start'}
            justify={'center'}
            zIndex={1}
            rounded={'full'}
            px={8}
            flex={1}
            h={'full'}
            _hover={{
                bg: 'monotone.200',
            }}
            transition={'all 0.2s ease-in-out'}
        >
            <Text w={'full'} fontSize={'sm'}>
                {props.name}
            </Text>
            <Text w={'full'} color={'monotone.500'} fontSize={'sm'}>
                {props.value}
            </Text>
        </Flex>
    );
};

export default function AdvancedSearch(props: AdvancedSearchProps) {
    return (
        <Flex
            bg={'white'}
            align={'center'}
            justify={'space-between'}
            border={'1px solid'}
            borderColor={'monotone.300'}
            h={12}
            px={2}
            opacity={props.isOpen ? 0 : 1}
            transform={props.isOpen ? 'translateY(150%) scale(2)' : 'translateY(0)'}
            cursor={'pointer'}
            rounded={'full'}
            _hover={{
                shadow: 'md',
            }}
            onClick={props.onOpen}
            transition={'all 0.2s ease-in-out, opacity 0.2s ease-in-out, transform 0.2s ease-in-out'}
        >
            <SearchParam name={'Anywhere'} />
            <Divider />
            <SearchParam name={'Anytime'} />
            <Divider />
            <SearchParam name={'Guests'} />
            <PrimaryIconButton size={'sm'} w={'8'} h={'8'} icon={<SearchIcon />} />
        </Flex>
    );
}

export const RealAdvancedSearch = (props: any) => {
    return (
        <Flex
            bg={'white'}
            align={'center'}
            justify={'space-between'}
            border={'1px solid'}
            borderColor={'monotone.300'}
            opacity={props.isOpen ? 1 : 0}
            h={20}
            w={'60%'}
            cursor={'pointer'}
            rounded={'full'}
            _hover={{
                shadow: 'md',
            }}
            transition={'all 0.2s ease-in-out'}
        >
            <RealSearchParam name={'Location'} value="Choose a region" />
            <RealSearchParam name={'Anywhere'} value="Add dates" />
            <GuestParam />
        </Flex>
    );
};

const GuestParam = (props: any) => {
    return (
        <Flex
            align={'center'}
            justify={'center'}
            rounded={'full'}
            h={'full'}
            _hover={{
                bg: 'monotone.200',
            }}
            transition={'all 0.2s ease-in-out'}
        >
            <RealSearchParam name={'Guests'} value="Choose a place bruh" />
            <PrimaryIconButton w={'16'} h={'16'} fontSize={'xl'} mr={'2'} icon={<SearchIcon />} />
        </Flex>
    );
};
