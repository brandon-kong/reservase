'use client';

import { createRef } from 'react';
import { Avatar, Container, HStack, Heading, VStack, Text, Flex, Icon, Divider, SimpleGrid } from '@chakra-ui/react';

import { StarIcon } from '@chakra-ui/icons';
import { PrimaryOutlineButton } from '@/components/Buttons';

import { BiSolidPlaneAlt } from 'react-icons/bi';
import { GiChefToque } from 'react-icons/gi';
import { MdSportsFootball } from 'react-icons/md';
import { TiGlobeOutline } from 'react-icons/ti';
import { PiBriefcaseLight } from 'react-icons/pi';
import { TbMessageLanguage } from 'react-icons/tb';

import { FaCamera } from 'react-icons/fa';
import Input from '@/components/Input';
import axios from 'axios';

type UsersShowViewProps = {
    id: string;
};

export default function ShowUserEdit({ id }: UsersShowViewProps) {
    const fileInputRef = createRef<HTMLInputElement>();

    const profile = {
        first_name: 'John',
        review_count: 12,
    };

    const handleProfileImageChange = () => {
        const current = fileInputRef.current;
        if (!current) return;
        current.click();
    };

    const onProfileImageChange = async () => {
        const current = fileInputRef.current;
        if (!current) return;
        const file = current.files?.[0];
        if (!file) return;

        const form = new FormData();
        form.append('image', file);

        const accepted = axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/accounts/image/`, form, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        alert(JSON.stringify(accepted))
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
                <Flex px={8} py={8} rounded={'lg'} justify={'center'} w={'full'} gap={12}>
                    <Avatar
                        w={'14rem'}
                        h={'14rem'}
                        size={'4xl'}
                        fontSize={'8rem'}
                        icon={<Icon as={StarIcon} />}
                        name={profile.first_name}
                        bg={'monotone_dark.900'}
                    >
                        <Flex
                            userSelect={'none'}
                            transition={'all .2s ease-in-out'}
                            _active={{
                                transform: 'scale(0.95)',
                            }}
                            cursor={'pointer'}
                            position={'absolute'}
                            bottom={-5}
                            gap={3}
                            align={'center'}
                            boxShadow={'xl'}
                            bg={'white'}
                            rounded={'full'}
                            fontSize={'md'}
                            color={'black'}
                            p={2}
                            px={4}
                            textTransform={'none'}
                            onClick={handleProfileImageChange}
                        >
                            <Icon as={FaCamera} fontSize={'1.25rem'} />
                            Add
                            <input
                                ref={fileInputRef}
                                type={'file'}
                                accept={'image/*'}
                                hidden
                                onChange={onProfileImageChange}
                            />
                        </Flex>
                    </Avatar>
                </Flex>
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
