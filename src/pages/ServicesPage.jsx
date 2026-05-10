import { useState } from 'react'
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

const PREVIEW_COUNT = 4

function ServiceCard({ category, isRTL, revealDelay, revealed }) {
  const [expanded, setExpanded] = useState(false)
  const allItems = category.items || category.subGroups?.flatMap(g => g.items) || []
  const showToggle = allItems.length > PREVIEW_COUNT

  const badgeColors = {
    'Most Popular': { bg: '#1A3554', text: '#ffffff' },
    'Comprehensive': { bg: '#0F2B47', text: '#B0C8E0' },
    'For Professionals': { bg: '#276e4a', text: '#ffffff' },
    'Most Asked': { bg: '#8a6020', text: '#ffffff' },
    'הנפוץ ביותר': { bg: '#1A3554', text: '#ffffff' },
    'מקיף': { bg: '#0F2B47', text: '#B0C8E0' },
    'לעסקים': { bg: '#276e4a', text: '#ffffff' },
    'נשאל הכי הרבה': { bg: '#8a6020', text: '#ffffff' },
  }
  const badge = category.badge ? badgeColors[category.badge] || { bg: '#1A3554', text: '#ffffff' } : null

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
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 28px rgba(26,53,84,0.12)'; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.05)'; }}
    >
      <div
        style={{
          background: category.color === 'bg-[#e8f4f6]' ? '#e8f4f6' : '#f4f7f9',
          borderBottom: '1px solid #eef1f4',
          padding: '20px 28px',
          display: 'flex',
          alignItems: 'center',
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
            fontSize: '11px', fontWeight: 700, letterSpacing: '0.06em',
            backgroundColor: badge.bg, color: badge.text,
            padding: '4px 10px', borderRadius: '100px', whiteSpace: 'nowrap', flexShrink: 0,
          }}>
            {category.badge}
          </span>
        )}
      </div>
      <div style={{ padding: '24px 28px', flex: 1 }}>
        {category.items ? (
          <>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', listStyle: 'none' }}>
              {(expanded ? category.items : category.items.slice(0, PREVIEW_COUNT)).map((item, i) => (
                <li key={i} style={{ display: 'flex', gap: '10px', flexDirection: 'row', textAlign: isRTL ? 'right' : 'left' }}>
                  <CheckIcon />
                  <span style={{ fontSize: '14px', color: '#555555', lineHeight: 1.6 }}>{item}</span>
                </li>
              ))}
            </ul>
            {showToggle && (
              <button
                onClick={() => setExpanded(e => !e)}
                style={{ marginTop: '16px', fontSize: '13px', fontWeight: 600, color: '#C4883A', background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                {expanded ? (isRTL ? '▲ הצג פחות' : 'Show less ▲') : (isRTL ? '▼ הצג הכל' : 'Show all ↓')}
              </button>
            )}
          </>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {category.subGroups.map((group, gi) => (
              <div key={gi}>
                <h4 style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#1A3554', marginBottom: '12px', paddingBottom: '8px', borderBottom: '1px solid #eef1f4', textAlign: isRTL ? 'right' : 'left' }}>
                  {group.label}
                </h4>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', listStyle: 'none' }}>
                  {group.items.map((item, i) => (
                    <li key={i} style={{ display: 'flex', gap: '10px', flexDirection: 'row', textAlign: isRTL ? 'right' : 'left' }}>
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
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))', gap: '24px' }}>
              {t.categories.map((cat, i) => (
                <ServiceCard key={cat.id} category={cat} isRTL={isRTL} revealDelay={Math.min(i * 80, 400)} revealed={gridRevealed} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mid CTA */}
      <section style={{ backgroundColor: '#ffffff', borderTop: '1px solid #eef1f4', borderBottom: '1px solid #eef1f4', paddingTop: '80px', paddingBottom: '80px' }}>
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
          <p style={{ fontSize: isRTL ? '22px' : '18px', fontWeight: 700, color: '#1A3554', marginBottom: '24px' }}>
            {isRTL ? 'לא בטוחים איזה שירות מתאים לכם? נשמח לעזור.' : "Not sure which service fits your situation? We're happy to help."}
          </p>
          <a
            href="/contact"
            style={{ display: 'inline-flex', alignItems: 'center', background: '#C4883A', color: '#ffffff', fontWeight: 700, fontSize: '15px', padding: '14px 40px', borderRadius: '10px', textDecoration: 'none', boxShadow: '0 4px 16px rgba(196,136,58,0.3)', transition: 'all 0.2s ease' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#A96F25'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#C4883A'; e.currentTarget.style.transform = 'translateY(0)'; }}
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
