import { useEffect, useRef } from 'react';
import { Chart, PieController, ArcElement, Tooltip, Legend } from 'chart.js';

// Registrando explicitamente o PieController
Chart.register(PieController, ArcElement, Tooltip, Legend);


Chart.register(ArcElement, Tooltip, Legend);

export default function ChartCard({ data }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    // Build distribution by version
    const counts = {};
    data.forEach(n => {
      const v = n.version ?? n.software_version ?? 'unknown';
      counts[v] = (counts[v] || 0) + 1;
    });

    const labels = Object.keys(counts);
    const values = labels.map(l => counts[l]);

    const chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels,
        datasets: [
          {
            label: 'Versões',
            data: values,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });

    return () => chart.destroy();
  }, [data]);

  return (
    <div className="p-4 bg-white rounded shadow">
      <h3 className="text-sm font-medium mb-2">Distribuição por versão</h3>
      <div style={{ height: 260 }}>
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
}
