import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SearchOverlay from '@/components/layout/SearchOverlay'
import CookieBanner from '@/components/ui/CookieBanner'
import ConditionalGA from '@/components/ui/ConditionalGA'

export const metadata: Metadata = {
  title: 'SOGLIA — Riflessioni di un sacerdote',
  description:
    'Un blog di riflessioni filosofiche, teologiche ed esistenziali scritto da un sacerdote.',
  icons: { icon: '/favicon.svg' },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it">
      <body className="bg-blu-notte text-ghiaccio min-h-screen flex flex-col">
        <CookieBanner />
        <ConditionalGA measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? ''} />
        <Navbar />
        <SearchOverlay />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
