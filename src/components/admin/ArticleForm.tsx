'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import TiptapEditor from './TiptapEditor'
import { saveArticle } from '@/lib/firestore'
import type { Article } from '@/types'

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 80)
}

function generateExcerpt(html: string): string {
  const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  return text.slice(0, 160)
}

function countWords(html: string): number {
  const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  return text ? text.split(' ').length : 0
}

interface ArticleFormProps {
  initialArticle?: Article
}

export default function ArticleForm({ initialArticle }: ArticleFormProps) {
  const router = useRouter()
  const [title, setTitle] = useState(initialArticle?.title ?? '')
  const [content, setContent] = useState(initialArticle?.content ?? '')
  const [coverImageUrl, setCoverImageUrl] = useState(initialArticle?.coverImageUrl ?? '')
  const [status, setStatus] = useState<'published' | 'draft'>(initialArticle?.status ?? 'draft')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function handleSave(newStatus: 'published' | 'draft') {
    if (!title.trim()) { setError('Il titolo è obbligatorio.'); return }
    setError('')
    setSaving(true)
    setStatus(newStatus)

    const slug = initialArticle?.id ?? generateSlug(title)

    try {
      await saveArticle({
        id: slug,
        title: title.trim(),
        content,
        excerpt: generateExcerpt(content),
        coverImageUrl: coverImageUrl.trim() || null,
        publishedAt: initialArticle?.publishedAt ?? new Date(),
        updatedAt: new Date(),
        status: newStatus,
        wordCount: countWords(content),
      })
      router.push('/admin')
    } catch {
      setError('Errore nel salvataggio. Riprova.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Title */}
      <div className="flex flex-col gap-2">
        <label className="font-sans text-[10px] uppercase tracking-[4px] text-ghiaccio/40">
          Titolo *
        </label>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Titolo dell'articolo"
          className="bg-transparent border-b border-ghiaccio/20 py-3 font-sans font-black text-ghiaccio text-2xl placeholder-ghiaccio/20 focus:outline-none focus:border-oro transition-colors"
        />
      </div>

      {/* Cover image URL */}
      <div className="flex flex-col gap-2">
        <label className="font-sans text-[10px] uppercase tracking-[4px] text-ghiaccio/40">
          URL immagine di copertina (opzionale)
        </label>
        <input
          type="url"
          value={coverImageUrl}
          onChange={e => setCoverImageUrl(e.target.value)}
          placeholder="https://i.ibb.co/…"
          className="bg-transparent border-b border-ghiaccio/20 py-3 font-serif text-ghiaccio placeholder-ghiaccio/20 focus:outline-none focus:border-oro transition-colors"
        />
      </div>

      {/* Editor */}
      <div className="flex flex-col gap-2">
        <label className="font-sans text-[10px] uppercase tracking-[4px] text-ghiaccio/40">
          Contenuto
        </label>
        <TiptapEditor content={content} onChange={setContent} />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 flex-wrap">
        <button
          type="button"
          onClick={() => handleSave('published')}
          disabled={saving}
          className="bg-oro text-viola-notte font-sans font-bold text-xs uppercase tracking-widest px-8 py-3 hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {saving ? 'Salvataggio…' : 'Pubblica'}
        </button>
        <button
          type="button"
          onClick={() => handleSave('draft')}
          disabled={saving}
          className="border border-ghiaccio/20 text-ghiaccio/60 font-sans text-xs uppercase tracking-widest px-8 py-3 hover:border-ghiaccio/40 transition-colors disabled:opacity-50"
        >
          Salva bozza
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin')}
          className="font-sans text-[10px] uppercase tracking-[3px] text-ghiaccio/30 hover:text-ghiaccio transition-colors ml-auto"
        >
          Annulla
        </button>
      </div>

      {error && (
        <p className="font-serif text-red-400 italic text-sm">{error}</p>
      )}
    </div>
  )
}
