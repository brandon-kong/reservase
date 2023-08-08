import { extendBaseTheme, extendTheme } from '@chakra-ui/react';
import colors from '@/lib/theme/colors';
import spacing from '@/lib/theme/spacing';

import Button from '@/lib/theme/components/Button';

const config = {
    initialColorMode: 'light',
    useSystemColorMode: false,
};

const theme = extendTheme({
    config,
    colors,
    space: spacing,
    components: {
        Button,
    },
});

export default theme;
