import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ResQ-AI | Disaster Response Intelligence Platform',
  description: 'AI + GIS + IoT Driven Next-Generation Disaster Command & Control System for NDMA, SDRF, NDRF and Public Safety.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-dark-900 text-slate-100 font-sans antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
