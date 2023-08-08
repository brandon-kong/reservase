'use client';

import { MenuItem as ChakraMenuItem, MenuList as ChakraMenuList } from '@chakra-ui/react';

export const MenuItem = (props: any) => {
    return (
        <ChakraMenuItem
            fontWeight={'semibold'}
            _hover={{
                bg: 'monotone_light.200',
            }}
            _focus={{
                bg: 'monotone_light.200',
            }}
            {...props}
        />
    );
};

export const MenuList = (props: any) => {
    return <ChakraMenuList borderColor={'monotone_light.300'} fontSize={'sm'} shadow={'md'} {...props} />;
};
