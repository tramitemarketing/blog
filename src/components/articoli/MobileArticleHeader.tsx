'use client'
import { useState, useEffect } from 'react'

interface MobileArticleHeaderProps {
  title: string
  readingTime: number
}

export default function MobileArticleHeader({ title, readingTime }: MobileArticleHeaderProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 120)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        background: 'rgba(255,255,255,.07)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(56,189,248,.12)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 16px',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.25s ease',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <p style={{
        fontFamily: 'system-ui, sans-serif',
        fontSize: 11,
        textTransform: 'uppercase',
        letterSpacing: '2px',
        color: 'rgba(240,249,255,.7)',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        flex: 1,
        marginRight: 12,
      }}>
        {title}
      </p>
      <span style={{
        fontFamily: 'system-ui, sans-serif',
        fontSize: 9,
        textTransform: 'uppercase',
        letterSpacing: '2px',
        color: 'rgba(56,189,248,.5)',
        flexShrink: 0,
      }}>
        {readingTime} min
      </span>
    </div>
  )
}
