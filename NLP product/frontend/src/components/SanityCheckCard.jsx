import React from 'react'
import { CheckCircle, AlertTriangle, MessageSquare } from 'lucide-react'

const SEVERITY_LABELS = { low: 'Low Risk', medium: 'Medium Risk', high: 'High Risk' }
const SEVERITY_COLORS = { low: 'var(--sincere)', medium: 'var(--passive)', high: 'var(--sarcastic)' }

export default function SanityCheckCard({ sanityCheck, copingStrategies, suggestedResponses, severity, patternHighlights }) {
  // Graceful fallback for demo
  const displaySeverity = severity || 'medium';
  const displaySanityCheck = sanityCheck || 'This message appears to use manipulative language designed to make you question your reading of the situation.';
  const displayStrategies = copingStrategies?.length ? copingStrategies : ['Take a step back and breathe', 'Do not engage emotionally', 'State your boundary clearly without defending it'];
  const displayResponses = suggestedResponses?.length ? suggestedResponses : ['I understand you see it that way, but my experience was different.', 'I am not willing to continue this conversation right now.'];

  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-card)',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    }}>
      {/* Severity */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: '6px',
        fontSize: '0.85rem', fontWeight: 600,
        color: SEVERITY_COLORS[displaySeverity],
        textTransform: 'uppercase', letterSpacing: '0.08em',
        background: `rgba(${displaySeverity === 'high' ? '233, 69, 96' : displaySeverity === 'medium' ? '243, 156, 18' : '22, 199, 154'}, 0.1)`,
        padding: '6px 12px', borderRadius: 'var(--radius-button)',
        alignSelf: 'flex-start'
      }}>
        <AlertTriangle size={16} />
        {SEVERITY_LABELS[displaySeverity] || 'Medium Risk'}
      </div>

      {/* Sanity check */}
      <div>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, marginBottom: '12px', fontSize: '0.9rem', color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          <CheckCircle size={18} color="var(--accent-teal)" />
          Sanity Check
        </h3>
        <div style={{ background: 'var(--bg)', padding: '16px', borderRadius: 'var(--radius-input)', borderLeft: '4px solid var(--accent-teal)' }}>
          <p style={{ color: 'var(--text-main)', lineHeight: 1.7, fontSize: '1rem' }}>{displaySanityCheck}</p>
        </div>
      </div>

      {/* Pattern highlights */}
      {patternHighlights?.length > 0 && (
        <div>
          <h3 style={{ fontWeight: 700, marginBottom: '12px', fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Flagged Phrases
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {patternHighlights.map((p, i) => (
              <span key={i} style={{
                background: 'var(--bg-input)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-input)', padding: '6px 12px',
                fontSize: '0.85rem', fontFamily: 'monospace', color: 'var(--accent-coral)',
              }}>"{p}"</span>
            ))}
          </div>
        </div>
      )}

      {/* Coping strategies */}
      <div>
        <h3 style={{ fontWeight: 700, marginBottom: '12px', fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Coping Strategies
        </h3>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {displayStrategies.map((s, i) => (
            <li key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', color: 'var(--text-main)', fontSize: '0.95rem', lineHeight: 1.6 }}>
              <span style={{ color: 'var(--accent-teal)', flexShrink: 0, marginTop: '2px' }}>✦</span>
              {s}
            </li>
          ))}
        </ul>
      </div>

      {/* Suggested responses */}
      <div>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, marginBottom: '12px', fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          <MessageSquare size={18} />
          Suggested Responses
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {displayResponses.map((r, i) => (
            <div key={i} style={{
              background: 'var(--bg-input)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-input)', padding: '14px 18px',
              color: 'var(--text-main)', fontSize: '0.95rem', lineHeight: 1.6,
              cursor: 'pointer', transition: 'all 0.2s'
            }}
              className="card-shadow-hover"
              onClick={() => { navigator.clipboard.writeText(r); alert('Copied to clipboard!') }}
            >
              {r}
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '8px', textAlign: 'right' }}>Click to copy</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

