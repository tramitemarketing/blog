'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import ArticleForm from '@/components/admin/ArticleForm'
import { getArticleBySlug } from '@/lib/firestore'
import type { Article } from '@/types'

export default function ModificaArticoloClient() {
  const params = useParams<{ id: string }>()
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!params.id) return
    getArticleBySlug(params.id)
      .then(setArticle)
      .finally(() => setLoading(false))
  }, [params.id])

  if (loading) {
    return <p className="font-sans text-[11px] uppercase tracking-[4px] text-ghiaccio/30 animate-pulse">Caricamento…</p>
  }

  if (!article) {
    return <p className="font-serif text-ghiaccio/40 italic">Articolo non trovato.</p>
  }

  return (
    <div>
      <h1 className="font-sans font-black text-ghiaccio uppercase tracking-[3px] text-sm mb-10">
        Modifica articolo
      </h1>
      <ArticleForm initialArticle={article} />
    </div>
  )
}
