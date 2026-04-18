export default function Footer() {
  return (
    <footer className="bg-blu-marino border-t border-blu-accento/10 py-8 mt-16">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-sans text-[10px] uppercase tracking-[4px] text-ghiaccio/40">
          SOGLIA · Riflessioni di un sacerdote
        </p>
        <a
          href="https://tramite-marketing.pages.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="font-sans text-[10px] uppercase tracking-[4px] text-blu-chiaro/50 hover:text-blu-chiaro transition-colors"
        >
          TramiteMarketing
        </a>
      </div>
    </footer>
  )
}
