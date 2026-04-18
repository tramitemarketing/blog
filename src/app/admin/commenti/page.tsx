'use client'
import { useState, useEffect } from 'react'
import CommentRow from '@/components/admin/CommentRow'
import { getPendingComments, updateCommentStatus } from '@/lib/firestore'
import type { Comment } from '@/types'

export default function CommentiPage() {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)

  async function load() {
    setLoading(true)
    getPendingComments().then(setComments).finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  async function handleApprove(id: string) {
    await updateCommentStatus(id, 'approved')
    load()
  }

  async function handleReject(id: string) {
    await updateCommentStatus(id, 'rejected')
    load()
  }

  return (
    <div>
      <h1 className="font-sans font-black text-ghiaccio uppercase tracking-[3px] text-sm mb-10">
        Commenti in attesa
      </h1>

      {loading ? (
        <p className="font-sans text-[11px] uppercase tracking-[4px] text-ghiaccio/30 animate-pulse">Caricamento…</p>
      ) : comments.length === 0 ? (
        <p className="font-serif text-ghiaccio/40 italic">Nessun commento in attesa.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {comments.map(comment => (
            <CommentRow
              key={comment.id}
              comment={comment}
              onApprove={() => handleApprove(comment.id)}
              onReject={() => handleReject(comment.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
