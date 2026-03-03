import React from 'react'

const LABELS = ['Sincere', 'Sarcastic', 'Passive-Aggressive', 'Gaslighting']

const LABEL_COLORS = {
  Sincere: 'var(--sincere)',
  Sarcastic: 'var(--sarcastic)',
  'Passive-Aggressive': 'var(--passive)',
  Gaslighting: 'var(--gaslight)'
}

export default function ScoreBar({ scores }) {
  const sorted = LABELS.map(l => [l, scores[l] ?? 0]).sort((a, b) => b[1] - a[1])
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {sorted.map(([label, score]) => (
        <div key={label}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.85rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>{label}</span>
            <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>{(score * 100).toFixed(1)}%</span>
          </div>
          <div style={{ height: '6px', background: 'var(--bg-input)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${Math.max(score * 100, 2)}%`, // At least 2% so it's visible if non-zero
              background: LABEL_COLORS[label] || 'var(--text-muted)',
              borderRadius: '3px',
              transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
            }} />
          </div>
        </div>
      ))}
    </div>
  )
}

