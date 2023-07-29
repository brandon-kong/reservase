import RegisterContent from '@/components/layout/Account/RegisterContent';
import { getCurrentUser } from '@/lib/session';
import { redirect } from 'next/navigation';

export default async function RegisterPage() {
    const user = await getCurrentUser();

    if (user) {
        redirect('/');
    }

    return <RegisterContent />;
}
