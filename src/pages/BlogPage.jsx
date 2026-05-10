import { useState } from 'react'
import { useLang } from '../context/LanguageContext'
import { content } from '../data/content'
import { useReveal } from '../hooks/useReveal'

const container = {
  maxWidth: '1200px',
  margin: '0 auto',
  paddingLeft: 'clamp(24px, 5vw, 80px)',
  paddingRight: 'clamp(24px, 5vw, 80px)',
}

const TABS = {
  en: ['All', 'US', 'Israel', 'Guides'],
  he: ['הכל', 'ארה״ב', 'ישראל', 'מדריכים'],
}

const featuredLinks = {
  en: [
    { name: 'Internal Revenue Service (IRS)', desc: 'Official U.S. tax guidance and forms', url: 'https://www.irs.gov', flag: '🇺🇸', bg: '#1A3554', tab: 'US' },
    { name: 'Israel Income Tax Authority', desc: 'Israeli income tax and compliance information', url: 'https://www.gov.il/en/departments/israel_tax_authority', flag: '🇮🇱', bg: '#1a5c3a', tab: 'Israel' },
  ],
  he: [
    { name: 'Internal Revenue Service (IRS)', desc: 'הנחיות ובקשות מס רשמיות של ארה"ב', url: 'https://www.irs.gov', flag: '🇺🇸', bg: '#1A3554', tab: 'ארה״ב' },
    { name: 'רשות המסים בישראל', desc: 'מידע על מס הכנסה ועמידה בדרישות ישראל', url: 'https://www.gov.il/he/departments/israel_tax_authority', flag: '🇮🇱', bg: '#1a5c3a', tab: 'ישראל' },
  ],
}

const listLinks = {
  en: [
    { name: 'U.S. Social Security Administration', desc: 'Retirement benefits and eligibility', url: 'https://www.ssa.gov', flag: '📋', tab: 'US' },
    { name: 'Israeli National Insurance Authority (Bituach Leumi)', desc: 'Israeli social security and benefits', url: 'https://www.btl.gov.il', flag: '🛡️', tab: 'Israel' },
  ],
  he: [
    { name: 'Social Security Administration', desc: 'הטבות פרישה ותנאי זכאות בארה"ב', url: 'https://www.ssa.gov', flag: '📋', tab: 'ארה״ב' },
    { name: 'המוסד לביטוח לאומי', desc: 'ביטוח לאומי וגמלאות בישראל', url: 'https://www.btl.gov.il', flag: '🛡️', tab: 'ישראל' },
  ],
}

export default function BlogPage() {
  const { lang } = useLang()
  const t = content[lang].blog
  const isRTL = lang === 'he'
  const tabs = TABS[lang]
  const [activeTab, setActiveTab] = useState(tabs[0])
  const [infoCenterRef, infoCenterRevealed] = useReveal()
  const [resourcesRef, resourcesRevealed] = useReveal()

  const isAllTab = activeTab === tabs[0]
  const isGuidesTab = activeTab === tabs[3]
  const featured = featuredLinks[lang].filter(l => isGuidesTab ? false : isAllTab ? true : l.tab === activeTab)
  const list = listLinks[lang].filter(l => isGuidesTab ? false : isAllTab ? true : l.tab === activeTab)

  return (
    <main>
      {/* Hero */}
      <section style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(135deg, #0D1E2F 0%, #1A3554 100%)', backgroundSize: '32px 32px, cover', paddingTop: '160px', paddingBottom: '80px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', paddingLeft: 'clamp(24px, 5vw, 80px)', paddingRight: 'clamp(24px, 5vw, 80px)', textAlign: 'center' }}>
          <span className="hero-animate hero-delay-1 inline-block" style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C4883A', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: '100px', padding: '6px 16px', marginBottom: '24px', display: 'inline-block' }}>{t.eyebrow}</span>
          <h1 className="hero-animate hero-delay-2" style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', fontWeight: 800, color: '#ffffff', lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: '20px' }}>{t.heading}</h1>
          <p className="hero-animate hero-delay-3" style={{ fontSize: '17px', color: '#B0C8E0', lineHeight: 1.7, maxWidth: '560px', margin: '0 auto' }}>{t.subheading}</p>
        </div>
      </section>

      {/* Info Center */}
      <section style={{ backgroundColor: '#ffffff', paddingTop: '80px', paddingBottom: '80px' }}>
        <div ref={infoCenterRef} style={{ ...container, opacity: infoCenterRevealed ? 1 : 0, transform: infoCenterRevealed ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}>
          <div style={{ marginBottom: '32px', textAlign: isRTL ? 'right' : 'left' }}>
            <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#1A3554', marginBottom: '6px' }}>{t.infoCenter.title}</h2>
            <p style={{ fontSize: '14px', color: '#777777', marginBottom: '0' }}>{t.infoCenter.subtitle}</p>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '28px', flexDirection: 'row' }}>
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '6px 18px',
                  borderRadius: '100px',
                  border: '1px solid',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  backgroundColor: activeTab === tab ? '#1A3554' : '#ffffff',
                  borderColor: activeTab === tab ? '#1A3554' : '#e2e2e2',
                  color: activeTab === tab ? '#ffffff' : '#555555',
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {!isGuidesTab ? (
            <>
              {/* Featured cards */}
              {featured.length > 0 && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '16px' }}>
                  {featured.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        backgroundColor: link.bg,
                        borderRadius: '16px',
                        padding: '28px',
                        textDecoration: 'none',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        transition: 'all 0.2s ease',
                        textAlign: isRTL ? 'right' : 'left',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                      onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)'; }}
                    >
                      <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>{link.tab}</span>
                      <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#ffffff', margin: '0' }}>{link.name}</h3>
                      <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', margin: '0' }}>{link.desc}</p>
                      <span style={{ fontSize: '13px', fontWeight: 600, color: '#C4883A', marginTop: '4px' }}>
                        {lang === 'en' ? '↗ Visit Site' : '↗ בקר באתר'}
                      </span>
                    </a>
                  ))}
                </div>
              )}

              {/* List items */}
              {list.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '16px 20px',
                    borderRadius: '12px',
                    border: '1px solid #eef1f4',
                    backgroundColor: '#f9fafb',
                    textDecoration: 'none',
                    marginBottom: '10px',
                    transition: 'all 0.2s ease',
                    flexDirection: 'row',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#1A3554'; e.currentTarget.style.backgroundColor = '#ffffff'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#eef1f4'; e.currentTarget.style.backgroundColor = '#f9fafb'; }}
                >
                  <span style={{ fontSize: '22px' }}>{link.flag}</span>
                  <div style={{ flex: 1, textAlign: isRTL ? 'right' : 'left' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#1A3554', margin: '0 0 2px' }}>{link.name}</h4>
                    <p style={{ fontSize: '13px', color: '#777777', margin: '0' }}>{link.desc}</p>
                  </div>
                  <span style={{ fontSize: '18px', color: '#cccccc' }}>›</span>
                </a>
              ))}
            </>
          ) : (
            <p style={{ color: '#777777', fontSize: '15px', textAlign: isRTL ? 'right' : 'center', padding: '40px 0' }}>
              {lang === 'en' ? 'Guides coming soon.' : 'מדריכים יתווספו בקרוב.'}
            </p>
          )}
        </div>
      </section>

      {/* Downloadable Guides */}
      <section style={{ backgroundColor: '#f4f7f9', paddingTop: '80px', paddingBottom: '80px' }}>
        <div ref={resourcesRef} style={{ ...container, opacity: resourcesRevealed ? 1 : 0, transform: resourcesRevealed ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px', flexDirection: 'row' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#1A3554', margin: '0' }}>
              {lang === 'en' ? 'Downloadable Guides' : 'מדריכים להורדה'}
            </h2>
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', backgroundColor: '#C4883A', color: '#ffffff', padding: '3px 10px', borderRadius: '100px' }}>PDF</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {t.resources.map((resource, i) => (
              <a
                key={i}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: '#ffffff',
                  border: '1px solid #eef1f4',
                  borderRadius: '14px',
                  padding: '20px 24px',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  transition: 'all 0.2s ease',
                  flexDirection: 'row',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#C4883A'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(196,136,58,0.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#eef1f4'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#FFF4E6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg style={{ width: '20px', height: '20px', color: '#C4883A' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div style={{ flex: 1, textAlign: isRTL ? 'right' : 'left' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#1A3554', margin: '0 0 4px' }}>{resource.title}</h3>
                  <p style={{ fontSize: '13px', color: '#777777', margin: '0' }}>{resource.desc}</p>
                </div>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#C4883A', whiteSpace: 'nowrap', flexShrink: 0 }}>
                  {lang === 'en' ? 'Download' : 'הורד'}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{ backgroundColor: '#0D1E2F', paddingTop: '80px', paddingBottom: '80px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', paddingLeft: 'clamp(24px, 5vw, 80px)', paddingRight: 'clamp(24px, 5vw, 80px)', textAlign: isRTL ? 'right' : 'center' }}>
          <p style={{ fontSize: '26px', fontWeight: 800, color: '#ffffff', marginBottom: '12px' }}>
            {lang === 'en' ? 'Need More Help?' : 'צריכים עזרה נוספת?'}
          </p>
          <p style={{ fontSize: '16px', color: '#B0C8E0', lineHeight: 1.7, marginBottom: '32px' }}>
            {lang === 'en'
              ? 'Our team is here to answer your questions and guide you through your cross-border tax situation.'
              : 'הצוות שלנו כאן לענות על שאלות שלכם ולהנחות אתכם דרך מצב המיסוי הבינלאומי שלכם.'}
          </p>
          <a
            href="/contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: '#C4883A',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '15px',
              padding: '14px 40px',
              borderRadius: '10px',
              textDecoration: 'none',
              boxShadow: '0 4px 16px rgba(196,136,58,0.3)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#A96F25'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#C4883A'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            {lang === 'en' ? 'Schedule a Consultation' : 'קבע ייעוץ'}
          </a>
        </div>
      </section>
    </main>
  )
}
