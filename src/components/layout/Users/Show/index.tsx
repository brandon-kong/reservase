'use client';

import {
    Avatar,
    Container,
    HStack,
    Heading,
    VStack,
    Text,
    Flex,
    Icon,
    AvatarBadge,
    Divider,
    List,
    ListItem,
    ListIcon,
} from '@chakra-ui/react';

import { StarIcon, CheckIcon } from '@chakra-ui/icons';

type UsersShowViewProps = {
    id: string;
};

export default function UsersShowView({ id }: UsersShowViewProps) {
    const profile = {
        first_name: 'John',
        review_count: 12,
    };
    return (
        <Container maxW={'container.sm'} py={20}>
            <VStack>
                <Flex px={8} py={8} rounded={'lg'} bg={'monotone_light.200'} justify={'center'} w={'full'} gap={12}>
                    <Flex direction={'column'} align={'center'} flex={1} justify={'center'} gap={2}>
                        <Avatar
                            size={'xl'}
                            icon={<Icon as={StarIcon} fontSize="1rem" />}
                            name={profile.first_name}
                            bg={'monotone_dark.900'}
                        >
                            <AvatarBadge
                                boxSize=".8em"
                                bg="primary.500"
                                borderColor={'monotone_light.200'}
                                borderWidth={'2px'}
                            />
                        </Avatar>

                        <Flex direction={'column'} align={'center'}>
                            <Heading fontWeight={'bold'}>{profile.first_name}</Heading>
                            <Text fontSize={'md'} color={'monotone_dark.700'}>
                                Guest
                            </Text>
                        </Flex>
                    </Flex>

                    <Flex flex={1} gap={4} direction={'column'}>
                        <Flex w={'full'} direction={'column'}>
                            <Heading fontWeight={'semibold'} fontSize={'2xl'}>
                                {profile.review_count}
                            </Heading>
                            <Text fontSize={'xs'} color={'monotone_dark.600'} fontWeight={'semibold'}>
                                {' '}
                                Reviews
                            </Text>
                        </Flex>
                        <Divider borderColor={'monotone_light.600'} />
                        <Flex w={'full'} direction={'column'}>
                            <Heading as={Flex} align={'center'} gap={2} fontWeight={'semibold'} fontSize={'2xl'}>
                                4.88
                                <Icon fontSize={'md'} as={StarIcon} color={'primary.500'} />
                            </Heading>
                            <Text fontSize={'xs'} color={'monotone_dark.600'} fontWeight={'semibold'}>
                                {' '}
                                Rating
                            </Text>
                        </Flex>
                        <Divider borderColor={'monotone_light.600'} />

                        <Flex w={'full'} direction={'column'}>
                            <Heading as={Flex} align={'center'} gap={2} fontWeight={'semibold'} fontSize={'2xl'}>
                                12
                            </Heading>
                            <Text fontSize={'xs'} color={'monotone_dark.600'} fontWeight={'semibold'}>
                                {' '}
                                Years hosting
                            </Text>
                        </Flex>
                    </Flex>
                </Flex>

                <Flex px={8} py={8} rounded={'lg'} bg={'monotone_light.200'} justify={'center'} w={'full'} gap={12}>
                    <Flex flex={1} gap={4} direction={'column'}>
                        <Heading fontSize={'2xl'}>{profile.first_name + "'s" + ' identity verification'}</Heading>
                        <List spacing={1}>
                            <ListItem>
                                <ListIcon as={CheckIcon} color={'primary.400'} />
                                Email confirmed
                            </ListItem>
                            <ListItem>
                                <ListIcon as={CheckIcon} color={'primary.400'} />
                                Phone number confirmed
                            </ListItem>
                            <ListItem>
                                <ListIcon as={CheckIcon} color={'primary.400'} />
                                Identity verified
                            </ListItem>
                        </List>
                    </Flex>
                </Flex>
            </VStack>
        </Container>
    );
}
