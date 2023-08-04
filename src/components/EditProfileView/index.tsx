type EditProfileViewProps = {
    user: any;
    profileData: any;
    setEditing: (editing: boolean) => void;
};

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { updateProfileData } from '@/lib/account';

import { getSession } from 'next-auth/react';
import { Flex, InputGroup, Spinner, Text } from '@chakra-ui/react';

import Input, { Textarea } from '../Input';
import { PrimaryButton, PrimaryOutlineButton, TransparentButton } from '../Buttons';

export default function EditProfileView({ user, setEditing, profileData }: EditProfileViewProps) {
    const router = useRouter();

    const [loading, setLoading] = useState<boolean>(false);
    const [firstName, setFirstName] = useState<string>(profileData.first_name);
    const [lastName, setLastName] = useState<string>(profileData.last_name);

    const [aboutMe, setAboutMe] = useState<string>(profileData.about_me);
    const [occupation, setOccupation] = useState<string>(profileData.occupation);

    const tryUpdateProfileData = async () => {
        setLoading(true);
        const session = await getSession();
        const response = await updateProfileData({
            first_name: firstName,
            last_name: lastName,
            about_me: aboutMe,
            occupation: occupation,
            access: (session?.user as any)?.access as string,
        });

        if (!response) {
            // TODO: show toast
            setLoading(false);
        } else {
            setLoading(false);
            setEditing(false);
            router.refresh();
        }
    };

    return (
        <Flex position={'relative'} direction={'column'} gap={8} opacity={loading ? 0.5 : 1}>
            <Spinner
                zIndex={1}
                position={'absolute'}
                top={'50%'}
                left={'50%'}
                translateX={'-50%'}
                translateY={'-50%'}
                thickness="4px"
                speed="0.65s"
                size="xl"
                display={loading ? 'block' : 'none'}
            />

            <Flex
                gap={8}
                direction={{
                    base: 'column',
                    lg: 'row',
                }}
            >
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
                <PrimaryOutlineButton
                    isLoading={loading}
                    disabled={loading}
                    fontWeight={'semibold'}
                    w={'28'}
                    onClick={() => setEditing(false)}
                >
                    Cancel
                </PrimaryOutlineButton>

                <PrimaryButton
                    isLoading={loading}
                    disabled={loading}
                    onClick={tryUpdateProfileData}
                    fontWeight={'semibold'}
                    w={'28'}
                >
                    Save
                </PrimaryButton>
            </Flex>
        </Flex>
    );
}
