import { useLang } from '../context/LanguageContext'
import { content } from '../data/content'

const cx = (base, ...classes) => [base, ...classes].filter(Boolean).join(' ')

export default function Hero() {
  const { lang } = useLang()
  const t = content[lang].hero
  const trust = content[lang].trust
  const isRTL = lang === 'he'

  return (
    <section
      style={{
        background: '#276e7d',
        paddingTop: '160px',
        paddingBottom: '0',
        overflow: 'hidden',
        position: 'relative',
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }}
    >
      {/* Subtle glow accents */}
      <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(126,217,87,0.08)', filter: 'blur(80px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '0', left: '-60px', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)', filter: 'blur(60px)', pointerEvents: 'none' }} />

      {/* Main content — centered single column */}
      <div
        style={{
          maxWidth: '820px',
          margin: '0 auto',
          paddingLeft: 'clamp(24px, 5vw, 80px)',
          paddingRight: 'clamp(24px, 5vw, 80px)',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        {/* Eyebrow */}
        <span
          className="hero-animate hero-delay-1 inline-block"
          style={{
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#7ed957',
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '100px',
            padding: '6px 16px',
            marginBottom: '28px',
            display: 'inline-block',
          }}
        >
          {t.eyebrow}
        </span>

        {/* H1 */}
        <h1
          className="hero-animate hero-delay-2"
          style={{
            fontSize: 'clamp(36px, 5.5vw, 68px)',
            fontWeight: 800,
            color: '#ffffff',
            lineHeight: 1.12,
            letterSpacing: '-0.025em',
            marginBottom: '24px',
          }}
        >
          {t.heading}
        </h1>

        {/* Subheading */}
        <p
          className="hero-animate hero-delay-3"
          style={{
            fontSize: '18px',
            color: '#c8e8ed',
            lineHeight: 1.7,
            marginBottom: '40px',
            maxWidth: '560px',
            margin: isRTL ? '0 0 40px auto' : '0 auto 40px',
          }}
        >
          {t.subheading}
        </p>

        {/* CTA Buttons */}
        <div
          className="hero-animate hero-delay-4"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            justifyContent: 'center',
            marginBottom: '0',
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
              padding: '14px 36px',
              borderRadius: '10px',
              boxShadow: '0 4px 20px rgba(126,217,87,0.35)',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#65c040'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#7ed957'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            {t.cta}
          </a>
          <a
            href="/services"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: 'transparent',
              color: '#ffffff',
              fontWeight: 600,
              fontSize: '15px',
              padding: '14px 36px',
              borderRadius: '10px',
              border: '1.5px solid rgba(255,255,255,0.35)',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.8)'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'; e.currentTarget.style.background = 'transparent'; }}
          >
            {t.ctaSecondary}
          </a>
        </div>
      </div>

      {/* Trust Stats Bar */}
      <div
        className="hero-animate hero-delay-5"
        style={{
          marginTop: '72px',
          borderTop: '1px solid rgba(255,255,255,0.15)',
          paddingTop: '40px',
          paddingBottom: '40px',
          position: 'relative',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            paddingLeft: 'clamp(24px, 5vw, 80px)',
            paddingRight: 'clamp(24px, 5vw, 80px)',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '16px',
          }}
        >
          {trust.map((item, i) => (
            <div
              key={i}
              style={{ textAlign: 'center' }}
            >
              <div style={{ fontSize: '26px', fontWeight: 800, color: '#ffffff', lineHeight: 1.2 }}>
                {item.value}
              </div>
              <div style={{ fontSize: '13px', color: '#a8d8df', marginTop: '4px', letterSpacing: '0.01em' }}>
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
