import React from 'react';

export default function Dashboard() {
    return (
        <div className="animate-fade-in" style={{ padding: '20px' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '16px' }}>Welcome Back</h1>
            <p style={{ color: 'var(--text-muted)' }}>This is your personalized command center.</p>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '24px',
                marginTop: '32px'
            }}>
                <div style={{
                    background: 'var(--bg-card)', padding: '24px',
                    borderRadius: 'var(--radius-card)', border: '1px solid var(--border)'
                }}>
                    <h3 style={{ marginBottom: '16px' }}>Recent Analyses</h3>
                    <p style={{ color: 'var(--text-muted)' }}>No recent analyses found.</p>
                </div>

                <div style={{
                    background: 'var(--bg-card)', padding: '24px',
                    borderRadius: 'var(--radius-card)', border: '1px solid var(--border)'
                }}>
                    <h3 style={{ marginBottom: '16px' }}>Pattern Tracker</h3>
                    <div style={{ height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed var(--border)', borderRadius: '8px' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Not enough data to graph</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
