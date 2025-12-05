'use client'
import { useEffect, useRef } from 'react'
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js'

Chart.register(ArcElement, Tooltip, Legend)

export default function ChartCard({ data }:{data:any[]}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return
    const ctx = canvasRef.current.getContext('2d')
    if (!ctx) return

    // build simple distribution by version (fallback)
    const counts: Record<string,number> = {}
    data.forEach((n:any) => {
      const v = n.version ?? n.software_version ?? 'unknown'
      counts[v] = (counts[v]||0) + 1
    })
    const labels = Object.keys(counts)
    const values = labels.map(l=>counts[l])

    const chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels,
        datasets: [{
          label: 'Versões',
          data: values,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    })

    return () => chart.destroy()
  }, [data])

  return (
    <div className="p-4 bg-white rounded shadow">
      <h3 className="text-sm font-medium mb-2">Distribuição por versão</h3>
      <div style={{height:260}}>
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  )
}
