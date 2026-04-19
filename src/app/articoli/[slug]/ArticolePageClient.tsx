'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import ArticleBody from '@/components/article/ArticleBody'
import ShareButton from '@/components/article/ShareButton'
import CommentsSection from '@/components/article/CommentsSection'
import { getArticleBySlug } from '@/lib/firestore'
import { getReadingTime } from '@/lib/utils'
import type { Article } from '@/types'
import { useIsMobile } from '@/hooks/useIsMobile'
import MobileArticleHeader from '@/components/articoli/MobileArticleHeader'

export default function ArticolePage() {
  const params = useParams<{ slug: string }>()
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!params.slug) return
    getArticleBySlug(params.slug)
      .then(setArticle)
      .finally(() => setLoading(false))
  }, [params.slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-sans text-[11px] uppercase tracking-[4px] text-ghiaccio/30 animate-pulse">
          Caricamento…
        </p>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <p className="font-serif text-ghiaccio/40 italic">Articolo non trovato.</p>
      </div>
    )
  }

  const readingTime = getReadingTime(article.wordCount)
  const isMobile = useIsMobile()
  const pageUrl = typeof window !== 'undefined' ? window.location.href : ''

  return (
    <>
      {isMobile && (
        <MobileArticleHeader title={article.title} readingTime={readingTime} />
      )}
      <div className="max-w-2xl mx-auto px-6 py-20">
      {/* Meta */}
      <div className="flex items-center gap-4 mb-8">
        <p className="font-sans text-[10px] uppercase tracking-[4px] text-ghiaccio/30">
          {article.publishedAt.toLocaleDateString('it-IT', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          })}
        </p>
        <span className="text-ghiaccio/20">·</span>
        <p className="font-sans text-[10px] uppercase tracking-[4px] text-ghiaccio/30">
          {readingTime} min di lettura
        </p>
      </div>

      {/* Title */}
      <h1 className="font-serif text-ghiaccio leading-tight mb-8"
        style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)' }}>
        {article.title}
      </h1>

      {/* Cover image (optional) */}
      {article.coverImageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={article.coverImageUrl}
          alt=""
          className="w-full aspect-video object-cover mb-12"
        />
      )}

      {/* Body */}
      <ArticleBody html={article.content} />

      {/* Share */}
      <div className="mt-16 pt-8 border-t border-ghiaccio/10">
        <ShareButton title={article.title} url={pageUrl} />
      </div>

      {/* Comments */}
      <CommentsSection articleId={article.id} />
    </div>
    </>
  )
}
