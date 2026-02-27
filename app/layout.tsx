import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Maaspoort Bingo — Den Bosch',
  description: 'Gezellige bingoavonden in Maaspoort, Den Bosch. Bekijk de agenda, word sponsor en win mooie prijzen!',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body className={`${inter.className} bg-white min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
