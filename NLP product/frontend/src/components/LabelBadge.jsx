import React from 'react'
import { Shield, MessageCircle, AlertTriangle, AlertOctagon } from 'lucide-react'

const LABEL_STYLES = {
  Sincere: { color: 'var(--sincere)', bg: 'var(--sincere-bg)', icon: Shield },
  Sarcastic: { color: 'var(--sarcastic)', bg: 'var(--sarcastic-bg)', icon: MessageCircle },
  'Passive-Aggressive': { color: 'var(--passive)', bg: 'var(--passive-bg)', icon: AlertTriangle },
  Gaslighting: { color: 'var(--gaslight)', bg: 'var(--gaslight-bg)', icon: AlertOctagon },
}

export default function LabelBadge({ label, size = 'md' }) {
  const fs = size === 'lg' ? '0.95rem' : size === 'sm' ? '0.7rem' : '0.8rem'
  const px = size === 'lg' ? '12px' : '8px'
  const py = size === 'lg' ? '4px' : '3px'
  const iconSize = size === 'lg' ? 16 : 14

  const styleConfig = LABEL_STYLES[label] || { color: 'var(--text-main)', bg: 'var(--bg2)', icon: MessageCircle }
  const Icon = styleConfig.icon

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      background: styleConfig.bg,
      color: styleConfig.color,
      border: `1px solid ${styleConfig.color}`,
      borderRadius: 'var(--radius-input)',
      padding: `${py} ${px}`,
      fontSize: fs,
      fontWeight: 600,
      whiteSpace: 'nowrap',
      letterSpacing: '0.01em',
    }}>
      <Icon size={iconSize} />
      {label}
    </span>
  )
}

