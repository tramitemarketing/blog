import ModificaArticoloClient from './ModificaArticoloClient'

export async function generateStaticParams() {
  return [{ id: 'placeholder' }]
}

export default function ModificaArticoloPage() {
  return <ModificaArticoloClient />
}
