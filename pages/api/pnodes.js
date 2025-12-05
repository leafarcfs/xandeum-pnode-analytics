// pages/api/pnodes.ts
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  success: boolean
  nodes?: any[]
  error?: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const PRPC_URL = process.env.P_RPC_URL // configure in Vercel or .env.local
  if (!PRPC_URL) {
    res.status(500).json({ success: false, error: 'P_RPC_URL not set in environment' })
    return
  }

  try {
    const prpcResponse = await fetch(PRPC_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        // method is a placeholder. Replace with the real pRPC method from Xandeum docs if different.
        method: 'gossip_get_pnodes',
        params: []
      })
    })

    if (!prpcResponse.ok) {
      const text = await prpcResponse.text()
      res.status(502).json({ success: false, error: `pRPC responded ${prpcResponse.status}: ${text}` })
      return
    }

    const json = await prpcResponse.json()
    const nodes = json.result?.nodes ?? json.nodes ?? json
    res.status(200).json({ success: true, nodes })
  } catch (err: any) {
    res.status(500).json({ success: false, error: String(err.message || err) })
  }
}
