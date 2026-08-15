import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './admin.css';
import { AuthProvider } from '@/lib/AuthContext';

export const metadata: Metadata = {
  title: 'Admin | Ridgeline Roofing Co.',
  description: 'Ridgeline Roofing Co. admin dashboard.',
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
