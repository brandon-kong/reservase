type EditProfileViewProps = {
    user: any;
    setEditing: (editing: boolean) => void;
}

import { useState } from "react";

import {
    Flex, InputGroup, Text
} from '@chakra-ui/react';

import Input, { Textarea } from "../Input";
import { PrimaryButton, PrimaryOutlineButton, TransparentButton } from "../Buttons";

export default function EditProfileView({ user, setEditing }: EditProfileViewProps) {
    const [firstName, setFirstName] = useState<string>(user.first_name)
    const [lastName, setLastName] = useState<string>(user.last_name)

    const [aboutMe, setAboutMe] = useState<string>('')
    const [occupation, setOccupation] = useState<string>('')

    return (
       <Flex
       direction={'column'}
        gap={8}
       >
            <Flex
            gap={8}
            >
                <InputGroup
                as={Flex}
                direction={'column'}
                gap={2}
                >
                <Text>First Name</Text>
                    <Input
                        label={'First Name'}
                        placeholder={'First Name'}
                        value={firstName}
                        onChange={(e: any) => setFirstName(e.target.value)}
                    />
                </InputGroup>
                
                <InputGroup
                as={Flex}
                direction={'column'}
                gap={2}
                >
                <Text>Last Name</Text>
                    <Input
                        label={'Last Name'}
                        placeholder={'Last Name'}
                        value={lastName}
                        onChange={(e: any) => setLastName(e.target.value)}
                    />
                </InputGroup>
            </Flex>

            <InputGroup
                as={Flex}
                direction={'column'}
                gap={2}
                >
                <Text>About Me</Text>
                    <Textarea
                        label={'About Me'}
                        placeholder={'Tell us about yourself!'}
                        value={aboutMe}
                        onChange={(e: any) => setAboutMe(e.target.value)}
                    />
             </InputGroup>

             <InputGroup
                as={Flex}
                direction={'column'}
                gap={2}
                >
                <Text>Occupation</Text>
                    <Input
                        label={'Occupation'}
                        placeholder={'What do you do?'}
                        value={occupation}
                        onChange={(e: any) => setOccupation(e.target.value)}
                    />
                </InputGroup>

            <Flex
            gap={4}
            >

                <PrimaryOutlineButton
                fontWeight={'semibold'}
                w={'28'}
                onClick={() => setEditing(false)}
                >
                    Cancel
                </PrimaryOutlineButton>

                <PrimaryButton
                fontWeight={'semibold'}
                w={'28'}
                onClick={() => setEditing(false)}
                >
                    Save
                </PrimaryButton>
            </Flex>
       </Flex>
    )
}