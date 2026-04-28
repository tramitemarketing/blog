'use client'
import { useState, useEffect } from 'react'
import HeroSection from '@/components/home/HeroSection'
import LatestArticles from '@/components/home/LatestArticles'
import BioTeaser from '@/components/home/BioTeaser'
import BrevoWidget from '@/components/home/BrevoWidget'
import { getPublishedArticles, getCitazione } from '@/lib/firestore'
import type { Article, Citazione } from '@/types'
import ArticleCarousel from '@/components/home/ArticleCarousel'
import { useIsMobile } from '@/hooks/useIsMobile'

export default function HomePage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [citazione, setCitazione] = useState<Citazione | null>(null)
  const [loading, setLoading] = useState(true)
  const isMobile = useIsMobile()

  useEffect(() => {
    Promise.all([getPublishedArticles(), getCitazione()])
      .then(([arts, cit]) => {
        setArticles(arts)
        setCitazione(cit)
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <HeroSection featuredArticle={articles[0] ?? null} citazione={citazione} />

      {isMobile ? (
        <ArticleCarousel articles={articles} loading={loading} />
      ) : (
        <LatestArticles articles={articles.slice(0, 5)} loading={loading} />
      )}

      <BioTeaser />
      <BrevoWidget />
    </>
  )
}
