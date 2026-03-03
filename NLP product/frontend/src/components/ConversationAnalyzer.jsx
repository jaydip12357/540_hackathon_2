import React, { useState } from 'react'
import { analyzeConversation } from '../api'
import LabelBadge from './LabelBadge'
import SanityCheckCard from './SanityCheckCard'
import { Plus, X, Send } from 'lucide-react'

export default function ConversationAnalyzer() {
  const [messages, setMessages] = useState(['', '', ''])
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const addMessage = () => setMessages([...messages, ''])
  const removeMessage = (i) => setMessages(messages.filter((_, idx) => idx !== i))
  const updateMessage = (i, val) => {
    const copy = [...messages]; copy[i] = val; setMessages(copy)
  }

  const handleAnalyze = async () => {
    const valid = messages.filter(m => m.trim())
    if (valid.length === 0) return
    setLoading(true); setError(null); setResult(null);
    try {
      const data = await analyzeConversation(valid)
      setResult(data)
    } catch (e) {
      setError(e?.response?.data?.detail || 'Analysis failed. Is the backend running?')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Paste up to 10 messages in order to detect escalating gaslighting or passive-aggression over time.
          </p>
          <button
            onClick={addMessage} disabled={messages.length >= 10}
            className="btn-secondary"
            style={{ padding: '6px 12px', fontSize: '0.85rem', display: 'flex', gap: '4px', alignItems: 'center' }}
          >
            <Plus size={16} /> Add Message
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {messages.map((msg, i) => (
            <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div style={{
                color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 600,
                width: '24px', height: '24px', borderRadius: '50%',
                background: 'var(--bg-input)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, marginTop: '12px'
              }}>
                {i + 1}
              </div>
              <textarea
                value={msg}
                onChange={e => updateMessage(i, e.target.value)}
                placeholder={`Message ${i + 1}`}
                rows={2}
                style={{
                  flex: 1, background: 'var(--bg-card)', border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-input)', color: 'var(--text-main)', padding: '12px 16px',
                  fontSize: '0.95rem', resize: 'vertical', outline: 'none', fontFamily: 'inherit',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--text-muted)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
              />
              <button
                onClick={() => removeMessage(i)}
                disabled={messages.length <= 1}
                style={{
                  background: 'transparent', border: 'none', color: 'var(--text-muted)',
                  cursor: messages.length <= 1 ? 'not-allowed' : 'pointer',
                  padding: '8px', marginTop: '4px', opacity: messages.length <= 1 ? 0.3 : 1,
                  transition: 'color 0.2s'
                }}
                onMouseEnter={e => { if (messages.length > 1) e.currentTarget.style.color = 'var(--accent-coral)' }}
                onMouseLeave={e => { if (messages.length > 1) e.currentTarget.style.color = 'var(--text-muted)' }}
              >
                <X size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
        <button
          onClick={handleAnalyze}
          disabled={loading || messages.every(m => !m.trim())}
          className="btn-primary"
          style={{ width: '100%', '@media (min-width: 640px)': { width: 'auto' } }}
        >
          {loading ? <span className="animate-pulse-ring" style={{ width: '16px', height: '16px', borderRadius: '50%', border: '2px solid white' }} /> : <Send size={16} />}
          {loading ? 'Analyzing Timeline...' : 'Analyze Conversation'}
        </button>
      </div>

      {error && (
        <div className="animate-fade-in" style={{
          background: 'rgba(233, 69, 96, 0.1)', borderLeft: '4px solid var(--accent-coral)',
          borderRadius: '4px', padding: '16px', color: 'var(--text-main)', fontSize: '0.9rem'
        }}>
          {error}
        </div>
      )}

      {result && (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '16px' }}>
          {/* Summary banner */}
          <div style={{
            background: 'var(--bg-card)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius-card)', padding: '24px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{ color: 'var(--text-main)', fontSize: '1.1rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontWeight: 700 }}>
                {result.escalation_detected ? 'Escalating Pattern Detected' : result.pattern_detected ? 'Toxic Pattern Detected' : 'No Persistent Pattern'}
              </span>
              <LabelBadge label={result.dominant_pattern} size="md" />
            </h3>
            <div style={{ background: 'var(--bg)', padding: '16px', borderRadius: 'var(--radius-input)', borderLeft: `4px solid ${result.pattern_detected ? 'var(--sarcastic)' : 'var(--sincere)'}` }}>
              <p style={{ color: 'var(--text-main)', fontSize: '0.95rem', lineHeight: 1.6 }}
                dangerouslySetInnerHTML={{ __html: result.context_note.replace(/\*\*(.*?)\*\*/g, '<strong style="color: var(--text-main)">$1</strong>') }} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {/* Per-message breakdown */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-card)', padding: '24px' }}>
              <h3 style={{ color: 'var(--text-main)', fontSize: '1rem', fontWeight: 700, marginBottom: '20px' }}>Message Breakdown</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {result.individual_results.map((item, i) => (
                  <div key={i} style={{
                    display: 'flex', gap: '12px', alignItems: 'flex-start',
                    background: 'var(--bg-input)', borderRadius: 'var(--radius-input)', padding: '16px',
                    borderLeft: `4px solid ${item.label === 'Sincere' ? 'var(--sincere)' :
                        item.label === 'Sarcastic' ? 'var(--sarcastic)' :
                          item.label === 'Passive-Aggressive' ? 'var(--passive)' : 'var(--gaslight)'
                      }`,
                  }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600, paddingTop: '2px' }}>{i + 1}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ color: 'var(--text-main)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '12px' }}>"{item.message}"</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                        <LabelBadge label={item.label} size="sm" />
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 500 }}>
                          {(item.confidence * 100).toFixed(0)}% confidence
                        </span>
                        {item.pattern_highlights?.map((p, j) => (
                          <span key={j} style={{
                            background: 'var(--bg)', color: 'var(--accent-coral)',
                            border: '1px solid var(--border)', borderRadius: '4px',
                            padding: '2px 8px', fontSize: '0.75rem', fontFamily: 'monospace',
                          }}>"{p}"</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pattern detected Sanity Check */}
            {(result.pattern_detected || true) && (
              <SanityCheckCard
                sanityCheck={result.sanity_check}
                copingStrategies={result.coping_strategies}
                suggestedResponses={result.suggested_responses}
                severity={result.overall_severity}
                patternHighlights={[]}
              />
            )}
          </div>
        </div>
      )}
    </div>
  )
}

