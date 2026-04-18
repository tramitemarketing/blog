export default function BrevoWidget() {
  return (
    <section className="bg-blu-notte border-t border-blu-accento/10 py-16 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <p className="font-sans text-[10px] uppercase tracking-[4px] text-ghiaccio/30 mb-6">
          Newsletter
        </p>
        <h2 className="font-sans font-black text-ghiaccio uppercase tracking-[-1px] text-2xl mb-4">
          Ricevi le riflessioni
        </h2>
        <p className="font-serif text-ghiaccio/60 leading-relaxed mb-8">
          Una volta alla settimana, direttamente nella tua casella.
        </p>
        {/*
          BREVO EMBED: Replace this comment block with the Brevo subscription
          form embed code from your Brevo account dashboard.
          Go to: Brevo → Contacts → Forms → Create a form → Get embed code
          Paste the <script> or <iframe> tag here.
        */}
        <div className="border border-blu-accento/20 rounded-sm p-8 font-sans text-[11px] uppercase tracking-widest text-ghiaccio/30">
          [Widget Brevo — da configurare]
        </div>
      </div>
    </section>
  )
}
