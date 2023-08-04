import {
    Input as ChakraInput,
    Textarea as ChakraTextarea,
    NumberInput as ChakraNumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from '@chakra-ui/react';

export default function Input(props: any) {
    const { children, ...rest } = props;

    return (
        <ChakraInput
            fontWeight={'normal'}
            fontSize={'sm'}
            h={12}
            rounded={'lg'}
            px={6}
            colorScheme="monotone_light"
            focusBorderColor="primary.400"
            {...rest}
        >
            {children}
        </ChakraInput>
    );
}

export function Textarea(props: any) {
    return (
        <ChakraTextarea
            borderColor={'monotone_light.500'}
            fontWeight={'normal'}
            fontSize={'sm'}
            h={12}
            rounded={'lg'}
            px={6}
            colorScheme="monotone"
            focusBorderColor="primary.400"
            {...props}
        />
    );
}

export function NumberInput(props: any) {
    return (
        <ChakraNumberInput
            fontWeight={'normal'}
            fontSize={'sm'}
            rounded={'lg'}
            colorScheme="monotone_light"
            focusBorderColor="primary.400"
            {...props}
        >
            <NumberInputField />
            <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
            </NumberInputStepper>
        </ChakraNumberInput>
    );
}
