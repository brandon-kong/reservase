type EditProfileViewProps = {
    user: any;
    profileData: any;
    setEditing: (editing: boolean) => void;
};

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { updateProfileData } from '@/lib/account';

import { getSession } from 'next-auth/react';
import { Flex, InputGroup, Text } from '@chakra-ui/react';

import Input, { Textarea } from '../Input';
import { PrimaryButton, PrimaryOutlineButton, TransparentButton } from '../Buttons';

export default function EditProfileView({ user, setEditing, profileData }: EditProfileViewProps) {
    const router = useRouter();
    const [firstName, setFirstName] = useState<string>(profileData.first_name);
    const [lastName, setLastName] = useState<string>(profileData.last_name);

    const [aboutMe, setAboutMe] = useState<string>(profileData.about_me);
    const [occupation, setOccupation] = useState<string>(profileData.occupation);

    const tryUpdateProfileData = async () => {
        const session = await getSession();
        const response = await updateProfileData({
            first_name: firstName,
            last_name: lastName,
            about_me: aboutMe,
            occupation: occupation,
            access: (session?.user as any)?.accessToken as string,
        });

        if (!response) {
            // TODO: show toast
        } else {
            setEditing(false);
            router.refresh();
        }
    };

    return (
        <Flex direction={'column'} gap={8}>
            <Flex gap={8}>
                <InputGroup as={Flex} direction={'column'} gap={2}>
                    <Text>First Name</Text>
                    <Input
                        label={'First Name'}
                        placeholder={'First Name'}
                        value={firstName}
                        onChange={(e: any) => setFirstName(e.target.value)}
                    />
                </InputGroup>

                <InputGroup as={Flex} direction={'column'} gap={2}>
                    <Text>Last Name</Text>
                    <Input
                        label={'Last Name'}
                        placeholder={'Last Name'}
                        value={lastName}
                        onChange={(e: any) => setLastName(e.target.value)}
                    />
                </InputGroup>
            </Flex>

            <InputGroup as={Flex} direction={'column'} gap={2}>
                <Text>About Me</Text>
                <Textarea
                    label={'About Me'}
                    placeholder={'Tell us about yourself!'}
                    value={aboutMe}
                    onChange={(e: any) => setAboutMe(e.target.value)}
                />
            </InputGroup>

            <InputGroup as={Flex} direction={'column'} gap={2}>
                <Text>Occupation</Text>
                <Input
                    label={'Occupation'}
                    placeholder={'What do you do?'}
                    value={occupation}
                    onChange={(e: any) => setOccupation(e.target.value)}
                />
            </InputGroup>

            <Flex gap={4}>
                <PrimaryOutlineButton fontWeight={'semibold'} w={'28'} onClick={() => setEditing(false)}>
                    Cancel
                </PrimaryOutlineButton>

                <PrimaryButton onClick={tryUpdateProfileData} fontWeight={'semibold'} w={'28'}>
                    Save
                </PrimaryButton>
            </Flex>
        </Flex>
    );
}
