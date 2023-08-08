'use client';

import { Flex, Spinner } from '@chakra-ui/react';

export default function Loading() {
    return (
        <Flex top={0} left={0} position={'absolute'} h={'100vh'} w={'100vw'} align={'center'} justify={'center'}>
            <Spinner size={'xl'} />
        </Flex>
    );
}
