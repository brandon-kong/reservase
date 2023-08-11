'use client';

import { Flex, Link, Text, Container, VStack, useColorModeValue, Box, Divider } from '@chakra-ui/react';

const footerData = [
    {
        label: 'Support',
        href: '#',
        links: [
            { label: 'Digital Garden', href: '#' },
            { label: 'Tutorials', href: '#' },
            { label: 'React', href: '#' },
            { label: 'Community', href: '#' },
        ],
    },
    {
        label: 'Hosting',
        href: '#',
        links: [
            { label: 'Design', href: '#' },
            { label: '3D Art', href: '#' },
            { label: 'Photography', href: '#' },
        ],
    },
    {
        label: 'Reservine',
        href: '#',
        links: [
            { label: 'Email', href: '#' },
            { label: 'Twitter', href: '#' },
            { label: 'Github', href: '#' },
            { label: 'Linkedin', href: '#' },
            { label: 'RSS', href: '#' },
        ],
    },
];

const Footer = () => {
    return (
        <Box
            borderTop={'1px solid'}
            borderColor={'monotone_light.500'}
            m={0}
            w={'full'}
            bg={'monotone_light.100'}
            p={{ base: 5, md: 10 }}
            pb={4}
        >
            <VStack m={'auto'} maxW={'5xl'} spacing={5} alignItems="initial">
                <Flex
                    flexWrap="wrap"
                    direction={{ base: 'column', md: 'row' }}
                    alignItems="start"
                    justifyContent="start"
                    gap={{
                        base: 5,
                        md: 30,
                    }}
                >
                    {footerData.map((data, index) => (
                        <Flex key={index} direction="column" mb="3">
                            <Text fontWeight="600" color={'monotone_dark.800'}>
                                {data.label}
                            </Text>
                            <Flex direction={{ base: 'row', md: 'column' }}>
                                {data.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        padding={1}
                                        fontSize={{ base: 'sm', sm: 'md' }}
                                        href="#"
                                        mr={{ base: 1, sm: 2, md: 0 }}
                                        color="gray.500"
                                        _hover={{ color: 'primary.600' }}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </Flex>
                        </Flex>
                    ))}
                </Flex>
                <Divider color={'monotone_dark.900'} />
                <Flex alignItems="center">
                    <Text
                        w={'full'}
                        textAlign={{
                            base: 'center',
                            md: 'left',
                        }}
                        color="gray.500"
                        fontSize="0.875rem"
                        pl="0.5rem"
                    >
                        &copy; 2023 Reservine, Inc. All rights reserved.
                    </Text>
                </Flex>
            </VStack>
        </Box>
    );
};

export default Footer;
