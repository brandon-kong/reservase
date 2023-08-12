'use client';

import { createRef } from 'react';
import {
    Avatar,
    Container,
    HStack,
    Heading,
    VStack,
    Text,
    Flex,
    Icon,
    Divider,
    SimpleGrid,
    Card,
    Grid,
    GridItem,
} from '@chakra-ui/react';

import { StarIcon } from '@chakra-ui/icons';
import { PrimaryButton, PrimaryOutlineButton, TransparentButton } from '@/components/Buttons';

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

        const accepted = axios
            .post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}accounts/image/`, form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(res => {
                alert(JSON.stringify(res.data));
            })
            .catch(err => {
                alert(JSON.stringify(err));
            });
    };

    const userIsOwner = true;

    return (
        <Grid
            templateAreas={{
                base: `"left"
                        "right"
                        "bottom"`,
                md: `"left right"
                     "bottom bottom"`,
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
                as={GridItem}
                area={'left'}
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
                        minW={'10rem'}
                        maxW={'14rem'}
                        w={'full'}
                        aspectRatio={1 / 1}
                        size={'4xl'}
                        fontSize={'6xl'}
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

            <VStack as={GridItem} area={'right'} flex={1.6} h={'full'} align={'flex-start'}>
                <VStack w={'full'} spacing={8} h={'full'} align={'flex-start'}>
                    <Heading size={'lg'} fontWeight={'bold'}>
                        Your profile
                    </Heading>

                    <PrimaryOutlineButton display={'none'} w={'10rem'}>
                        Edit profile
                    </PrimaryOutlineButton>

                    <SimpleGrid
                        w={'full'}
                        columns={{
                            base: 1,
                            lg: 2,
                        }}
                        spacing={4}
                    >
                        <InfoAddCard icon={TiGlobeOutline}>Where you live</InfoAddCard>
                        <InfoAddCard icon={PiBriefcaseLight}>My work</InfoAddCard>
                        <InfoAddCard icon={TiGlobeOutline}>Favorite childhood snack</InfoAddCard>
                        <InfoAddCard icon={TiGlobeOutline}>I&apos;m notorious for</InfoAddCard>
                    </SimpleGrid>

                    <Heading size={'lg'} fontWeight={'bold'}>
                        About you
                    </Heading>

                    <Card border={'1px dashed'} borderColor={'monotone_light.600'} w={'full'} p={4}>
                        <Text color={'monotone_dark.600'}>
                            Write something fun and interesting about yourself here!
                        </Text>
                        <TransparentButton w={'9rem'} px={2} mt={4} textDecoration={'underline'}>
                            Edit About Me
                        </TransparentButton>
                    </Card>

                    <Divider borderColor={'monotone_light.600'} />

                    <Heading size={'md'} fontWeight={'semibold'}>
                        What you&apos;re passionate about
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
                        <AskMeAboutCard icon={BiSolidPlaneAlt}>Travel</AskMeAboutCard>
                        <AskMeAboutCard icon={GiChefToque}>Cooking</AskMeAboutCard>
                        <AskMeAboutCard icon={BiSolidPlaneAlt}>Travel</AskMeAboutCard>
                        <AskMeAboutCard icon={BiSolidPlaneAlt}>Travel</AskMeAboutCard>
                        <AskMeAboutCard icon={GiChefToque}>Cooking</AskMeAboutCard>
                        <AskMeAboutCard icon={MdSportsFootball}>Sports</AskMeAboutCard>
                        <AskMeAboutCard icon={BiSolidPlaneAlt}>Travel</AskMeAboutCard>
                        <AskMeAboutCard icon={MdSportsFootball}>Sports</AskMeAboutCard>
                        <AskMeAboutCard icon={BiSolidPlaneAlt}>Travel</AskMeAboutCard>
                        <AskMeAboutCard icon={GiChefToque}>Cooking</AskMeAboutCard>
                        <AskMeAboutCard icon={MdSportsFootball}>Sports</AskMeAboutCard>
                        <AskMeAboutCard icon={BiSolidPlaneAlt}>Travel</AskMeAboutCard>
                    </SimpleGrid>
                </VStack>
            </VStack>

            <Flex
                as={GridItem}
                area={'bottom'}
                mt={10}
                bg={'white'}
                position={'sticky'}
                bottom={0}
                pb={8}
                direction={'column'}
                w={'full'}
            >
                <Divider borderColor={'monotone_light.600'} />
                <PrimaryButton
                    mr={{
                        base: '0',
                        md: 20,
                    }}
                    alignSelf={{
                        base: 'center',
                        md: 'flex-end',
                    }}
                    w={'8rem'}
                    mt={8}
                    fontSize={'md'}
                    fontWeight={'semibold'}
                    rounded={'full'}
                    px={8}
                    py={4}
                >
                    Save
                </PrimaryButton>
            </Flex>
        </Grid>
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

const InfoAddCard = ({ icon, children }: any) => {
    return (
        <Card
            cursor={'pointer'}
            transition={'all .2s ease-in-out'}
            _hover={{
                boxShadow: 'md',
            }}
        >
            <Flex
                as={HStack}
                rounded={'lg'}
                w={'full'}
                pl={6}
                pr={8}
                py={4}
                bg={'monotone_light.100'}
                justify={'space-between'}
                align={'center'}
            >
                <HStack spacing={4}>
                    <Icon fontSize={'3xl'} as={icon} />
                    <Text fontSize={'md'} color={'monotone_dark.800'} fontWeight={450}>
                        {children}
                    </Text>
                </HStack>
            </Flex>
        </Card>
    );
};
