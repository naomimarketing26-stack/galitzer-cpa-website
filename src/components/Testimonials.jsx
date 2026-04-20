import { useLang } from '../context/LanguageContext'
import { content } from '../data/content'
import { useReveal } from '../hooks/useReveal'

const container = {
  maxWidth: '1200px',
  margin: '0 auto',
  paddingLeft: 'clamp(24px, 5vw, 80px)',
  paddingRight: 'clamp(24px, 5vw, 80px)',
}

export default function Testimonials() {
  const { lang } = useLang()
  const t = content[lang].testimonials
  const isRTL = lang === 'he'

  const [headingRef, headingRevealed] = useReveal()
  const [gridRef, gridRevealed] = useReveal()

  return (
    <section style={{ backgroundColor: '#ffffff', paddingTop: '96px', paddingBottom: '96px' }}>
      <div style={container}>
        {/* Heading */}
        <div
          ref={headingRef}
          style={{
            textAlign: 'center',
            marginBottom: '56px',
            opacity: headingRevealed ? 1 : 0,
            transform: headingRevealed ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 700, color: '#276e7d', lineHeight: 1.25 }}>
            {t.heading}
          </h2>
        </div>

        {/* Cards */}
        <div
          ref={gridRef}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}
        >
          {t.items.map((item, i) => (
            <div
              key={i}
              className="hover:-translate-y-1 transition-all duration-300"
              style={{
                position: 'relative',
                overflow: 'hidden',
                background: '#ffffff',
                border: '1px solid #eef1f4',
                borderTop: '4px solid #7ed957',
                borderRadius: '16px',
                padding: '32px',
                boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                textAlign: isRTL ? 'right' : 'left',
                opacity: gridRevealed ? 1 : 0,
                transform: gridRevealed ? 'translateY(0)' : 'translateY(24px)',
                transition: `opacity 0.6s ease ${i * 100}ms, transform 0.6s ease ${i * 100}ms, box-shadow 0.3s ease`,
              }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 28px rgba(39,110,125,0.1)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.05)'; }}
            >
              {/* Decorative quote */}
              <span
                style={{
                  position: 'absolute',
                  top: '12px',
                  [isRTL ? 'right' : 'left']: '16px',
                  fontSize: '72px',
                  fontFamily: 'Georgia, serif',
                  lineHeight: 1,
                  color: 'rgba(39,110,125,0.07)',
                  pointerEvents: 'none',
                  userSelect: 'none',
                }}
              >
                "
              </span>

              {/* Stars */}
              <div style={{ display: 'flex', gap: '3px', justifyContent: isRTL ? 'flex-end' : 'flex-start' }}>
                {Array.from({ length: item.stars }).map((_, j) => (
                  <span key={j} style={{ color: '#7ed957', fontSize: '16px' }}>★</span>
                ))}
              </div>

              <p style={{ fontSize: '14px', color: '#555555', lineHeight: 1.7, fontStyle: 'italic', flexGrow: 1, position: 'relative', zIndex: 1 }}>
                "{item.quote}"
              </p>

              <div>
                <p style={{ fontSize: '14px', fontWeight: 700, color: '#1a1a1a' }}>{item.name}</p>
                <p style={{ fontSize: '12px', color: '#888888', marginTop: '3px' }}>{item.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
