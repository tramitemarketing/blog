'use client'
import { useState, useEffect } from 'react'
import { getApprovedComments, submitComment } from '@/lib/firestore'
import type { Comment } from '@/types'

interface CommentsSectionProps {
  articleId: string
}

export default function CommentsSection({ articleId }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const [honeypot, setHoneypot] = useState('') // must stay empty
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  useEffect(() => {
    getApprovedComments(articleId).then(setComments)
  }, [articleId])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (honeypot) return // bot detected silently
    if (!name.trim() || !text.trim()) return

    setStatus('sending')
    try {
      await submitComment({
        articleId,
        authorName: name.trim(),
        text: text.trim(),
        ip: '',
      })
      setStatus('sent')
      setName('')
      setText('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="mt-20 pt-8 border-t border-[rgba(17,41,107,0.12)]">
      <h2 className="font-sans font-black text-[#11296b] uppercase tracking-[3px] text-sm mb-10">
        Commenti
      </h2>

      {/* Approved comments */}
      {comments.length === 0 ? (
        <p className="font-serif text-[rgba(17,41,107,0.4)] italic mb-12">
          Nessun commento ancora. Sii il primo.
        </p>
      ) : (
        <div className="space-y-8 mb-16">
          {comments.map(comment => (
            <div key={comment.id} className="flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <span className="font-sans font-bold text-[#11296b] text-sm">
                  {comment.authorName}
                </span>
                <span className="font-sans text-[10px] uppercase tracking-[3px] text-[rgba(17,41,107,0.4)]">
                  {comment.createdAt.toLocaleDateString('it-IT', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <p className="font-serif text-[rgba(17,41,107,0.75)] leading-relaxed">
                {comment.text}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Submission form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <h3 className="font-sans text-[11px] uppercase tracking-[4px] text-[rgba(17,41,107,0.45)]">
          Lascia un commento
        </h3>

        {/* Honeypot — hidden from users, visible to bots */}
        <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px' }}>
          <label htmlFor="website">Sito web</label>
          <input
            id="website"
            type="text"
            value={honeypot}
            onChange={e => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-sans text-[10px] uppercase tracking-[4px] text-[rgba(17,41,107,0.45)]" htmlFor="comment-name">
            Nome
          </label>
          <input
            id="comment-name"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            maxLength={100}
            className="bg-transparent border-b border-[rgba(17,41,107,0.2)] py-2 font-serif text-[#11296b] placeholder-[rgba(17,41,107,0.3)] focus:outline-none focus:border-[#ffcb05] transition-colors"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-sans text-[10px] uppercase tracking-[4px] text-[rgba(17,41,107,0.45)]" htmlFor="comment-text">
            Commento
          </label>
          <textarea
            id="comment-text"
            value={text}
            onChange={e => setText(e.target.value)}
            required
            maxLength={2000}
            rows={4}
            className="bg-transparent border border-[rgba(17,41,107,0.2)] p-3 font-serif text-[#11296b] placeholder-[rgba(17,41,107,0.3)] focus:outline-none focus:border-[#ffcb05] transition-colors resize-none"
          />
        </div>

        {status === 'sent' ? (
          <p className="font-serif text-[rgba(17,41,107,0.65)] italic">
            Grazie! Il tuo commento è in attesa di approvazione.
          </p>
        ) : (
          <button
            type="submit"
            disabled={status === 'sending'}
            className="self-start bg-oro text-viola-notte font-sans font-bold text-xs uppercase tracking-widest px-8 py-3 hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {status === 'sending' ? 'Invio…' : 'Invia commento'}
          </button>
        )}

        {status === 'error' && (
          <p className="font-serif text-red-400 italic text-sm">
            Errore durante l&apos;invio. Riprova.
          </p>
        )}
      </form>
    </section>
  )
}
