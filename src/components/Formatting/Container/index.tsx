'use client';

import { Container as ChakraContainer } from '@chakra-ui/react';

export default function ScreenContainer(props: any) {
    const { children, ...rest } = props;

    return (
        <ChakraContainer maxW="container.xl" {...rest}>
            {children}
        </ChakraContainer>
    );
}
