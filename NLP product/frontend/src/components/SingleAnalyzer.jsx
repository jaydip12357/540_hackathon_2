import React, { useState } from 'react'
import { analyzeSingle } from '../api'
import LabelBadge from './LabelBadge'
import ScoreBar from './ScoreBar'
import SanityCheckCard from './SanityCheckCard'
import { Send, Upload } from 'lucide-react'

const EXAMPLES = {
  Gaslighting: "You're way too sensitive. I never said that — you're imagining things. No one else thinks there's a problem here.",
  Sarcastic: "Oh wow, what a brilliant idea! I'm sure completely ignoring everyone's feedback will totally work out great for you.",
  'Passive-Aggressive': "Fine, do whatever you want. I'm sure you know best. Don't worry about me at all.",
  Sincere: "I appreciate you sharing that with me. It sounds really difficult, and I'm here if you want to talk.",
}

const btn = {
  base: {
    background: 'var(--bg-input)', border: '1px solid var(--border)',
    borderRadius: 'var(--radius-button)', padding: '8px 16px', cursor: 'pointer',
    color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 500, fontFamily: 'inherit',
    transition: 'all 0.2s'
  },
}

export default function SingleAnalyzer() {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const handleAnalyze = async () => {
    if (!text.trim()) return
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const data = await analyzeSingle(text.trim())
      setResult(data)
    } catch (e) {
      setError(e?.response?.data?.detail || 'Analysis failed. Is the backend running?')
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Quick examples */}
      <div>
        <p style={{ color: 'var(--text-main)', fontWeight: 500, fontSize: '0.9rem', marginBottom: '12px' }}>Try an example:</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {Object.entries(EXAMPLES).map(([label, ex]) => (
            <button
              key={label}
              onClick={() => { setText(ex); setResult(null) }}
              style={btn.base}
              onMouseOver={e => e.target.style.background = 'var(--bg-hover)'}
              onMouseOut={e => e.target.style.background = 'var(--bg-input)'}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Text input */}
      <div style={{ position: 'relative' }}>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => { if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') handleAnalyze() }}
          placeholder="Paste or type a message to analyze..."
          rows={5}
          maxLength={2000}
          style={{
            width: '100%', background: 'var(--bg-card)',
            border: '1px solid var(--border)', borderRadius: 'var(--radius-card)',
            color: 'var(--text-main)', padding: '20px', fontSize: '1rem',
            resize: 'vertical', outline: 'none', fontFamily: 'inherit', lineHeight: 1.6,
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)'
          }}
        />
        <div style={{
          position: 'absolute', bottom: '16px', right: '16px',
          display: 'flex', gap: '16px', alignItems: 'center'
        }}>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
            {text.length}/2000
          </span>
          <button
            onClick={handleAnalyze}
            disabled={loading || !text.trim()}
            className="btn-primary"
            style={{ padding: '8px 20px' }}
          >
            {loading ? <span className="animate-pulse-ring" style={{ width: '16px', height: '16px', borderRadius: '50%', border: '2px solid white' }} /> : <Send size={16} />}
            {loading ? 'Analyzing...' : 'Analyze'}
          </button>
        </div>
      </div>

      <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textAlign: 'center', marginTop: '-12px' }}>
        Press <kbd style={{ background: 'var(--bg-input)', padding: '2px 6px', borderRadius: '4px' }}>Ctrl</kbd> + <kbd style={{ background: 'var(--bg-input)', padding: '2px 6px', borderRadius: '4px' }}>Enter</kbd> to analyze
      </p>

      {error && (
        <div className="animate-fade-in" style={{
          background: 'rgba(233, 69, 96, 0.1)', borderLeft: '4px solid var(--accent-coral)',
          borderRadius: '4px', padding: '16px', color: 'var(--text-main)', fontSize: '0.9rem'
        }}>
          {error}
        </div>
      )}

      {result && (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '16px' }}>
          {/* Result header */}
          <div style={{
            background: 'var(--bg-card)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius-card)', padding: '24px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}>
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Primary Classification</p>
              <LabelBadge label={result.label} size="lg" />
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Confidence Score</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', justifyContent: 'flex-end' }}>
                <span style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--text-main)', lineHeight: 1 }}>
                  {(result.confidence * 100).toFixed(0)}
                </span>
                <span style={{ fontSize: '1.2rem', color: 'var(--text-muted)', fontWeight: 600 }}>%</span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '4px' }}>Analyzed in {result.elapsed_seconds}s</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {/* Score breakdown */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-card)', padding: '24px' }}>
              <h3 style={{ color: 'var(--text-main)', fontSize: '1rem', fontWeight: 700, marginBottom: '20px' }}>Label Probabilities</h3>
              <ScoreBar scores={result.all_scores} />
            </div>

            <SanityCheckCard
              sanityCheck={result.sanity_check}
              copingStrategies={result.coping_strategies}
              suggestedResponses={result.suggested_responses}
              severity={result.severity}
              patternHighlights={result.pattern_highlights}
            />
          </div>
        </div>
      )}
    </div>
  )
}

