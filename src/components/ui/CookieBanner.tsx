'use client'
import { useCookieConsent } from '@/hooks/useCookieConsent'

export default function CookieBanner() {
  const { consented, accept, reject } = useCookieConsent()

  // null = not yet decided; show banner
  if (consented !== null) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/60 p-4">
      <div className="bg-viola-profondo border border-viola-vivace max-w-lg w-full rounded-sm p-8">
        <h2 className="font-sans font-black text-ghiaccio uppercase tracking-[3px] text-sm mb-4">
          Cookie & Privacy
        </h2>
        <p className="font-serif text-ghiaccio/80 text-sm leading-relaxed mb-6">
          Questo sito usa Google Analytics per misurare le visite. I cookie
          analytics vengono attivati solo con il tuo consenso, in conformità
          al GDPR e alla normativa italiana sulla privacy.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={accept}
            className="flex-1 bg-oro text-viola-notte font-sans font-bold text-xs uppercase tracking-[4px] py-3 px-6 hover:opacity-90 transition-opacity"
          >
            Accetto
          </button>
          <button
            onClick={reject}
            className="flex-1 border border-ghiaccio/30 text-ghiaccio/60 font-sans text-xs uppercase tracking-[4px] py-3 px-6 hover:border-ghiaccio/60 transition-colors"
          >
            Rifiuto
          </button>
        </div>
      </div>
    </div>
  )
}
