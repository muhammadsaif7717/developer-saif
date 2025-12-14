import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import ActiveProvider from '@/providers/ActiveProvider';
import Navbar from '@/components/shared/Navbar';
import ThemeProvider from '@/providers/ThemeProvider';
import TanstackProvider from '@/providers/TanstackProvider';
import AuthProvider from '@/providers/AuthProvider';
import Footer from '@/components/shared/Footer';
import WhatsAppButton from '@/components/shared/WhatsAppButton';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Developer Saif',
  description:
    'Full-Stack Developer specializing in React, Next.js, and Node.js. Building modern web applications with precision and innovation. Available for freelance projects and collaborations.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <TanstackProvider>
            <ActiveProvider>
              <ThemeProvider>
                <Navbar />
                {children}
                <WhatsAppButton />
                <Footer />
              </ThemeProvider>
            </ActiveProvider>
          </TanstackProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
