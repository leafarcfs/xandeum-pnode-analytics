// pages/index.tsx
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

const ChartCard = dynamic(() => import('../components/ChartCard'), { ssr: false })

type PNode = {
  pubkey?: string
  gossip_addr?: string
  version?: string
  status?: string
  [k: string]: any
}

export default function Home() {
  const [nodes, setNodes] = useState<PNode[]|null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string| null>(null)

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const res = await fetch('/api/pnodes')
        const json = await res.json()
        if (!json.success) {
          setError(json.error || 'Failed to load')
          setNodes(null)
        } else {
          setNodes(json.nodes || [])
        }
      } catch (err: any) {
        setError(String(err.message || err))
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold">Xandeum pNodes — Analytics</h1>
          <p className="text-sm text-slate-600">Exibe pNodes descobertos via pRPC. Configure <code>P_RPC_URL</code> nas variáveis de ambiente.</p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="lg:col-span-2">
            <div className="bg-white rounded shadow p-4">
              <h2 className="text-lg font-medium mb-2">Lista de pNodes</h2>
              {loading && <div className="p-4">Carregando pNodes…</div>}
              {error && <div className="p-4 text-red-600">Erro: {error}</div>}
              {nodes && (
                <div className="overflow-auto max-h-[60vh]">
                  <table className="w-full table-auto">
                    <thead className="bg-slate-50 sticky top-0">
                      <tr className="text-left text-sm text-slate-700">
                        <th className="px-3 py-2">Pubkey</th>
                        <th className="px-3 py-2">Gossip Addr</th>
                        <th className="px-3 py-2">Version</th>
                        <th className="px-3 py-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {nodes.length === 0 && (
                        <tr><td colSpan={4} className="px-4 py-6 text-sm text-slate-500">Nenhum pNode retornado.</td></tr>
                      )}
                      {nodes.map((n: any, idx: number) => (
                        <tr key={idx} className="border-t">
                          <td className="px-3 py-2 text-sm">{n.pubkey ?? n.id ?? '—'}</td>
                          <td className="px-3 py-2 text-sm">{n.gossip_addr ?? n.gossip ?? '—'}</td>
                          <td className="px-3 py-2 text-sm">{n.version ?? n.software_version ?? '—'}</td>
                          <td className="px-3 py-2 text-sm">{n.status ?? (n.heartbeat ? 'alive' : '—')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>

          <aside>
            <ChartCard data={nodes ?? []} />
            <div className="mt-4 p-4 bg-white rounded shadow">
              <h3 className="text-sm font-medium">Sobre</h3>
              <p className="text-sm text-slate-600 mt-2">
                Dashboard simples que lista pNodes via pRPC. Substitua <code>P_RPC_URL</code> pela URL correta no Vercel.
              </p>
            </div>
          </aside>
        </main>

        <footer className="mt-6 text-sm text-slate-500">
          Feito para o bounty Xandeum — peça para eu ajustar o pRPC caso necessário.
        </footer>
      </div>
    </div>
  )
}
