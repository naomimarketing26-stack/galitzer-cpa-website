import { useLang } from '../context/LanguageContext'
import { pages } from '../data/pages'
import FinalCTA from '../components/FinalCTA'
import { useReveal } from '../hooks/useReveal'

const container = {
  maxWidth: '1200px',
  margin: '0 auto',
  paddingLeft: 'clamp(24px, 5vw, 80px)',
  paddingRight: 'clamp(24px, 5vw, 80px)',
}

const narrowContainer = {
  maxWidth: '800px',
  margin: '0 auto',
  paddingLeft: 'clamp(24px, 5vw, 80px)',
  paddingRight: 'clamp(24px, 5vw, 80px)',
}

function CheckIcon() {
  return (
    <svg style={{ width: '15px', height: '15px', color: '#7ed957', flexShrink: 0, marginTop: '2px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  )
}

function ServiceCard({ category, isRTL, revealDelay, revealed }) {
  return (
    <div
      className="hover:-translate-y-1 transition-all duration-300"
      style={{
        background: '#ffffff',
        border: '1px solid #eef1f4',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
        opacity: revealed ? 1 : 0,
        transform: revealed ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.6s ease ${revealDelay}ms, transform 0.6s ease ${revealDelay}ms, box-shadow 0.3s ease`,
      }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 28px rgba(39,110,125,0.12)'; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.05)'; }}
    >
      <div
        style={{
          background: category.color === 'bg-[#e8f4f6]' ? '#e8f4f6' : '#f4f7f9',
          borderBottom: '1px solid #eef1f4',
          padding: '20px 28px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          flexDirection: isRTL ? 'row-reverse' : 'row',
        }}
      >
        <span style={{ fontSize: '28px' }}>{category.icon}</span>
        <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#276e7d' }}>{category.title}</h3>
      </div>
      <div style={{ padding: '24px 28px' }}>
        {category.items ? (
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', listStyle: 'none' }}>
            {category.items.map((item, i) => (
              <li key={i} style={{ display: 'flex', gap: '10px', flexDirection: isRTL ? 'row-reverse' : 'row', textAlign: isRTL ? 'right' : 'left' }}>
                <CheckIcon />
                <span style={{ fontSize: '14px', color: '#555555', lineHeight: 1.6 }}>{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {category.subGroups.map((group, gi) => (
              <div key={gi}>
                <h4 style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#276e7d', marginBottom: '12px', paddingBottom: '8px', borderBottom: '1px solid #eef1f4', textAlign: isRTL ? 'right' : 'left' }}>
                  {group.label}
                </h4>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', listStyle: 'none' }}>
                  {group.items.map((item, i) => (
                    <li key={i} style={{ display: 'flex', gap: '10px', flexDirection: isRTL ? 'row-reverse' : 'row', textAlign: isRTL ? 'right' : 'left' }}>
                      <CheckIcon />
                      <span style={{ fontSize: '14px', color: '#555555', lineHeight: 1.6 }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function ServicesPage() {
  const { lang } = useLang()
  const t = pages[lang].services
  const isRTL = lang === 'he'

  const [gridRef, gridRevealed] = useReveal()
  const [ctaRef, ctaRevealed] = useReveal()

  return (
    <main>
      {/* Hero */}
      <section
        style={{
          background: '#276e7d',
          paddingTop: '160px',
          paddingBottom: '80px',
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      >
        <div style={{ ...narrowContainer, textAlign: isRTL ? 'right' : 'center' }}>
          <span className="hero-animate hero-delay-1 inline-block" style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#7ed957', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '100px', padding: '6px 16px', marginBottom: '24px', display: 'inline-block' }}>
            {t.hero.eyebrow}
          </span>
          <h1 className="hero-animate hero-delay-2" style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', fontWeight: 800, color: '#ffffff', lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: '20px' }}>
            {t.hero.heading}
          </h1>
          <p className="hero-animate hero-delay-3" style={{ fontSize: '17px', color: '#c8e8ed', lineHeight: 1.7 }}>{t.hero.subheading}</p>
        </div>
      </section>

      {/* Services grid */}
      <section style={{ backgroundColor: '#f4f7f9', paddingTop: '96px', paddingBottom: '96px' }}>
        <div style={container}>
          <div ref={gridRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))', gap: '24px' }}>
            {t.categories.map((cat, i) => (
              <ServiceCard key={cat.id} category={cat} isRTL={isRTL} revealDelay={Math.min(i * 80, 400)} revealed={gridRevealed} />
            ))}
          </div>
        </div>
      </section>

      {/* Mid CTA */}
      <section style={{ backgroundColor: '#e8f4f6', paddingTop: '80px', paddingBottom: '80px' }}>
        <div
          ref={ctaRef}
          style={{
            ...narrowContainer,
            textAlign: 'center',
            opacity: ctaRevealed ? 1 : 0,
            transform: ctaRevealed ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <p style={{ fontSize: isRTL ? '22px' : '18px', fontWeight: 700, color: '#276e7d', marginBottom: '24px' }}>
            {isRTL ? 'לא בטוחים איזה שירות מתאים לכם? נשמח לעזור.' : "Not sure which service fits your situation? We're happy to help."}
          </p>
          <a
            href="/contact"
            style={{ display: 'inline-flex', alignItems: 'center', background: '#7ed957', color: '#1a1a1a', fontWeight: 700, fontSize: '15px', padding: '14px 40px', borderRadius: '10px', textDecoration: 'none', boxShadow: '0 4px 16px rgba(126,217,87,0.3)', transition: 'all 0.2s ease' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#65c040'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#7ed957'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            {t.cta}
          </a>
        </div>
      </section>

      <FinalCTA
        headingOverride={isRTL ? 'דברו איתנו — ועשו סדר במיסים שלכם' : undefined}
        ctaOverride={isRTL ? 'קבעו שיחה' : undefined}
      />
    </main>
  )
}
