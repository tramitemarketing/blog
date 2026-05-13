interface Env {
  RESEND_API_KEY: string
  RESEND_AUDIENCE_ID?: string
}

export async function onRequestPost(context: { request: Request; env: Env }) {
  const { request, env } = context

  const apiKey = env.RESEND_API_KEY
  if (!apiKey) {
    return Response.json({ error: 'Server non configurato.' }, { status: 500 })
  }

  let body: { email?: string }
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Richiesta non valida.' }, { status: 400 })
  }

  const email = body.email?.trim().toLowerCase()
  if (!email || !email.includes('@') || !email.includes('.')) {
    return Response.json({ error: 'Email non valida.' }, { status: 400 })
  }

  const headers = {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  }

  // Trova o crea l'audience
  let audienceId = env.RESEND_AUDIENCE_ID

  if (!audienceId) {
    // Lista audience esistenti
    const listRes = await fetch('https://api.resend.com/audiences', { headers })
    const listData = await listRes.json() as { data?: { id: string }[] }

    if (listData.data && listData.data.length > 0) {
      audienceId = listData.data[0].id
    } else {
      // Crea una nuova audience
      const createRes = await fetch('https://api.resend.com/audiences', {
        method: 'POST',
        headers,
        body: JSON.stringify({ name: 'Immaginare Newsletter' }),
      })
      const created = await createRes.json() as { id?: string }
      audienceId = created.id
    }
  }

  if (!audienceId) {
    return Response.json({ error: 'Impossibile configurare la newsletter.' }, { status: 500 })
  }

  // Aggiunge il contatto all'audience
  const contactRes = await fetch(
    `https://api.resend.com/audiences/${audienceId}/contacts`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify({ email, unsubscribed: false }),
    }
  )

  if (!contactRes.ok) {
    const err = await contactRes.json() as { name?: string }
    if (err.name === 'contact_already_exists') {
      return Response.json({ success: true })
    }
    return Response.json({ error: 'Errore durante l\'iscrizione.' }, { status: 500 })
  }

  return Response.json({ success: true })
}

// Blocca altri metodi HTTP
export function onRequest() {
  return new Response('Method not allowed', { status: 405 })
}
