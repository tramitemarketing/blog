export interface Article {
  id: string
  title: string
  content: string      // HTML from Tiptap
  excerpt: string      // first 160 chars, auto-generated
  coverImageUrl: string | null
  publishedAt: Date
  updatedAt: Date
  status: 'published' | 'draft'
  wordCount: number
}

export interface Comment {
  id: string
  articleId: string
  authorName: string
  text: string
  createdAt: Date
  status: 'pending' | 'approved' | 'rejected'
  ip: string           // hashed, for rate limiting
}

export interface Citazione {
  text: string
  reference: string    // e.g. "Giovanni 8,12"
}

export interface Biografia {
  content: string      // HTML from editor
}
