import { useLang } from '../context/LanguageContext'
import { content } from '../data/content'
import { useReveal } from '../hooks/useReveal'

export default function FinalCTA({ headingOverride, ctaOverride } = {}) {
  const { lang } = useLang()
  const t = content[lang].finalCta
  const isRTL = lang === 'he'

  const heading = headingOverride ?? t.heading
  const cta = ctaOverride ?? t.cta

  const [contentRef, contentRevealed] = useReveal()

  return (
    <section
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #0D1E2F 0%, #1A3554 100%)',
        paddingTop: '96px',
        paddingBottom: '96px',
      }}
    >
      {/* Decorative blobs */}
      <div style={{ position: 'absolute', top: '-60px', left: '-60px', width: '320px', height: '320px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)', filter: 'blur(60px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-80px', right: '-80px', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(196,136,58,0.08)', filter: 'blur(80px)', pointerEvents: 'none' }} />

      <div
        ref={contentRef}
        style={{
          maxWidth: '700px',
          margin: '0 auto',
          paddingLeft: 'clamp(24px, 5vw, 80px)',
          paddingRight: 'clamp(24px, 5vw, 80px)',
          textAlign: 'center',
          position: 'relative',
          opacity: contentRevealed ? 1 : 0,
          transform: contentRevealed ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}
      >
        <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 700, color: '#ffffff', lineHeight: 1.25, marginBottom: t.subheading ? '16px' : '40px' }}>
          {heading}
        </h2>
        {t.subheading && (
          <p style={{ fontSize: '17px', color: '#B0C8E0', lineHeight: 1.7, marginBottom: '40px' }}>
            {t.subheading}
          </p>
        )}
        <a
          href="/contact"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            background: '#C4883A',
            color: '#ffffff',
            fontWeight: 700,
            fontSize: '16px',
            padding: '16px 48px',
            borderRadius: '100px',
            textDecoration: 'none',
            boxShadow: '0 4px 20px rgba(196,136,58,0.4)',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#A96F25'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(196,136,58,0.5)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = '#C4883A'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(196,136,58,0.4)'; }}
        >
          {cta}
        </a>
      </div>
    </section>
  )
}
