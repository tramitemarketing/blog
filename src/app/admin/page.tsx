'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getAllArticles, deleteArticle, saveArticle } from '@/lib/firestore'
import type { Article } from '@/types'

export default function AdminPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  async function load() {
    setLoading(true)
    getAllArticles().then(setArticles).finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  async function handleDelete(id: string) {
    if (!confirm('Eliminare questo articolo?')) return
    await deleteArticle(id)
    load()
  }

  async function handleToggleStatus(article: Article) {
    const newStatus = article.status === 'published' ? 'draft' : 'published'
    await saveArticle({ ...article, status: newStatus })
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <h1 className="font-sans font-black text-ghiaccio uppercase tracking-[3px] text-sm">
          Articoli
        </h1>
        <Link
          href="/admin/articoli/nuovo"
          className="bg-oro text-viola-notte font-sans font-bold text-xs uppercase tracking-widest px-6 py-3 hover:opacity-90 transition-opacity"
        >
          + Nuovo
        </Link>
      </div>

      {loading ? (
        <p className="font-sans text-[11px] uppercase tracking-[4px] text-ghiaccio/30 animate-pulse">Caricamento…</p>
      ) : articles.length === 0 ? (
        <p className="font-serif text-ghiaccio/40 italic">Nessun articolo. Creane uno.</p>
      ) : (
        <table className="w-full">
          <thead>
            <tr className="border-b border-ghiaccio/10">
              <th className="text-left font-sans text-[10px] uppercase tracking-[3px] text-ghiaccio/30 pb-4 pr-4">Titolo</th>
              <th className="text-left font-sans text-[10px] uppercase tracking-[3px] text-ghiaccio/30 pb-4 pr-4">Data</th>
              <th className="text-left font-sans text-[10px] uppercase tracking-[3px] text-ghiaccio/30 pb-4 pr-4">Stato</th>
              <th className="text-left font-sans text-[10px] uppercase tracking-[3px] text-ghiaccio/30 pb-4">Azioni</th>
            </tr>
          </thead>
          <tbody>
            {articles.map(article => (
              <tr key={article.id} className="border-b border-ghiaccio/5 hover:bg-viola-vivace/5 transition-colors">
                <td className="py-4 pr-4 font-serif text-ghiaccio">{article.title}</td>
                <td className="py-4 pr-4 font-sans text-[10px] uppercase tracking-[3px] text-ghiaccio/40">
                  {article.publishedAt.toLocaleDateString('it-IT')}
                </td>
                <td className="py-4 pr-4">
                  <span className={`font-sans text-[10px] uppercase tracking-[3px] px-2 py-1 ${
                    article.status === 'published'
                      ? 'bg-oro/20 text-oro'
                      : 'bg-ghiaccio/10 text-ghiaccio/40'
                  }`}>
                    {article.status === 'published' ? 'Pubblicato' : 'Bozza'}
                  </span>
                </td>
                <td className="py-4">
                  <div className="flex items-center gap-4">
                    <Link
                      href={`/admin/articoli/${article.id}`}
                      className="font-sans text-[10px] uppercase tracking-[3px] text-ghiaccio/50 hover:text-oro transition-colors"
                    >
                      Modifica
                    </Link>
                    <button
                      onClick={() => handleToggleStatus(article)}
                      className="font-sans text-[10px] uppercase tracking-[3px] text-ghiaccio/50 hover:text-oro transition-colors"
                    >
                      {article.status === 'published' ? 'Bozza' : 'Pubblica'}
                    </button>
                    <button
                      onClick={() => handleDelete(article.id)}
                      className="font-sans text-[10px] uppercase tracking-[3px] text-red-400/60 hover:text-red-400 transition-colors"
                    >
                      Elimina
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
