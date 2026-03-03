import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import SingleAnalyzer from './components/SingleAnalyzer'
import ConversationAnalyzer from './components/ConversationAnalyzer'
import Resources from './components/Resources'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="dashboard" element={<Dashboard />} />

          {/* We create a wrapper block for "analyze" to handle both single and convo views */}
          <Route path="analyze" element={
            <div className="animate-fade-in" style={{ padding: '20px 0' }}>
              <div style={{ display: 'flex', gap: '16px', marginBottom: '32px', borderBottom: '1px solid var(--border)' }}>
                {/* Simple sub-nav implemented as a quick toggle just for this view */}
                <h2 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>Analysis Suite</h2>
              </div>
              {/* For now we just dump SingleAnalyzer here, we'll refine the tab UI within it or next to it */}
              <SingleAnalyzer />
              {/* Note: Conversation analyzer is also available, could be linked or tabbed */}
            </div>
          } />

          <Route path="history" element={
            <div className="animate-fade-in" style={{ padding: '20px 0' }}>
              <h1 style={{ fontSize: '2rem', marginBottom: '16px' }}>History</h1>
              <p style={{ color: 'var(--text-muted)' }}>Past analyses will appear here.</p>
            </div>
          } />

          <Route path="resources" element={<Resources />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
