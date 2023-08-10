import { Text } from '@chakra-ui/react';

interface Props {
    children: React.ReactNode;
    htmlFor: string;
    [x: string]: any;
}

const InputLabel = ({ children, htmlFor, ...rest }: Props) => {
    return (
        <Text
            userSelect={'none'}
            as={'label'}
            fontSize={'xs'}
            color={'black'}
            fontWeight={'500'}
            htmlFor={htmlFor}
            {...rest}
        >
            {children}
        </Text>
    );
};

export default InputLabel;
