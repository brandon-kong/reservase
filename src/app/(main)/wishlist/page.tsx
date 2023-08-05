import WishlistPropertiesView from '@/components/layout/Pages/Wishlist';
import { getCurrentUser } from '@/lib/session';

export default async function WishlistView() {
    const user = await getCurrentUser();
    return <WishlistPropertiesView user={user} />;
}
