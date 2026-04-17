import type { Metadata } from 'next'
import { Fredoka, Nunito } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from '@/components/ui/sonner'
import { Navbar } from '@/components/navbar'
import './globals.css'

const fredoka = Fredoka({ subsets: ["latin"], variable: '--font-fredoka' });
const nunito = Nunito({ subsets: ["latin"], variable: '--font-nunito' });

export const metadata: Metadata = {
  title: 'Stormalong Shop - The Marvelous Misadventures of Flapjack',
  description: 'Welcome to Stormalong Harbor! Shop for adventure gear, candy, and collectibles from The Marvelous Misadventures of Flapjack.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${fredoka.variable} ${nunito.variable} bg-background`}>
      <body className="font-sans antialiased min-h-screen">
        <Navbar />
        <main>{children}</main>
        <Toaster />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
