import Link from 'next/link'

export default function BioTeaser() {
  return (
    <section className="bg-blu-marino py-20 px-6">
      <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-12 items-start">
        <div className="flex-1">
          <p className="font-sans text-[10px] uppercase tracking-[4px] text-ghiaccio/30 mb-6">
            Il sacerdote
          </p>
          <p className="font-serif text-ghiaccio/70 text-lg leading-relaxed mb-8">
            Sacerdote e insegnante di religione, scrivo queste riflessioni come
            un tentativo di pensare ad alta voce la fede — in dialogo con la
            filosofia, la teologia e l&apos;esperienza quotidiana.
          </p>
          <Link
            href="/biografia"
            className="font-sans text-[11px] uppercase tracking-[4px] text-blu-accento border-b border-blu-accento pb-1 hover:opacity-70 transition-opacity"
          >
            Leggi la biografia →
          </Link>
        </div>
        <div className="w-full lg:w-64 h-px lg:h-32 bg-blu-accento/15" />
      </div>
    </section>
  )
}
