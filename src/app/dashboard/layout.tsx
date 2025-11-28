import DashNav from '@/components/dashboard/DashNav';
import React from 'react';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <DashNav />
      {children}
    </div>
  );
}
