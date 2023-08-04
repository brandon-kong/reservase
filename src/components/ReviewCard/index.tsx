'use client';

import { Review } from '@/types/properties/types';
import { Link } from '@chakra-ui/next-js';
import { Flex, Text } from '@chakra-ui/react';

type ReviewCardProps = {
    review: Review;
};
export default function ReviewCard({ review }: ReviewCardProps) {
    return (
        <Flex direction={'column'} gap={4} border={'1px solid'} borderColor={'monotone.500'} borderRadius={'md'} p={4}>
            <Flex>
                <Text>Rating: {review.rating}</Text>
            </Flex>
            <Text>
                Reviewer:
                <Link href={`/account/profile/${review.user.pk}`}>
                    {review.user.first_name + ' ' + review.user.last_name}
                </Link>
            </Text>
            <Text>Comment: {review.comment}</Text>
        </Flex>
    );
}
