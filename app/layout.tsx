/**
 * Root Layout Component
 * 
 * Provides the Redux store and global layout structure.
 * Sets up RTL support and global styles.
 */

import type { Metadata } from 'next';
import { Inter, Playfair_Display, Open_Sans } from 'next/font/google';
import { Providers } from './providers';
import './globals.scss';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-body',
});
const script = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-script',
});

export const metadata: Metadata = {
  title: 'Content Planner - Manage Content Strategy',
  description: 'A comprehensive content planning and scheduling application for freelancers',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr">
      <body className={`${openSans.className} ${script.variable} ${inter.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

