// pages/index.jsx
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const ChartCard = dynamic(() => import('../components/ChartCard'), { ssr: false });

export default function Home() {
  const [nodes, setNodes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetch('/api/pnodes');
        const json = await res.json();
        if (!json.success) {
          setError(json.error || 'Failed to load');
          setNodes(null);
        } else {
          setNodes(json.nodes || []);
        }
      } catch (err) {
        setError(String(err.message || err));
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold">Xandeum pNodes — Analytics</h1>
          <p className="text-sm text-slate-600">
            Exibe pNodes descobertos via pRPC. Configure <code>P_RPC_URL</code> nas variáveis de ambiente.
          </p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="lg:col-span-2">
            <div className="bg-white rounded shadow p-4">
              <h2 className="text-lg font-medium mb-2">Lista de pNodes</h2>

              {loading && <div className="p-4">Carregando pNodes…</div>}
