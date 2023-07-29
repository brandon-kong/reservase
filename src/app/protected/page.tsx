import { User } from '@/components/User';
import ProtectedPage from '@/components/layout/ProtectedRoute';

export default function ProtectedView() {
    return (
        <ProtectedPage>
            <h1>Protected View</h1>
        </ProtectedPage>
    );
}
