'use client';

import { Box, Center, Container, Heading, List, ListItem, Spinner, VStack } from '@chakra-ui/react';

import { EmptyWishlist } from './WishlistCard';
import { MainHeading } from '@/components/Typography';

export default function WishlistPageView() {
    const isLoading = false;
    const notifications: any[] = [];

    return (
        <Container maxW={'container.sm'} py={20}>
            <VStack w={'full'}>
                <MainHeading w={'full'} textAlign={'left'}>
                    Wishlist
                </MainHeading>
                <List w={'full'} spacing={4} mt={10}>
                    {isLoading ? (
                        <Center w={'full'}>
                            <Spinner size={'lg'} />
                        </Center>
                    ) : (
                        notifications.map((notification: any) => (
                            <ListItem key={notification.id}>
                                <Box>hello</Box>
                            </ListItem>
                        ))
                    )}

                    {notifications.length === 0 && !isLoading && <EmptyWishlist />}
                </List>
            </VStack>
        </Container>
    );
}
