import authOptions from '../auth/authOptions';
import { getServerSession } from 'next-auth';
import axios from 'axios';

export const getSession = async () => {
    const session = await getServerSession({ ...authOptions });
    return session;
};

export const getCurrentUser = async () => {
    const session = await getSession();
    return session?.user as any;
};

type SignUpParams = {
    email: string;
    password: string;
    first_name?: string;
    last_name?: string;
};
export const signUp = async ({ email, password, first_name, last_name }: SignUpParams) => {
    const data = await axios.post('/users/register', {
        email,
        password,
        first_name,
        last_name,
    });

    return data;
};
