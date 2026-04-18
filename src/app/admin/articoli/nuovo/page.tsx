import ArticleForm from '@/components/admin/ArticleForm'

export default function NuovoArticoloPage() {
  return (
    <div>
      <h1 className="font-sans font-black text-ghiaccio uppercase tracking-[3px] text-sm mb-10">
        Nuovo articolo
      </h1>
      <ArticleForm />
    </div>
  )
}
