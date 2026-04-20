import { useLang } from '../context/LanguageContext'
import { content } from '../data/content'
import { useReveal } from '../hooks/useReveal'

const container = {
  maxWidth: '1200px',
  margin: '0 auto',
  paddingLeft: 'clamp(24px, 5vw, 80px)',
  paddingRight: 'clamp(24px, 5vw, 80px)',
}

export default function HowItWorks() {
  const { lang } = useLang()
  const t = content[lang].howItWorks
  const isRTL = lang === 'he'

  const [headerRef, headerRevealed] = useReveal()
  const [stepsRef, stepsRevealed] = useReveal()
  const [ctaRef, ctaRevealed] = useReveal()

  return (
    <section style={{ backgroundColor: '#f4f7f9', paddingTop: '96px', paddingBottom: '96px' }}>
      <div style={container}>
        {/* Header */}
        <div
          ref={headerRef}
          style={{
            textAlign: 'center',
            marginBottom: '64px',
            opacity: headerRevealed ? 1 : 0,
            transform: headerRevealed ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 700, color: '#276e7d', lineHeight: 1.25, marginBottom: '14px' }}>
            {t.heading}
          </h2>
          <p style={{ fontSize: '17px', color: '#666666', lineHeight: 1.7 }}>{t.subheading}</p>
        </div>

        {/* Steps */}
        <div
          ref={stepsRef}
          style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px', marginBottom: '56px' }}
          className="grid-cols-1 md:grid-cols-3"
        >
          {/* Connector line — desktop (RTL-aware) */}
          <div
            className="hidden md:block"
            style={{
              position: 'absolute',
              top: '31px',
              left: isRTL ? 'auto' : 'calc(16.66% + 16px)',
              right: isRTL ? 'calc(16.66% + 16px)' : 'calc(16.66% + 16px)',
              width: 'calc(66.66% - 32px)',
              height: '2px',
              borderTop: '2px dashed rgba(39,110,125,0.2)',
              pointerEvents: 'none',
            }}
          />

          {t.steps.map((step, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                opacity: stepsRevealed ? 1 : 0,
                transform: stepsRevealed ? 'translateY(0)' : 'translateY(24px)',
                transition: `opacity 0.6s ease ${i * 150}ms, transform 0.6s ease ${i * 150}ms`,
              }}
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: '#276e7d',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  fontWeight: 800,
                  marginBottom: '24px',
                  boxShadow: '0 4px 16px rgba(39,110,125,0.3)',
                  outline: '8px solid rgba(39,110,125,0.08)',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {step.number}
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#276e7d', marginBottom: '10px' }}>{step.title}</h3>
              <p style={{ fontSize: '14px', color: '#666666', lineHeight: 1.65, maxWidth: '240px' }}>{step.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          ref={ctaRef}
          style={{
            textAlign: 'center',
            opacity: ctaRevealed ? 1 : 0,
            transform: ctaRevealed ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <a
            href="/contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: '#7ed957',
              color: '#1a1a1a',
              fontWeight: 700,
              fontSize: '15px',
              padding: '14px 40px',
              borderRadius: '10px',
              textDecoration: 'none',
              boxShadow: '0 4px 16px rgba(126,217,87,0.3)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#65c040'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#7ed957'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            {t.cta}
          </a>
        </div>
      </div>
    </section>
  )
}
