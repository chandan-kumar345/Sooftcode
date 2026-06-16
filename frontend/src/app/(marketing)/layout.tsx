import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-full flex flex-col pt-20">
      <Navbar />
      <main className="flex-grow flex flex-col">{children}</main>
      <Footer />
    </div>
  );
}
