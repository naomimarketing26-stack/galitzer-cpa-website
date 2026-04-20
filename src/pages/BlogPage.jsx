import { useLang } from '../context/LanguageContext'
import { content } from '../data/content'
import { useReveal } from '../hooks/useReveal'

const container = {
  maxWidth: '1200px',
  margin: '0 auto',
  paddingLeft: 'clamp(24px, 5vw, 80px)',
  paddingRight: 'clamp(24px, 5vw, 80px)',
}

export default function BlogPage() {
  const { lang } = useLang()
  const t = content[lang].blog
  const isRTL = lang === 'he'
  const [infoCenterRef, infoCenterRevealed] = useReveal()
  const [resourcesRef, resourcesRevealed] = useReveal()

  return (
    <main>
      {/* Hero */}
      <section style={{ background: '#276e7d', paddingTop: '160px', paddingBottom: '80px', backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', paddingLeft: 'clamp(24px, 5vw, 80px)', paddingRight: 'clamp(24px, 5vw, 80px)', textAlign: isRTL ? 'right' : 'center' }}>
          <span className="hero-animate hero-delay-1 inline-block" style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#7ed957', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '100px', padding: '6px 16px', marginBottom: '24px', display: 'inline-block' }}>{t.eyebrow}</span>
          <h1 className="hero-animate hero-delay-2" style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', fontWeight: 800, color: '#ffffff', lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: '20px' }}>{t.heading}</h1>
          <p className="hero-animate hero-delay-3" style={{ fontSize: '17px', color: '#c8e8ed', lineHeight: 1.7, maxWidth: '560px', margin: isRTL ? '0 0 0 auto' : '0 auto' }}>{t.subheading}</p>
        </div>
      </section>

      {/* Info Center */}
      <section style={{ backgroundColor: '#f4f7f9', paddingTop: '96px', paddingBottom: '96px' }}>
        <div ref={infoCenterRef} style={{ ...container, opacity: infoCenterRevealed ? 1 : 0, transform: infoCenterRevealed ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}>
          <div style={{ marginBottom: '64px', textAlign: isRTL ? 'right' : 'center' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#276e7d', marginBottom: '12px' }}>{t.infoCenter.title}</h2>
            <p style={{ fontSize: '16px', color: '#555555', marginBottom: '0' }}>{t.infoCenter.subtitle}</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {t.infoCenter.links.map((link, i) => (
              <a
                key={i}
                href="#"
                style={{
                  background: '#ffffff',
                  border: '1px solid #e2e2e2',
                  borderRadius: '16px',
                  padding: '24px',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  textAlign: isRTL ? 'right' : 'left',
                  cursor: 'default',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#276e7d'
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(39,110,125,0.1)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#e2e2e2'
                  e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.05)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <span style={{ fontSize: '28px' }}>{link.icon}</span>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#276e7d', margin: '0' }}>{link.name}</h3>
                <p style={{ fontSize: '14px', color: '#666666', margin: '0' }}>{link.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section style={{ backgroundColor: '#ffffff', paddingTop: '96px', paddingBottom: '96px' }}>
        <div ref={resourcesRef} style={{ ...container, opacity: resourcesRevealed ? 1 : 0, transform: resourcesRevealed ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}>
          <div style={{ marginBottom: '64px', textAlign: isRTL ? 'right' : 'center' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#276e7d', marginBottom: '12px' }}>
              {lang === 'en' ? 'Downloadable Resources' : 'משאבים להורדה'}
            </h2>
            <p style={{ fontSize: '16px', color: '#555555', marginBottom: '0' }}>
              {lang === 'en' ? 'Guides and checklists to help you prepare for tax filing and planning.' : 'הדרכים ורשימות ביקורת שיעזרו לכם להכין עצמכם להגשת מסים ותכנון.'}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {t.resources.map((resource, i) => (
              <a
                key={i}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: '#f9f9f9',
                  border: '1px solid #e2e2e2',
                  borderRadius: '16px',
                  padding: '32px',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  textAlign: isRTL ? 'right' : 'left',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#7ed957'
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(126,217,87,0.15)'
                  e.currentTarget.style.background = '#fefffe'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#e2e2e2'
                  e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.05)'
                  e.currentTarget.style.background = '#f9f9f9'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                  <svg style={{ width: '24px', height: '24px', color: '#7ed957', flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#276e7d', margin: '0' }}>{resource.title}</h3>
                </div>
                <p style={{ fontSize: '14px', color: '#666666', margin: '0' }}>{resource.desc}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px', color: '#7ed957', fontSize: '14px', fontWeight: 600, flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                  <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  {lang === 'en' ? 'Download PDF' : 'הוריד PDF'}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{ backgroundColor: '#e8f4f6', paddingTop: '80px', paddingBottom: '80px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', paddingLeft: 'clamp(24px, 5vw, 80px)', paddingRight: 'clamp(24px, 5vw, 80px)', textAlign: isRTL ? 'right' : 'center' }}>
          <p style={{ fontSize: '22px', fontWeight: 700, color: '#276e7d', marginBottom: '12px' }}>
            {lang === 'en' ? 'Need More Help?' : 'צריך עזרה נוספת?'}
          </p>
          <p style={{ fontSize: '16px', color: '#555555', lineHeight: 1.7, marginBottom: '32px' }}>
            {lang === 'en'
              ? 'Our team is here to answer your questions and guide you through your cross-border tax situation.'
              : 'הצוות שלנו כאן לענות על שאלות שלכם ולהנחות אתכם דרך מצב המיסוי הבינלאומי שלכם.'}
          </p>
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
            onMouseEnter={e => {
              e.currentTarget.style.background = '#65c040'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = '#7ed957'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            {lang === 'en' ? 'Schedule a Consultation' : 'קבע ייעוץ'}
          </a>
        </div>
      </section>
    </main>
  )
}
