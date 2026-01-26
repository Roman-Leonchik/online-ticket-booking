import React from 'react';
import type { Metadata } from 'next';
import { Navbar } from '@widgets/navbar/ui/Navbar';
import './globals.css';

export const metadata: Metadata = {
  title: {
    template: '%s | CinemaBooking',
    default: 'CinemaBooking — онлайн билеты',
  },
  description: 'Платформа для бронирования билетов в кино',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="bg-background text-foreground flex min-h-screen antialiased">
        <aside className="sticky top-0 h-screen w-64 border-r">
          <Navbar />
        </aside>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </body>
    </html>
  );
}
