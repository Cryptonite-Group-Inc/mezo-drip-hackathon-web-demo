import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DRIP Points Demo | MEZO',
  description: 'A demonstration of DRIP Points integration by MEZO',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <main className="min-h-screen bg-background">
          <div className="container mx-auto py-8">
            <header className="mb-8">
              <h1 className="text-4xl font-bold text-center">DRIP Points Demo</h1>
              <p className="text-center text-muted-foreground mt-2">
                A demonstration of DRIP Points integration by MEZO
              </p>
            </header>
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}