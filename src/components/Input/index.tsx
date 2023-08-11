import {
    Input as ChakraInput,
    Textarea as ChakraTextarea,
    NumberInput as ChakraNumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Select as ChakraSelect,
} from '@chakra-ui/react';

export default function Input(props: any) {
    const { children, ...rest } = props;

    return (
        <ChakraInput
            autoComplete="off"
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

export function Select(props: any) {
    const { options, ...rest } = props;
    return (
        <ChakraSelect
            fontWeight={'normal'}
            fontSize={'sm'}
            h={12}
            rounded={'lg'}
            colorScheme="monotone_light"
            focusBorderColor="primary.400"
            {...rest}
        >
            {options.map((option: any) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </ChakraSelect>
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
