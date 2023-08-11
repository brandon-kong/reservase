'use client';

import { Container as ChakraContainer, Box } from '@chakra-ui/react';

export default function ScreenContainer(props: any) {
    const { children, ...rest } = props;

    return (
        <Box w={'full'} bg={'white'}>
            <ChakraContainer maxW="container.xl" {...rest}>
                {children}
            </ChakraContainer>
        </Box>
    );
}
