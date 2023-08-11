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
    SimpleGrid,
    GridItem,
    Box,
} from '@chakra-ui/react';

import { StarIcon, CheckIcon } from '@chakra-ui/icons';
import { PrimaryOutlineButton } from '@/components/Buttons';

import { BiSolidPlaneAlt } from 'react-icons/bi';
import { GiChefToque } from 'react-icons/gi';
import { MdSportsFootball } from 'react-icons/md';
import { TiGlobeOutline } from 'react-icons/ti';
import { PiBriefcaseLight } from 'react-icons/pi';
import { TbMessageLanguage } from 'react-icons/tb';

type UsersShowViewProps = {
    id: string;
};

export default function UsersShowView({ id }: UsersShowViewProps) {
    const profile = {
        first_name: 'John',
        review_count: 12,
    };

    const userIsOwner = true;

    return (
        <Container
            as={Flex}
            direction={{
                base: 'column',
                md: 'row',
            }}
            gap={{
                base: 8,
                md: 16,
            }}
            maxW={{
                base: 'container.sm',
                md: 'container.xl',
            }}
            py={20}
        >
            <Flex
                flex={1}
                gap={8}
                direction={'column'}
                h={'fit-content'}
                position={{
                    base: 'relative',
                    md: 'sticky',
                }}
                top={{
                    base: '0',
                    md: '60px',
                }}
            >
                <Flex
                    px={8}
                    py={8}
                    rounded={'lg'}
                    bg={'white'}
                    border={'1px solid'}
                    borderColor={'monotone_light.600'}
                    justify={'center'}
                    w={'full'}
                    gap={12}
                >
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
                            <Heading size={'lg'} fontWeight={'semibold'}>
                                {profile.first_name}
                            </Heading>
                            <Text fontSize={'md'} color={'monotone_dark.700'}>
                                Guest
                            </Text>
                        </Flex>
                    </Flex>

                    <VStack
                        flex={1}
                        gap={4}
                        direction={'column'}
                        divider={<Divider borderColor={'monotone_light.600'} />}
                    >
                        <Flex w={'full'} direction={'column'}>
                            <Heading fontWeight={'semibold'} fontSize={'2xl'}>
                                {profile.review_count}
                            </Heading>
                            <Text fontSize={'xs'} color={'monotone_dark.600'} fontWeight={'semibold'}>
                                {' '}
                                Reviews
                            </Text>
                        </Flex>
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

                        <Flex w={'full'} direction={'column'}>
                            <Heading as={Flex} align={'center'} gap={2} fontWeight={'semibold'} fontSize={'2xl'}>
                                12
                            </Heading>
                            <Text fontSize={'xs'} color={'monotone_dark.600'} fontWeight={'semibold'}>
                                {' '}
                                Years hosting
                            </Text>
                        </Flex>
                    </VStack>
                </Flex>

                <Box
                    display={{
                        base: 'none',
                        md: 'block',
                    }}
                >
                    <IdentityConfirmCard profile={profile} userIsOwner={userIsOwner} />
                </Box>
            </Flex>

            <VStack flex={1.6} h={'full'} align={'flex-start'}>
                <VStack w={'full'} spacing={8} h={'full'} align={'flex-start'}>
                    <Heading size={'lg'} fontWeight={'bold'}>
                        About {profile.first_name}
                    </Heading>

                    <PrimaryOutlineButton display={'none'} w={'10rem'}>
                        Edit profile
                    </PrimaryOutlineButton>

                    <SimpleGrid w={'full'} columns={2} spacing={4}>
                        <HStack spacing={4}>
                            <Icon as={TiGlobeOutline} fontSize={'3xl'} />
                            <Text fontSize={'md'} color={'monotone_dark.800'} fontWeight={450}>
                                Lives in Sydney, Australia
                            </Text>
                        </HStack>

                        <HStack spacing={4}>
                            <Icon as={PiBriefcaseLight} fontSize={'3xl'} />
                            <Text fontSize={'md'} color={'monotone_dark.800'} fontWeight={450}>
                                My job: Software Engineer
                            </Text>
                        </HStack>

                        <HStack spacing={4}>
                            <Icon as={TbMessageLanguage} fontSize={'3xl'} />
                            <Text fontSize={'md'} color={'monotone_dark.800'} fontWeight={450}>
                                Speaks English
                            </Text>
                        </HStack>
                    </SimpleGrid>

                    <Text fontSize={'md'} color={'monotone_dark.700'} fontWeight={400}>
                        I&apos;m a software engineer from Sydney, Australia. I love to travel and meet new people.
                        Additionally, I love to cook and play sports.
                    </Text>

                    <Divider borderColor={'monotone_light.600'} />

                    <Heading size={'md'} fontWeight={'semibold'}>
                        Ask me about:
                    </Heading>

                    <SimpleGrid
                        w={'full'}
                        columns={{
                            base: 2,
                            lg: 4,
                        }}
                        spacing={4}
                    >
                        <AskMeAboutCard icon={BiSolidPlaneAlt}>Travel</AskMeAboutCard>
                        <AskMeAboutCard icon={GiChefToque}>Cooking</AskMeAboutCard>
                        <AskMeAboutCard icon={MdSportsFootball}>Sports</AskMeAboutCard>
                        <AskMeAboutCard icon={BiSolidPlaneAlt}>Travel</AskMeAboutCard>
                    </SimpleGrid>

                    <Heading size={'md'} fontWeight={'semibold'}>
                        What hosts say about {profile.first_name}
                    </Heading>

                    <Flex gap={8} w={'full'} direction={'column'}>
                        <ReviewCard review={profile} />
                        <ReviewCard review={profile} />
                        <ReviewCard review={profile} />
                    </Flex>

                    <Box
                        display={{
                            base: 'block',
                            md: 'none',
                        }}
                    >
                        <IdentityConfirmCard profile={profile} userIsOwner={userIsOwner} />
                    </Box>
                </VStack>
            </VStack>
        </Container>
    );
}

const EmptyProfile = ({ profile }: any) => {
    return (
        <VStack spacing={1} align={'flex-start'}>
            <Divider mb={8} borderColor={'monotone_light.600'} />
            <Heading fontSize={'2xl'} fontWeight={'semibold'}>
                {profile.first_name} hasn&apos;t set up their profile yet.
            </Heading>

            <Text fontSize={'sm'} color={'monotone_dark.600'} fontWeight={400}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam eu placerat
            </Text>
        </VStack>
    );
};

const AskMeAboutCard = ({ icon, children }: any) => {
    return (
        <PrimaryOutlineButton as={HStack} rounded={'full'} w={'full'} pl={6} pr={8}>
            <Icon fontSize={'3xl'} as={icon} />
            {children}
        </PrimaryOutlineButton>
    );
};

const ReviewCard = ({ review }: any) => {
    return (
        <Flex
            direction={'column'}
            rounded={'lg'}
            bg={'white'}
            border={'1px solid'}
            borderColor={'monotone_light.600'}
            p={8}
            w={'full'}
        >
            <Flex direction={'column'} align={'flex-start'}>
                <Flex align={'center'}>
                    <Avatar
                        size={'md'}
                        icon={<Icon as={StarIcon} fontSize="1rem" />}
                        name={review.first_name}
                        bg={'monotone_dark.900'}
                    >
                        <AvatarBadge
                            boxSize=".8em"
                            bg="primary.500"
                            borderColor={'monotone_light.200'}
                            borderWidth={'2px'}
                        />
                    </Avatar>

                    <Flex ml={4} direction={'column'}>
                        <Heading size={'md'} fontWeight={'semibold'}>
                            {review.first_name}
                        </Heading>
                        <Text fontSize={'sm'} color={'monotone_dark.600'} fontWeight={400}>
                            2 months ago
                        </Text>
                    </Flex>
                </Flex>

                <Flex mt={4} align={'center'}>
                    {/* show 4.5 stars */}
                    <Icon fontSize={'md'} as={StarIcon} color={'primary.500'} />
                    <Icon fontSize={'md'} as={StarIcon} color={'primary.500'} />
                    <Icon fontSize={'md'} as={StarIcon} color={'primary.500'} />
                    <Icon fontSize={'md'} as={StarIcon} color={'primary.500'} />
                    <Icon fontSize={'md'} as={StarIcon} color={'monotone_dark.600'} w={4} />
                    <Text ml={2} fontSize={'sm'} color={'monotone_dark.600'} fontWeight={400}>
                        5.0
                    </Text>
                </Flex>
            </Flex>

            <Text mt={4} fontSize={'sm'} color={'monotone_dark.600'} fontWeight={400}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam eu placerat
            </Text>
        </Flex>
    );
};

const IdentityConfirmCard = ({ profile, userIsOwner }: any) => {
    return (
        <Flex
            px={8}
            py={8}
            direction={'column'}
            rounded={'lg'}
            bg={'white'}
            border={{
                base: 'none',
                md: '1px solid',
            }}
            borderColor={'monotone_light.600'}
            justify={'center'}
            w={'full'}
            gap={10}
        >
            <Flex flex={1} gap={4} direction={'column'}>
                <Heading size={'md'} fontWeight={'semibold'}>
                    {profile.first_name}&apos;s verified identity
                </Heading>
                <List fontWeight={400} spacing={1}>
                    <ListItem>
                        <ListIcon as={CheckIcon} color={'monotone_dark.600'} />
                        Email confirmed
                    </ListItem>
                    <ListItem>
                        <ListIcon as={CheckIcon} color={'monotone_dark.600'} />
                        Phone number confirmed
                    </ListItem>
                    <ListItem>
                        <ListIcon as={CheckIcon} color={'monotone_dark.600'} />
                        Identity verified
                    </ListItem>
                </List>
            </Flex>

            {userIsOwner ? (
                <>
                    <Divider borderColor={'monotone_light.600'} />

                    <Flex flex={1} gap={4} direction={'column'}>
                        <Heading size={'md'} fontWeight={'semibold'}>
                            Verify your identity
                        </Heading>
                        <Text fontSize={'sm'} color={'monotone_dark.600'} fontWeight={400}>
                            Before you take advantage of all of Reservine&apos;s features, we need to verify your identity.
                        </Text>

                        <PrimaryOutlineButton
                            mt={4}
                            borderColor={'black'}
                            _active={{
                                borderColor: 'black',
                                transform: 'scale(0.95)',
                            }}
                            w={'15rem'}
                        >
                            Verify your identity
                        </PrimaryOutlineButton>
                    </Flex>
                </>
            ) : null}
        </Flex>
    );
};
