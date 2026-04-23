'use client'
import { useState, useEffect } from 'react'
import { getCitazione, saveCitazione, getBiografia, saveBiografia } from '@/lib/firestore'
import TiptapEditor from '@/components/admin/TiptapEditor'

export default function ConfigPage() {
  const [citazioneText, setCitazioneText] = useState('')
  const [citazioneRef, setCitazioneRef] = useState('')
  const [bioContent, setBioContent] = useState('')
  const [bioLoaded, setBioLoaded] = useState(false)
  const [savingCit, setSavingCit] = useState(false)
  const [savingBio, setSavingBio] = useState(false)
  const [citSaved, setCitSaved] = useState(false)
  const [bioSaved, setBioSaved] = useState(false)

  useEffect(() => {
    getCitazione().then(c => {
      if (c) { setCitazioneText(c.text); setCitazioneRef(c.reference) }
    })
    getBiografia().then(b => {
      setBioContent(b?.content ?? '')
      setBioLoaded(true)
    })
  }, [])

  async function handleSaveCitazione() {
    setSavingCit(true)
    await saveCitazione({ text: citazioneText, reference: citazioneRef })
    setSavingCit(false)
    setCitSaved(true)
    setTimeout(() => setCitSaved(false), 3000)
  }

  async function handleSaveBio() {
    setSavingBio(true)
    await saveBiografia({ content: bioContent })
    setSavingBio(false)
    setBioSaved(true)
    setTimeout(() => setBioSaved(false), 3000)
  }

  return (
    <div className="flex flex-col gap-16">
      {/* Citazione del giorno */}
      <section>
        <h2 className="font-sans font-black text-ghiaccio uppercase tracking-[3px] text-sm mb-8">
          Citazione del giorno
        </h2>
        <div className="flex flex-col gap-5 max-w-2xl">
          <div className="flex flex-col gap-2">
            <label className="font-sans text-[10px] uppercase tracking-[4px] text-ghiaccio/40">Testo</label>
            <textarea
              value={citazioneText}
              onChange={e => setCitazioneText(e.target.value)}
              rows={3}
              className="bg-transparent border border-ghiaccio/20 p-3 font-serif text-ghiaccio placeholder-ghiaccio/20 focus:outline-none focus:border-oro transition-colors resize-none"
              placeholder="Testo della citazione…"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-sans text-[10px] uppercase tracking-[4px] text-ghiaccio/40">Riferimento</label>
            <input
              type="text"
              value={citazioneRef}
              onChange={e => setCitazioneRef(e.target.value)}
              placeholder="Giovanni 8,12"
              className="bg-transparent border-b border-ghiaccio/20 py-2 font-serif text-ghiaccio placeholder-ghiaccio/20 focus:outline-none focus:border-oro transition-colors"
            />
          </div>
          <button
            onClick={handleSaveCitazione}
            disabled={savingCit}
            className="self-start bg-oro text-viola-notte font-sans font-bold text-xs uppercase tracking-widest px-8 py-3 hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {savingCit ? 'Salvataggio…' : citSaved ? 'Salvato!' : 'Salva citazione'}
          </button>
        </div>
      </section>

      {/* Biography */}
      <section>
        <h2 className="font-sans font-black text-ghiaccio uppercase tracking-[3px] text-sm mb-8">
          Biografia
        </h2>
        <div className="flex flex-col gap-5 max-w-2xl">
          <div className="flex flex-col gap-2">
            <label className="font-sans text-[10px] uppercase tracking-[4px] text-ghiaccio/40">
              Testo
            </label>
            {bioLoaded ? (
              <TiptapEditor content={bioContent} onChange={setBioContent} />
            ) : (
              <p className="font-sans text-[11px] uppercase tracking-[4px] text-ghiaccio/30 animate-pulse py-4">
                Caricamento…
              </p>
            )}
          </div>
          <button
            onClick={handleSaveBio}
            disabled={savingBio}
            className="self-start bg-oro text-viola-notte font-sans font-bold text-xs uppercase tracking-widest px-8 py-3 hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {savingBio ? 'Salvataggio…' : bioSaved ? 'Salvato!' : 'Salva biografia'}
          </button>
        </div>
      </section>
    </div>
  )
}
