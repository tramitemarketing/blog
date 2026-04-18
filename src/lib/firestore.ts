import {
  getFirestore, collection, doc, getDocs, getDoc,
  addDoc, setDoc, updateDoc, deleteDoc, query, where,
  orderBy, Timestamp, DocumentData,
} from 'firebase/firestore'
import { firebaseApp } from './firebase'
import type { Article, Comment, Citazione, Biografia } from '@/types'

const db = getFirestore(firebaseApp)

function toDate(ts: Timestamp | Date): Date {
  return ts instanceof Timestamp ? ts.toDate() : ts
}

function docToArticle(id: string, data: DocumentData): Article {
  return {
    id,
    title: data.title,
    content: data.content,
    excerpt: data.excerpt,
    coverImageUrl: data.coverImageUrl ?? null,
    publishedAt: toDate(data.publishedAt),
    updatedAt: toDate(data.updatedAt),
    status: data.status,
    wordCount: data.wordCount,
  }
}

let publishedArticlesCache: Article[] | null = null

export async function getPublishedArticles(): Promise<Article[]> {
  if (publishedArticlesCache) return publishedArticlesCache
  const q = query(
    collection(db, 'articles'),
    where('status', '==', 'published'),
    orderBy('publishedAt', 'desc')
  )
  const snap = await getDocs(q)
  publishedArticlesCache = snap.docs.map(d => docToArticle(d.id, d.data()))
  return publishedArticlesCache
}

export function invalidateArticlesCache(): void {
  publishedArticlesCache = null
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const docRef = doc(db, 'articles', slug)
  const snap = await getDoc(docRef)
  if (!snap.exists()) return null
  return docToArticle(snap.id, snap.data())
}

export async function getAllArticles(): Promise<Article[]> {
  const q = query(collection(db, 'articles'), orderBy('publishedAt', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map(d => docToArticle(d.id, d.data()))
}

export async function saveArticle(
  article: Omit<Article, 'id'> & { id?: string }
): Promise<string> {
  const now = Timestamp.now()
  const data = {
    title: article.title,
    content: article.content,
    excerpt: article.excerpt,
    coverImageUrl: article.coverImageUrl,
    publishedAt: article.id ? Timestamp.fromDate(article.publishedAt) : now,
    updatedAt: now,
    status: article.status,
    wordCount: article.wordCount,
  }
  if (article.id) {
    await setDoc(doc(db, 'articles', article.id), data)
    return article.id
  }
  const ref = await addDoc(collection(db, 'articles'), data)
  return ref.id
}

export async function deleteArticle(id: string): Promise<void> {
  await deleteDoc(doc(db, 'articles', id))
}

export async function getApprovedComments(articleId: string): Promise<Comment[]> {
  const q = query(
    collection(db, 'comments'),
    where('articleId', '==', articleId),
    where('status', '==', 'approved'),
    orderBy('createdAt', 'asc')
  )
  const snap = await getDocs(q)
  return snap.docs.map(d => ({
    id: d.id,
    articleId: d.data().articleId,
    authorName: d.data().authorName,
    text: d.data().text,
    createdAt: toDate(d.data().createdAt),
    status: d.data().status,
    ip: d.data().ip,
  }))
}

export async function getPendingComments(): Promise<Comment[]> {
  const q = query(
    collection(db, 'comments'),
    where('status', '==', 'pending'),
    orderBy('createdAt', 'asc')
  )
  const snap = await getDocs(q)
  return snap.docs.map(d => ({
    id: d.id,
    articleId: d.data().articleId,
    authorName: d.data().authorName,
    text: d.data().text,
    createdAt: toDate(d.data().createdAt),
    status: d.data().status,
    ip: d.data().ip,
  }))
}

export async function submitComment(
  comment: Omit<Comment, 'id' | 'createdAt' | 'status'>
): Promise<void> {
  await addDoc(collection(db, 'comments'), {
    ...comment,
    status: 'pending',
    createdAt: Timestamp.now(),
  })
}

export async function updateCommentStatus(
  id: string,
  status: 'approved' | 'rejected'
): Promise<void> {
  await updateDoc(doc(db, 'comments', id), { status })
}

export async function getCitazione(): Promise<Citazione | null> {
  const snap = await getDoc(doc(db, 'config', 'citazione'))
  if (!snap.exists()) return null
  const data = snap.data()
  return { text: data.text as string, reference: data.reference as string }
}

export async function saveCitazione(citazione: Citazione): Promise<void> {
  await setDoc(doc(db, 'config', 'citazione'), citazione)
}

export async function getBiografia(): Promise<Biografia | null> {
  const snap = await getDoc(doc(db, 'config', 'biografia'))
  if (!snap.exists()) return null
  const data = snap.data()
  return { content: data.content as string }
}

export async function saveBiografia(biografia: Biografia): Promise<void> {
  await setDoc(doc(db, 'config', 'biografia'), biografia)
}
