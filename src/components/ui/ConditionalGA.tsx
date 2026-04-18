'use client'
import { GoogleAnalytics } from '@next/third-parties/google'
import { useCookieConsent } from '@/hooks/useCookieConsent'

export default function ConditionalGA({ measurementId }: { measurementId: string }) {
  const { consented } = useCookieConsent()
  if (!consented || !measurementId) return null
  return <GoogleAnalytics gaId={measurementId} />
}
