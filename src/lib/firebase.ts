import { initializeApp, getApps } from 'firebase/app'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

const missingKeys = (Object.entries(firebaseConfig) as [string, string | undefined][])
  .filter(([, value]) => !value)
  .map(([key]) => key)

if (missingKeys.length > 0) {
  console.warn(
    `[SOGLIA] Missing Firebase config: ${missingKeys.join(', ')}. ` +
    `Set these in .env.local (see .env.local.example)`
  )
}

export const firebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
