'use client'
import { useState, useEffect } from 'react'

const STORAGE_KEY = 'soglia_cookie_consent'

export function useCookieConsent(): {
  consented: boolean | null
  accept: () => void
  reject: () => void
} {
  const [consented, setConsented] = useState<boolean | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'true') setConsented(true)
    else if (stored === 'false') setConsented(false)
    else setConsented(null)   // not yet decided
  }, [])

  function accept() {
    localStorage.setItem(STORAGE_KEY, 'true')
    setConsented(true)
  }

  function reject() {
    localStorage.setItem(STORAGE_KEY, 'false')
    setConsented(false)
  }

  return { consented, accept, reject }
}
