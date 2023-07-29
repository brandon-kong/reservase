import { getCurrentUser } from "@/lib/session";
import { getServerSession } from "next-auth";
import type { ProtectedPageProps } from "@/types/types";
import { LoginButton, LogoutButton } from "@/components/Buttons";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

const ProtectedRoute = async ({ children }: ProtectedPageProps) => {
    const user = await getCurrentUser();
    
    if (!user) {
        return <>
        <h1>You need to be authenticated to view this page</h1>
        </>;
    }
    
    return (
    <>
    {children}
    </>
    )
};

export default ProtectedRoute;