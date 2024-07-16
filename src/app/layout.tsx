import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import { Poppins } from "next/font/google";
import Navbar from '@/components/navbar';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});


export const metadata: Metadata = {
  title: 'Fake Store Api',
  description: 'Users data from fake store api',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <link rel="icon" href="/logo.svg" sizes="any" />
      <body className={`${poppins.className} px-normal lg:px-normal`}>
        <Providers>
        <Navbar />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
