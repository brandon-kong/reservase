'use client';

type ProfileContentProps = {
    profileData: ProfileData;
    user?: any;
};

import { useState } from 'react';
import { Avatar, Flex, Text, Heading, List, ListItem, ListIcon, Icon, Divider, Image } from '@chakra-ui/react';

import { CheckIcon, StarIcon } from '@chakra-ui/icons';
import { PrimaryButton, PrimaryOutlineButton } from '@/components/Buttons';
import { ProfileData } from '@/types/types';
import EditProfileView from '@/components/EditProfileView';
import Link from 'next/link';

export default function BecomeHostContent() {
    const [editing, setEditing] = useState<boolean>(false);

    return (
        <Flex
            fontSize={'sm'}
            minH={'calc(100vh - 65px)'}
            align={'flex-start'}
            direction={'column'}
            gap={10}
        >
            <Flex
                minH={'60vh'}
                w={'full'}
                bg={'monotone.200'}
                px={{
                    base: 8,
                    md: 20
                }}

                py={12}


                direction={{
                    base: 'column',
                    lg: 'row'
                }}
                

                gap={8}
                
                justify={{
                    base: 'center',
                    md: 'flex-end',
                }}
                align={{
                    base: 'center',
                    md: 'flex-end',
                }}
            >
                <Flex
                flex={1}
                direction={'column'}
                gap={8}

                align={{
                    base: 'center',
                    md: 'flex-start',
                }}
                >
                    <Flex
                    direction={'column'}
                    gap={4}
                    >
                        <Heading w={'full'} 
                        size={'2xl'}
                        color={'monotone.900'}

                        textAlign={{
                            base: 'center',
                            md: 'left'
                        }}
                        >
                            Try hosting with us
                        </Heading>
                        <Text

                        textAlign={{
                            base: 'center',
                            md: 'left'
                        }}
                        w={{
                            base: 'full',
                        }}
                        fontSize={'md'}
                        color={'monotone.600'}
                        >
                            Ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat.
                            Sed auctor nunc quis mauris malesuada, quis consequat libero sagittis.
                        </Text>
                    </Flex>
                    

                    <PrimaryButton
                    as={Link}
                    href={'/property/create'}
                    w={'50%'}
                    maxW={'300px'}
                    >
                        Become a host
                    </PrimaryButton>
                </Flex>
                <Flex
                flex={1}
                align={'flex-start'}
                justify={{
                    base: 'center',
                    md: 'flex-start',
                    lg: 'center'
                }}
                h={'full'}
                w={'full'}
                px={4}
                >
                    <Image
                    filter={'brightness(0.7) grayscale(0.5) saturate(1.2) contrast(0.8) hue-rotate(10deg)'}
                    src={'/images/host-hero.jpg'}
                    
                    rounded={'lg'}
                    alt={'Host hero'}
                    w={'full'}
                    h={'full'}
                    maxW={'500px'}
                    />
                </Flex>
            

            </Flex>
            

           
        </Flex>
    );
}
