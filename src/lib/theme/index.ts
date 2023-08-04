import { extendBaseTheme, extendTheme } from '@chakra-ui/react';
import colors from '@/lib/theme/colors';

import Button from '@/lib/theme/components/Button';

const config = {
    initialColorMode: 'light',
    useSystemColorMode: false,
};

const theme = extendTheme({
    config,
    colors,
    components: {
        Button,
    },
});

export default theme;
