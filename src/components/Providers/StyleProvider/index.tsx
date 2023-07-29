'use client';

import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { CacheProvider } from '@chakra-ui/next-js';

import theme from '@/lib/theme';

type StyleProviderProps = {
    children: React.ReactNode;
}

export default function StyleProvider ( { children }: StyleProviderProps) {
    return (
        <>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <CacheProvider>
                <ChakraProvider theme={theme}>
                    {children}
                </ChakraProvider>
            </CacheProvider>
        </>
        
    )
}