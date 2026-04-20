import { useLang } from '../context/LanguageContext'
import { content } from '../data/content'
import { useReveal } from '../hooks/useReveal'

const container = {
  maxWidth: '1200px',
  margin: '0 auto',
  paddingLeft: 'clamp(24px, 5vw, 80px)',
  paddingRight: 'clamp(24px, 5vw, 80px)',
}

export default function ServicesSection() {
  const { lang } = useLang()
  const t = content[lang].services
  const isRTL = lang === 'he'

  const [headerRef, headerRevealed] = useReveal()
  const [gridRef, gridRevealed] = useReveal()
  const [ctaRef, ctaRevealed] = useReveal()

  return (
    <section style={{ backgroundColor: '#f4f7f9', paddingTop: '96px', paddingBottom: '96px' }}>
      <div style={container}>
        {/* Header */}
        <div
          ref={headerRef}
          style={{
            textAlign: 'center',
            marginBottom: '56px',
            opacity: headerRevealed ? 1 : 0,
            transform: headerRevealed ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 700, color: '#276e7d', lineHeight: 1.25, marginBottom: '14px' }}>
            {t.heading}
          </h2>
          <p style={{ fontSize: '17px', color: '#666666', lineHeight: 1.7, maxWidth: '520px', margin: '0 auto' }}>
            {t.subheading}
          </p>
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}
        >
          {t.items.map((service, i) => (
            <div
              key={i}
              className="group hover:-translate-y-1 transition-all duration-300"
              style={{
                background: '#ffffff',
                border: '1px solid #eef1f4',
                borderRadius: '16px',
                padding: '32px',
                boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
                opacity: gridRevealed ? 1 : 0,
                transform: gridRevealed ? 'translateY(0)' : 'translateY(24px)',
                transition: `opacity 0.6s ease ${i * 80}ms, transform 0.6s ease ${i * 80}ms, box-shadow 0.3s ease`,
                cursor: 'pointer',
              }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 28px rgba(39,110,125,0.12)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.05)'; }}
            >
              <div
                className="group-hover:bg-[#276e7d] transition-colors duration-200"
                style={{
                  width: '52px',
                  height: '52px',
                  background: '#e8f4f6',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                  fontSize: '22px',
                  marginLeft: isRTL ? 'auto' : '0',
                  marginRight: isRTL ? '0' : 'auto',
                }}
              >
                {service.icon}
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#276e7d', marginBottom: '10px', textAlign: isRTL ? 'right' : 'left' }}>
                {service.title}
              </h3>
              <p style={{ fontSize: '14px', color: '#666666', lineHeight: 1.65, textAlign: isRTL ? 'right' : 'left' }}>
                {service.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          ref={ctaRef}
          style={{
            textAlign: 'center',
            marginTop: '48px',
            opacity: ctaRevealed ? 1 : 0,
            transform: ctaRevealed ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <a
            href="/services"
            className="group inline-flex items-center gap-2 font-semibold transition-colors"
            style={{ color: '#276e7d', fontSize: '15px', textDecoration: 'none' }}
            onMouseEnter={e => e.currentTarget.style.color = '#1e5563'}
            onMouseLeave={e => e.currentTarget.style.color = '#276e7d'}
          >
            {t.cta}
            <span className={`transition-transform duration-200 ${isRTL ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`}>
              {isRTL ? '←' : '→'}
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
