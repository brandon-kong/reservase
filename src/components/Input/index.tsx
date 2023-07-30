import { Input as ChakraInput } from '@chakra-ui/react';

export default function Input(props: any) {
    const { children, ...rest } = props;

    return (
        <ChakraInput
            fontWeight={'normal'}
            fontSize={'sm'}
            h={12}
            rounded={'lg'}
            px={6}
            colorScheme="monotone"
            focusBorderColor="primary.400"
            {...rest}
        >
            {children}
        </ChakraInput>
    );
}
