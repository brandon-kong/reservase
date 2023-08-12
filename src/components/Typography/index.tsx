'use client';

import { Heading, Text } from '@chakra-ui/react';

export function MainHeading({ children, ...rest }: { children: React.ReactNode; [key: string]: any }) {
    return (
        <Heading size={'lg'} fontWeight={'bold'} {...rest}>
            {children}
        </Heading>
    );
}

export function SubHeading({ children }: { children: React.ReactNode }) {
    return (
        <Heading as={'h2'} fontSize={'3xl'} fontWeight={'bold'} color={'monotone_dark.800'}>
            {children}
        </Heading>
    );
}

export function SectionHeading({ children }: { children: React.ReactNode }) {
    return (
        <Heading as={'h3'} fontSize={'2xl'} fontWeight={'bold'} color={'monotone_dark.800'}>
            {children}
        </Heading>
    );
}

export function SectionSubHeading({ children }: { children: React.ReactNode }) {
    return (
        <Heading as={'h4'} fontSize={'xl'} fontWeight={'bold'} color={'monotone_dark.800'}>
            {children}
        </Heading>
    );
}

export function BodyTextMd({ children, ...rest }: { children: React.ReactNode; [key: string]: any }) {
    return (
        <Text fontSize={'md'} fontWeight={'normal'} {...rest}>
            {children}
        </Text>
    );
}

export function BodyTextSm({ children, ...rest }: { children: React.ReactNode; [key: string]: any }) {
    return (
        <Text fontSize={'sm'} fontWeight={'normal'} {...rest}>
            {children}
        </Text>
    );
}
