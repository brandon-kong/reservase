import { extendBaseTheme, extendTheme } from '@chakra-ui/react';
import colors from '@/lib/theme/colors';
import spacing from '@/lib/theme/spacing';
import styles from '@/lib/theme/styles';
import fonts from '@/lib/theme/fonts';

import Button from '@/lib/theme/components/Button';

const config = {
    initialColorMode: 'light',
    useSystemColorMode: false,
};

const theme = extendTheme({
    fonts,
    styles,
    config,
    colors,
    space: spacing,
    components: {
        Button,
    },
});

export default theme;
