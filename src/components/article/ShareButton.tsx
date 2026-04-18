'use client'
import { useState } from 'react'

interface ShareButtonProps {
  title: string
  url: string
}

export default function ShareButton({ title, url }: ShareButtonProps) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  async function handleShare() {
    if (navigator.share) {
      try {
        await navigator.share({ title, url })
      } catch {
        // user cancelled — ignore
      }
      return
    }
    setOpen(o => !o)
  }

  async function copyLink() {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    setOpen(false)
  }

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`
  const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`

  const btnBase = 'flex items-center gap-3 px-5 py-3 font-sans text-[11px] uppercase tracking-[3px] text-ghiaccio/70 hover:text-oro hover:bg-viola-vivace/10 transition-colors'

  return (
    <div className="relative inline-block">
      <button
        onClick={handleShare}
        aria-label="Condividi articolo"
        className="flex items-center gap-2 font-sans text-[11px] uppercase tracking-[4px] text-ghiaccio/60 border border-ghiaccio/20 px-5 py-2.5 hover:border-oro hover:text-oro transition-colors"
      >
        {/* Share icon SVG */}
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <circle cx="11" cy="2.5" r="1.5" stroke="currentColor" strokeWidth="1.2"/>
          <circle cx="11" cy="11.5" r="1.5" stroke="currentColor" strokeWidth="1.2"/>
          <circle cx="3" cy="7" r="1.5" stroke="currentColor" strokeWidth="1.2"/>
          <line x1="4.3" y1="6.2" x2="9.7" y2="3.3" stroke="currentColor" strokeWidth="1.2"/>
          <line x1="4.3" y1="7.8" x2="9.7" y2="10.7" stroke="currentColor" strokeWidth="1.2"/>
        </svg>
        Condividi
      </button>

      {open && (
        <div className="absolute bottom-full mb-2 left-0 bg-viola-profondo border border-viola-vivace/30 min-w-[180px] z-10">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={btnBase}
          >
            WhatsApp
          </a>
          <a
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${btnBase} border-t border-viola-vivace/10`}
          >
            Telegram
          </a>
          <button
            onClick={copyLink}
            className={`${btnBase} w-full border-t border-viola-vivace/10`}
          >
            {copied ? 'Copiato!' : 'Copia link'}
          </button>
        </div>
      )}
    </div>
  )
}
