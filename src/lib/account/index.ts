import authOptions from '../auth/authOptions';
import { api, clientApi } from '@/lib/axios';
import { getServerSession } from 'next-auth';

export async function getProfileData(pk: number) {
    try {
        const { data, status } = await api.get(`/users/profile/${pk}`);

        if (status !== 200) {
            return null;
        } else {
            return data;
        }
    } catch (error) {
        return null;
    }
}

export async function updateProfileData({ first_name, last_name, about_me, location, occupation, access }: any) {
    console.log(access);
    try {
        const { data, status } = await clientApi.post(
            '/users/update/profile/',
            {
                first_name,
                last_name,
                about_me,
                location,
                occupation,
            },
            {
                headers: {
                    Authorization: `Bearer ${access}`,
                },
            },
        );

        //alert(status)

        if (status !== 200) {
            return null;
        } else {
            return true;
        }
    } catch (error) {
        return null;
    }
}

export async function getAccessToken() {
    const session = await getServerSession(authOptions);

    if (!session) {
        //signOut()
        return null;
    }

    const user = session.user as any;

    if (!user) {
        //signOut()
        return null;
    }

    return user.access;
}

export async function userIsHost() {
    const accessToken = await getAccessToken();

    try {
        const { data, status } = await api.get(`/users/is/host/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (status !== 200) {
            return null;
        } else {
            return data.is_host;
        }
    } catch (error) {
        return null;
    }
}
