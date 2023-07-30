'use client';

import { Box } from '@chakra-ui/react';

export default function Padding(props: any) {
    const { children, ...rest } = props;

    return (
        <Box zIndex={0} {...rest}>
            {children}
        </Box>
    );
}
