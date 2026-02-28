import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Maaspoort Bingo — Den Bosch',
  description:
    'Maaspoort Bingo organiseert gezellige bingo-avonden in Den Bosch. De opbrengst gaat naar lokale goede doelen.',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body className={`${inter.className} min-h-screen`}>{children}</body>
    </html>
  );
}
