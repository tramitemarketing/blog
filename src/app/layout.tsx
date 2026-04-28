import type { Metadata } from 'next'
import './globals.css'
import NavbarWrapper from '@/components/layout/NavbarWrapper'
import Footer from '@/components/layout/Footer'
import SearchWrapper from '@/components/layout/SearchWrapper'
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
      <body className="bg-paper text-ink min-h-screen flex flex-col">
        <CookieBanner />
        <ConditionalGA measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? ''} />
        <NavbarWrapper />
        <SearchWrapper />
        <main className="flex-1 pb-24 md:pb-0">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
