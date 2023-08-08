'use client';

import { NumberInput } from '@/components/Input';
import { Box, Button, Spinner, Text, VStack, Image, Flex } from '@chakra-ui/react';

export default function Home() {
    return (
        <Box bg={'#f8f7f7'}>
            <Flex p={10} px={20} color={'black'} fontWeight={'semibold'}>
                <Flex gap={'8'}>
                    <Text>Home</Text>

                    <Text>Places</Text>

                    <Text>Help</Text>
                </Flex>
            </Flex>
        </Box>
    );
}
