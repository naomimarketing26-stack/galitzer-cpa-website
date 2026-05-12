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
    <svg style={{ width: '15px', height: '15px', color: '#1A3554', flexShrink: 0, marginTop: '2px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  )
}

function ServiceCard({ category, isRTL, revealDelay, revealed }) {
  const allItems = category.items || category.subGroups?.flatMap(g => g.items) || []

  const badgeColors = {
    'Most Popular': { bg: '#1A3554', text: '#ffffff' },
    'Comprehensive': { bg: '#0F2B47', text: '#B0C8E0' },
    'For Professionals': { bg: '#6E7F8D', text: '#ffffff' },
    'Most Asked': { bg: '#8a6020', text: '#ffffff' },
    'הנפוץ ביותר': { bg: '#1A3554', text: '#ffffff' },
    'מקיף': { bg: '#0F2B47', text: '#B0C8E0' },
    'לעסקים': { bg: '#6E7F8D', text: '#ffffff' },
    'נשאל הכי הרבה': { bg: '#8a6020', text: '#ffffff' },
  }
  const badge = category.badge ? badgeColors[category.badge] || { bg: '#1A3554', text: '#ffffff' } : null

  return (
    <div
      className="hover:-translate-y-1 transition-all duration-300"
      style={{
        background: '#ffffff',
        border: '1px solid rgba(0,0,0,0.07)',
        borderTop: '3px solid #C4883A',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        opacity: revealed ? 1 : 0,
        transform: revealed ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.6s ease ${revealDelay}ms, transform 0.6s ease ${revealDelay}ms, box-shadow 0.3s ease`,
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 28px rgba(26,53,84,0.12)'; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)'; }}
    >
      <div
        style={{
          background: '#f4f7f9',
          borderBottom: '1px solid rgba(0,0,0,0.05)',
          padding: '20px 28px',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexDirection: 'row' }}>
          <span style={{ fontSize: '28px' }}>{category.icon}</span>
          <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#1A3554' }}>{category.title}</h3>
        </div>
        {badge && (
          <span style={{
            fontSize: '10px', fontWeight: 700, letterSpacing: '0.05em',
            backgroundColor: badge.bg, color: badge.text,
            padding: '2px 8px', borderRadius: '100px', whiteSpace: 'nowrap', flexShrink: 0, marginTop: '2px',
          }}>
            {category.badge}
          </span>
        )}
      </div>
      <div style={{ padding: '28px 32px', flex: 1 }}>
        {category.items ? (
          <>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '14px', listStyle: 'none' }}>
              {category.items.map((item, i) => (
                <li key={i} style={{ display: 'flex', gap: '10px', flexDirection: 'row', textAlign: isRTL ? 'right' : 'left' }}>
                  <CheckIcon />
                  <span style={{ fontSize: '14px', color: '#555555', lineHeight: 1.75 }}>{item}</span>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {category.subGroups.map((group, gi) => (
              <div key={gi}>
                <h4 style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#1A3554', marginBottom: '12px', paddingBottom: '8px', borderBottom: '1px solid rgba(0,0,0,0.05)', textAlign: isRTL ? 'right' : 'left' }}>
                  {group.label}
                </h4>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '14px', listStyle: 'none' }}>
                  {group.items.map((item, i) => (
                    <li key={i} style={{ display: 'flex', gap: '10px', flexDirection: 'row', textAlign: isRTL ? 'right' : 'left' }}>
                      <CheckIcon />
                      <span style={{ fontSize: '14px', color: '#555555', lineHeight: 1.75 }}>{item}</span>
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
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(135deg, #0D1E2F 0%, #1A3554 100%)',
          backgroundSize: '32px 32px, cover',
          paddingTop: '160px',
          paddingBottom: '80px',
        }}
      >
        <div style={{ ...narrowContainer, textAlign: 'center' }}>
          <span className="hero-animate hero-delay-1 inline-block" style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C4883A', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: '100px', padding: '6px 16px', marginBottom: '24px', display: 'inline-block' }}>
            {t.hero.eyebrow}
          </span>
          <h1 className="hero-animate hero-delay-2" style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', fontWeight: 800, color: '#ffffff', lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: '20px' }}>
            {t.hero.heading}
          </h1>
          <p className="hero-animate hero-delay-3" style={{ fontSize: '17px', color: '#B0C8E0', lineHeight: 1.7 }}>{t.hero.subheading}</p>
        </div>
      </section>

      {/* Services grid */}
      <section style={{ backgroundColor: '#f4f7f9', paddingTop: '96px', paddingBottom: '96px' }}>
        <div style={container}>
          <div ref={gridRef}>
            <div style={{ textAlign: isRTL ? 'right' : 'left', marginBottom: '48px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C4883A' }}>
                {isRTL ? 'מה כלול' : "What's Included"}
              </span>
              <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: 800, color: '#1A3554', lineHeight: 1.2, marginTop: '8px' }}>
                {isRTL ? 'השירותים שלנו' : 'Our Services'}
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(480px, 100%), 1fr))', gap: '24px' }}>
              {t.categories.map((cat, i) => (
                <ServiceCard key={cat.id} category={cat} isRTL={isRTL} revealDelay={Math.min(i * 80, 400)} revealed={gridRevealed} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <FinalCTA
        headingOverride={isRTL
          ? 'לא בטוחים איזה שירות מתאים לכם? נשמח לעזור.'
          : "Not sure which service fits your situation? We're happy to help."}
        ctaOverride={isRTL ? 'לקביעת פגישת ייעוץ' : 'Book a Consultation'}
      />
    </main>
  )
}
