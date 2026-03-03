import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, MessageCircle, BarChart2, CheckCircle, ArrowRight } from 'lucide-react';

export default function LandingPage() {
    const [demoText, setDemoText] = React.useState('');
    const [demoResult, setDemoResult] = React.useState(null);
    const [isAnalyzing, setIsAnalyzing] = React.useState(false);

    const handleDemoSubmit = async (e) => {
        e.preventDefault();
        if (!demoText.trim()) return;

        setIsAnalyzing(true);
        // Simulated API call for landing page demo
        setTimeout(() => {
            setDemoResult({
                label: 'Passive-Aggressive',
                confidence: 0.89,
                sanity_check: 'While this sounds polite, the underlying tone carries hostility.'
            });
            setIsAnalyzing(false);
        }, 1200);
    };

    return (
        <div className="landing-page">
            {/* Hero Section */}
            <section style={{
                textAlign: 'center',
                padding: '80px 20px',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute', top: '50%', left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '600px', height: '600px',
                    background: 'radial-gradient(circle, rgba(233,69,96,0.15) 0%, rgba(22,199,154,0.05) 50%, transparent 100%)',
                    zIndex: 0, pointerEvents: 'none'
                }}></div>

                <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto' }}>
                    <h1 className="animate-fade-in" style={{ fontSize: '3.5rem', marginBottom: '24px', fontWeight: 700 }}>
                        See Through the Words. <br />
                        <span style={{ color: 'var(--accent-teal)' }}>Trust Your Reality.</span>
                    </h1>
                    <p className="animate-fade-in" style={{
                        fontSize: '1.25rem', color: 'var(--text-muted)',
                        marginBottom: '48px', animationDelay: '0.1s', animationFillMode: 'both'
                    }}>
                        Gaslight Guard uses advanced AI to detect hidden verbal abuse—sarcasm, passive-aggression, and gaslighting—validating your experience when words don't match reality.
                    </p>

                    <form onSubmit={handleDemoSubmit} className="animate-fade-in" style={{
                        background: 'var(--bg-card)', padding: '24px',
                        borderRadius: 'var(--radius-card)', border: '1px solid var(--border)',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                        animationDelay: '0.2s', animationFillMode: 'both',
                        textAlign: 'left'
                    }}>
                        <label style={{ display: 'block', marginBottom: '12px', fontWeight: 500, color: 'var(--text-muted)' }}>
                            Try it instantly (No sign-up required)
                        </label>
                        <div style={{ display: 'flex', gap: '12px', flexDirection: 'column', '@media (min-width: 640px)': { flexDirection: 'row' } }}>
                            <input
                                type="text"
                                value={demoText}
                                onChange={(e) => setDemoText(e.target.value)}
                                placeholder="e.g., Oh sure, you're clearly the expert here."
                                style={{
                                    flex: 1, padding: '16px', borderRadius: 'var(--radius-input)',
                                    border: '1px solid var(--border)', background: 'var(--bg-input)',
                                    color: 'var(--text-main)', fontSize: '1rem', outline: 'none'
                                }}
                            />
                            <button
                                type="submit"
                                className="btn-primary"
                                disabled={isAnalyzing}
                                style={{ padding: '16px 32px', minWidth: '160px' }}
                            >
                                {isAnalyzing ? (
                                    <span className="animate-pulse-ring" style={{ width: '20px', height: '20px', borderRadius: '50%', border: '2px solid white' }}></span>
                                ) : 'Analyze'}
                            </button>
                        </div>

                        {demoResult && (
                            <div className="animate-fade-in" style={{
                                marginTop: '24px', padding: '16px',
                                background: 'var(--passive-bg)', borderLeft: '4px solid var(--passive)',
                                borderRadius: '0 var(--radius-input) var(--radius-input) 0'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                    <Shield size={18} color="var(--passive)" />
                                    <span style={{ fontWeight: 600, color: 'var(--passive)' }}>{demoResult.label}</span>
                                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                        ({(demoResult.confidence * 100).toFixed(0)}% confidence)
                                    </span>
                                </div>
                                <p style={{ color: 'var(--text-main)' }}>{demoResult.sanity_check}</p>
                            </div>
                        )}
                    </form>
                </div>
            </section>

            {/* Features Grid */}
            <section style={{ padding: '80px 20px', background: 'var(--bg-card)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '64px' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>How It Works</h2>
                        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
                            Standard sentiment analysis often misclassifies polite-sounding toxic messages. Our fine-tuned RoBERTa model understands context.
                        </p>
                    </div>

                    <div style={{
                        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '32px'
                    }}>
                        {[
                            { icon: MessageCircle, title: 'Text Analysis', desc: 'Instantly classify messages as Sincere, Sarcastic, Passive-Aggressive, or Gaslighting.' },
                            { icon: CheckCircle, title: 'Sanity Check', desc: 'Get human-readable validation that contextualizes the manipulation and validates your feelings.' },
                            { icon: BarChart2, title: 'Pattern Tracking', desc: 'Monitor toxicity trends over time to identify escalating manipulation in relationships.' }
                        ].map((feature, i) => (
                            <div key={i} className="card-shadow-hover" style={{
                                background: 'var(--bg)', padding: '32px',
                                borderRadius: 'var(--radius-card)', border: '1px solid var(--border)'
                            }}>
                                <div style={{
                                    width: '48px', height: '48px', borderRadius: '12px',
                                    background: 'rgba(233, 69, 96, 0.1)', display: 'flex',
                                    alignItems: 'center', justifyContent: 'center', marginBottom: '24px'
                                }}>
                                    <feature.icon size={24} color="var(--accent-coral)" />
                                </div>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '12px' }}>{feature.title}</h3>
                                <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section style={{ padding: '80px 20px', textAlign: 'center' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '24px' }}>Ready to validate your reality?</h2>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '40px' }}>
                    Join Gaslight Guard to start unpacking tricky conversations.
                </p>
                <Link to="/analyze" className="btn-primary" style={{ padding: '16px 40px', fontSize: '1.1rem' }}>
                    Start Your Sanity Check <ArrowRight size={20} />
                </Link>
            </section>
        </div>
    );
}
