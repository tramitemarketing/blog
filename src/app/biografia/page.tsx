'use client'
import { useState, useEffect } from 'react'
import { getBiografia } from '@/lib/firestore'
import type { Biografia } from '@/types'

export default function BiografiaPage() {
  const [bio, setBio] = useState<Biografia | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getBiografia()
      .then(setBio)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="max-w-2xl mx-auto px-6 py-20">
      <p className="font-sans text-[10px] uppercase tracking-[4px] text-ghiaccio/30 mb-6">
        Il sacerdote
      </p>
      <h1
        className="font-sans font-black text-ghiaccio uppercase mb-16"
        style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', letterSpacing: '-2px' }}
      >
        Biografia
      </h1>

      {loading ? (
        <p className="font-sans text-[11px] uppercase tracking-[4px] text-ghiaccio/30 animate-pulse">
          Caricamento…
        </p>
      ) : bio?.content ? (
        <div
          className="article-body font-serif text-ghiaccio/80 leading-[1.85] text-[17px]"
          dangerouslySetInnerHTML={{ __html: bio.content }}
        />
      ) : (
        <div className="space-y-6">
          <p className="font-serif text-ghiaccio/60 leading-[1.85] text-[17px]">
            Sacerdote e insegnante di religione, scrivo queste riflessioni come
            un tentativo di pensare ad alta voce la fede — in dialogo con la
            filosofia, la teologia e l&apos;esperienza quotidiana.
          </p>
          <blockquote className="border-l-4 border-oro pl-6 font-serif italic text-ghiaccio text-xl leading-relaxed">
            &ldquo;Il confine tra il sacro e il quotidiano è sottile — e spesso
            è proprio lì che accade qualcosa di vero.&rdquo;
          </blockquote>
          <p className="font-sans text-[11px] uppercase tracking-[4px] text-ghiaccio/30">
            [Placeholder — da completare tramite il pannello admin]
          </p>
        </div>
      )}
    </div>
  )
}
