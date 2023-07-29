'use client';

import {
    MenuItem as ChakraMenuItem,
    MenuList as ChakraMenuList,
} from "@chakra-ui/react";

export const MenuItem = (props: any) => {
    return (
        <ChakraMenuItem
            _hover={{
                bg: 'monotone.200'
            }}
            _focus={{
                bg: 'monotone.200'
            }}
            {...props}
        />
    )
}

export const MenuList = (props: any) => {
    return (
        <ChakraMenuList
            borderColor={'monotone.300'}
            fontSize={'sm'}
            shadow={'md'}
            {...props}
        />
    )
}