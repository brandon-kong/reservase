import { getCurrentUser } from "@/lib/session"
import { notFound } from "next/navigation";

import {
    Container
} from '@chakra-ui/react';
import ProfileContent from "@/components/layout/Account/ProfileContent";

export default async function UserProfile () {
    const user = await getCurrentUser();

    if (!user) {
        notFound();
    }

    return (
        <ProfileContent user={user} />
    )
}