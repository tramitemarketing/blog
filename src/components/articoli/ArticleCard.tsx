import Link from 'next/link'
import { getReadingTime } from '@/lib/utils'
import type { Article } from '@/types'

interface ArticleCardProps {
  article: Article
  index: number
}

export default function ArticleCard({ article, index }: ArticleCardProps) {
  const readingTime = getReadingTime(article.wordCount)

  return (
    <article className="py-10 grid grid-cols-[4rem_1fr] gap-6 border-b border-ghiaccio/10 last:border-0">
      <span
        className="font-sans font-black text-blu-chiaro/40 leading-none"
        style={{ fontSize: '2.5rem' }}
      >
        {String(index + 1).padStart(2, '0')}
      </span>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-4">
          <p className="font-sans text-[10px] uppercase tracking-[4px] text-ghiaccio/30">
            {article.publishedAt.toLocaleDateString('it-IT', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            })}
          </p>
          <span className="text-ghiaccio/20">·</span>
          <p className="font-sans text-[10px] uppercase tracking-[4px] text-ghiaccio/30">
            {readingTime} min
          </p>
        </div>
        <h2 className="font-sans font-black text-ghiaccio text-xl leading-tight">
          {article.title}
        </h2>
        <p className="font-serif text-ghiaccio/60 leading-relaxed">
          {article.excerpt}
        </p>
        <Link
          href={`/articoli/${article.id}`}
          className="font-sans text-[11px] uppercase tracking-[4px] text-blu-accento hover:opacity-70 transition-opacity mt-2 w-fit"
        >
          Leggi →
        </Link>
      </div>
    </article>
  )
}
