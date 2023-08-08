import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { getCurrentUser } from '@/lib/session';
import { userIsHost } from '@/lib/account';
import Navbar from '@/components/layout/Navbar';
import Padding from '@/components/layout/Padding';
import { ThemeProvider } from '@/lib/providers/theme';
import AuthProvider from '@/lib/auth/providers';
import ScreenContainer from '@/components/Formatting/Container';

const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const user = await getCurrentUser();
    return (
        <html lang="en">
            <body className={montserrat.className}>
                <AuthProvider>
                    <ThemeProvider>
                        <Navbar isAuthenticated={!!user} user={user} />
                        <ScreenContainer>{children}</ScreenContainer>
                    </ThemeProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
