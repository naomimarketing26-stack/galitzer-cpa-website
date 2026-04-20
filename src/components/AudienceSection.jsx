import { useLang } from '../context/LanguageContext'
import { content } from '../data/content'
import { useReveal } from '../hooks/useReveal'

const container = {
  maxWidth: '1200px',
  margin: '0 auto',
  paddingLeft: 'clamp(24px, 5vw, 80px)',
  paddingRight: 'clamp(24px, 5vw, 80px)',
}

export default function AudienceSection() {
  const { lang } = useLang()
  const t = content[lang].audience
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
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}
        >
          {t.items.map((item, i) => (
            <div
              key={i}
              className="hover:-translate-y-1 transition-transform duration-300"
              style={{
                background: '#ffffff',
                border: '1px solid #eef1f4',
                borderRadius: '16px',
                padding: '36px 24px',
                textAlign: 'center',
                boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
                cursor: 'default',
                opacity: gridRevealed ? 1 : 0,
                transform: gridRevealed ? 'translateY(0)' : 'translateY(24px)',
                transition: `opacity 0.6s ease ${i * 80}ms, transform 0.6s ease ${i * 80}ms, box-shadow 0.3s ease`,
              }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 24px rgba(39,110,125,0.12)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.05)'; }}
            >
              <span style={{ fontSize: '40px', display: 'block', marginBottom: '16px' }}>{item.icon}</span>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#276e7d', marginBottom: '8px' }}>{item.title}</h3>
              <p style={{ fontSize: '14px', color: '#666666', lineHeight: 1.65 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
