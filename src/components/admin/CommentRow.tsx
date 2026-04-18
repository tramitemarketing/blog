import type { Comment } from '@/types'

interface CommentRowProps {
  comment: Comment
  onApprove: () => void
  onReject: () => void
}

export default function CommentRow({ comment, onApprove, onReject }: CommentRowProps) {
  return (
    <div className="border border-ghiaccio/10 p-6 flex flex-col gap-3">
      <div className="flex items-center gap-4">
        <span className="font-sans font-bold text-ghiaccio text-sm">{comment.authorName}</span>
        <span className="font-sans text-[10px] uppercase tracking-[3px] text-ghiaccio/30">
          {comment.createdAt.toLocaleDateString('it-IT', {
            day: '2-digit', month: 'long', year: 'numeric'
          })}
        </span>
        <span className="font-sans text-[10px] uppercase tracking-[3px] text-ghiaccio/30">
          Art: {comment.articleId}
        </span>
      </div>
      <p className="font-serif text-ghiaccio/70 leading-relaxed">{comment.text}</p>
      <div className="flex gap-4 mt-2">
        <button
          onClick={onApprove}
          className="font-sans text-[10px] uppercase tracking-[3px] text-oro border border-oro px-4 py-2 hover:bg-oro hover:text-viola-notte transition-colors"
        >
          Approva
        </button>
        <button
          onClick={onReject}
          className="font-sans text-[10px] uppercase tracking-[3px] text-red-400/60 border border-red-400/30 px-4 py-2 hover:bg-red-400/10 transition-colors"
        >
          Elimina
        </button>
      </div>
    </div>
  )
}
