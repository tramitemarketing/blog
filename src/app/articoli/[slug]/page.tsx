import ArticolePageClient from './ArticolePageClient'

// Generate one static shell. Firebase Hosting rewrites all /articoli/*/ URLs
// to this shell. The client reads the actual slug via useParams() from the URL.
export async function generateStaticParams() {
  return [{ slug: 'articolo' }]
}

export default function ArticolePage() {
  return <ArticolePageClient />
}
