import type { Metadata } from 'next';
import { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Millerz Technologies | Web, Mobile & Cloud Engineering',
  description: 'Bespoke Next.js 16 Web Apps, iOS & Android Mobile Platforms, Cloud Infrastructure, and AI Quotation Solutions.',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="bg-[#0B0E0C] text-[#F3F5F3] antialiased selection:bg-[#C85223] selection:text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
