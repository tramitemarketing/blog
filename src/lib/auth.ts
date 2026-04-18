import {
  getAuth, signInWithEmailAndPassword, signInWithPopup,
  GoogleAuthProvider, signOut as firebaseSignOut,
  onAuthStateChanged, User,
} from 'firebase/auth'
import { firebaseApp } from './firebase'

// Lazy initialisation — avoids calling getAuth() at module-evaluation time,
// which would throw during Next.js static export when env vars are absent.
function getFirebaseAuth() {
  return getAuth(firebaseApp)
}

const googleProvider = new GoogleAuthProvider()

export async function signInEmail(email: string, password: string): Promise<void> {
  await signInWithEmailAndPassword(getFirebaseAuth(), email, password)
}

export async function signInGoogle(): Promise<void> {
  await signInWithPopup(getFirebaseAuth(), googleProvider)
}

export async function signOut(): Promise<void> {
  await firebaseSignOut(getFirebaseAuth())
}

export function onAuthChange(callback: (user: User | null) => void): () => void {
  return onAuthStateChanged(getFirebaseAuth(), callback)
}

export function getCurrentUser(): User | null {
  return getFirebaseAuth().currentUser
}
