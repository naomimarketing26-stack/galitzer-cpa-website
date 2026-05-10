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

export default function AboutPage() {
  const { lang } = useLang()
  const t = pages[lang].about
  const isRTL = lang === 'he'

  const [introRef, introRevealed] = useReveal()
  const [bodyRef, bodyRevealed] = useReveal()
  const [valuesRef, valuesRevealed] = useReveal()

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
          <span
            className="hero-animate hero-delay-1 inline-block"
            style={{
              fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
              color: '#C4883A', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.18)',
              borderRadius: '100px', padding: '6px 16px', marginBottom: '24px', display: 'inline-block',
            }}
          >
            {t.hero.eyebrow}
          </span>
          <h1
            className="hero-animate hero-delay-2"
            style={{
              fontSize: 'clamp(32px, 4.5vw, 56px)', fontWeight: 800, color: '#ffffff',
              lineHeight: 1.15, letterSpacing: '-0.02em',
            }}
          >
            {t.hero.heading}
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section style={{ backgroundColor: '#ffffff', paddingTop: '96px', paddingBottom: '96px' }}>
        <div style={narrowContainer}>
          <div
            ref={introRef}
            style={{
              opacity: introRevealed ? 1 : 0,
              transform: introRevealed ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease',
            }}
          >
            <p style={{ fontSize: '20px', fontWeight: 600, color: '#1A3554', lineHeight: 1.65, marginBottom: '28px', textAlign: isRTL ? 'right' : 'left' }}>
              {t.intro}
            </p>
          </div>
          <div
            ref={bodyRef}
            style={{
              opacity: bodyRevealed ? 1 : 0,
              transform: bodyRevealed ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
            }}
          >
            {t.body.map((para, i) => (
              <p key={i} style={{ fontSize: '16px', color: '#555555', lineHeight: 1.8, marginBottom: '20px', textAlign: isRTL ? 'right' : 'left' }}>
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ backgroundColor: '#f4f7f9', paddingTop: '96px', paddingBottom: '96px' }}>
        <div style={container}>
          <div
            ref={valuesRef}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}
          >
            {t.values.map((v, i) => (
              <div
                key={i}
                className="hover:-translate-y-1 transition-all duration-300"
                style={{
                  background: '#ffffff',
                  border: '1px solid #eef1f4',
                  borderRadius: '16px',
                  padding: '32px',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
                  textAlign: isRTL ? 'right' : 'left',
                  opacity: valuesRevealed ? 1 : 0,
                  transform: valuesRevealed ? 'translateY(0)' : 'translateY(24px)',
                  transition: `opacity 0.6s ease ${i * 80}ms, transform 0.6s ease ${i * 80}ms, box-shadow 0.3s ease`,
                }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 28px rgba(39,110,125,0.12)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.05)'; }}
              >
                <div style={{ fontSize: '32px', marginBottom: '16px' }}>{v.icon}</div>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#1A3554', marginBottom: '10px' }}>{v.title}</h3>
                <p style={{ fontSize: '14px', color: '#666666', lineHeight: 1.65 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA
        headingOverride={isRTL ? 'דברו איתנו — ועשו סדר במיסים שלכם' : undefined}
        ctaOverride={isRTL ? 'קבעו שיחה' : undefined}
      />
    </main>
  )
}
