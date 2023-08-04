'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider, ChakraBaseProvider } from '@chakra-ui/react';
import { ColorModeScript } from '@chakra-ui/react';

import theme from '@/lib/theme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    return (
        <>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <CacheProvider>
                <ChakraProvider theme={theme}>{children}</ChakraProvider>
            </CacheProvider>
        </>
    );
}
