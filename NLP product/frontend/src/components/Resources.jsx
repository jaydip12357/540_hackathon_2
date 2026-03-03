import React, { useState, useEffect } from 'react'
import { getResources } from '../api'
import { ExternalLink, Phone, BookOpen, Heart } from 'lucide-react'

const SECTION_ICONS = {
  crisis: Phone,
  self_help: Heart,
  education: BookOpen,
}

const SECTION_LABELS = {
  crisis: 'Emergency Support & Hotlines',
  self_help: 'Self-Help Resources',
  education: 'Educational Content',
}

export default function Resources() {
  const [data, setData] = useState(null)

  useEffect(() => {
    getResources().then(setData).catch(() => setData(null))
  }, [])

  const staticData = {
    crisis: [
      { name: 'Crisis Text Line', detail: 'Text HOME to 741741', url: 'https://www.crisistextline.org' },
      { name: 'National Domestic Violence Hotline', detail: '1-800-799-7233', url: 'https://www.thehotline.org' },
      { name: 'SAMHSA Helpline', detail: '1-800-662-4357 (free, 24/7)', url: 'https://www.samhsa.gov/find-help/national-helpline' },
    ],
    self_help: [
      { name: 'Loveisrespect', detail: 'Chat, call, or text for relationship help', url: 'https://www.loveisrespect.org' },
      { name: '7 Cups', detail: 'Free online chat with trained listeners', url: 'https://www.7cups.com' },
      { name: 'Gaslighting Recovery Workbook', detail: 'Book by Amy Marlow-MaCoy', url: 'https://www.amazon.com/dp/1648481043' },
    ],
    education: [
      { name: 'Psychology Today — Gaslighting', detail: 'Articles on recognizing gaslighting', url: 'https://www.psychologytoday.com/us/basics/gaslighting' },
      { name: 'NAMI', detail: 'National Alliance on Mental Illness', url: 'https://www.nami.org' },
    ],
  }

  const resources = data || staticData

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h1 style={{ fontSize: '2rem', marginBottom: '16px' }}>Resource Library</h1>
        <div style={{ background: 'rgba(233, 69, 96, 0.1)', borderLeft: '4px solid var(--accent-coral)', padding: '16px', borderRadius: '4px', maxWidth: '800px' }}>
          <p style={{ color: 'var(--text-main)', fontSize: '0.95rem', lineHeight: 1.6 }}>
            <strong style={{ color: 'var(--accent-coral)' }}>If you are in immediate danger, please call 911 or your local emergency services.</strong><br />
            Gaslight Guard is an AI tool and not a replacement for professional mental health support. If you or someone you know is experiencing verbal abuse, gaslighting, or emotional harm, help is available.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
        {Object.entries(resources).map(([section, items]) => {
          const Icon = SECTION_ICONS[section] || BookOpen;
          return (
            <div key={section} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                fontWeight: 700, fontSize: '1rem', color: 'var(--text-main)',
                borderBottom: '1px solid var(--border)', paddingBottom: '12px'
              }}>
                <Icon size={20} color={section === 'crisis' ? 'var(--accent-coral)' : 'var(--accent-teal)'} />
                {SECTION_LABELS[section]}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {items.map((item, i) => (
                  <a key={i} href={item.url} target="_blank" rel="noopener noreferrer"
                    className="card-shadow-hover"
                    style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      background: 'var(--bg-card)', border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-card)', padding: '16px 20px', textDecoration: 'none',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--text-muted)'; e.currentTarget.style.background = 'var(--bg-hover)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--bg-card)'; }}
                  >
                    <div>
                      <p style={{ color: 'var(--text-main)', fontWeight: 600, fontSize: '1rem', marginBottom: '6px' }}>{item.name}</p>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{item.detail}</p>
                    </div>
                    <ExternalLink size={18} color="var(--text-muted)" style={{ flexShrink: 0, opacity: 0.7 }} />
                  </a>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

