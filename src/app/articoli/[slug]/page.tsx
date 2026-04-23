import { getPublishedArticles } from '@/lib/firestore'
import ArticolePageClient from './ArticolePageClient'

// Pre-generate a static page + RSC payload for every published article.
// Firebase Hosting rewrite (/articoli/*/) handles new articles published
// after the last build by serving the 'articolo' fallback shell.
export async function generateStaticParams() {
  try {
    const articles = await getPublishedArticles()
    const slugs = articles.map(a => ({ slug: a.id }))
    if (!slugs.find(s => s.slug === 'articolo')) {
      slugs.push({ slug: 'articolo' })
    }
    return slugs
  } catch {
    return [{ slug: 'articolo' }]
  }
}

export default function ArticolePage() {
  return <ArticolePageClient />
}
