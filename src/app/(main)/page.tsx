'use client';

import { Box, Button, Spinner, Text, VStack } from '@chakra-ui/react';

export default function Home() {
    return (
        <Box m={8}>
            <VStack>
                <Text>You are not authenticated.</Text>
                <Button colorScheme="green" onClick={() => console.log('Beep boop')}>
                    Sign in
                </Button>
            </VStack>
        </Box>
    );
}
