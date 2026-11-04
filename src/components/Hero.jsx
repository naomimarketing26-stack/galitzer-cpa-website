import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'
import { content } from '../data/content'

/* Parses a stat value string into { number, prefix, suffix }
   e.g. "40+"  → { number: 40,   prefix: '',  suffix: '+' }
        "1,000+"→ { number: 1000, prefix: '',  suffix: '+' }
        "+40"   → { number: 40,   prefix: '+', suffix: '' }
        "Licensed" → null (not numeric) */
function parseStatValue(value) {
  const cleaned = value.replace(/,/g, '')
  const match = cleaned.match(/^(\D*)(\d+)(\D*)$/)
  if (!match) return null
  return { number: parseInt(match[2], 10), prefix: match[1], suffix: match[3] }
}

function formatNumber(n) {
  return n >= 1000 ? n.toLocaleString('en-US') : String(n)
}

/* Animated counter — counts from 0 to `target` over `duration`ms once `active` is true */
function CountUp({ value, active }) {
  const parsed = parseStatValue(value)
  const [display, setDisplay] = useState(parsed ? `${parsed.prefix}0${parsed.suffix}` : value)

  // Keep non-numeric text in sync when language changes
  useEffect(() => {
    if (!parsed) setDisplay(value)
  }, [value])

  useEffect(() => {
    if (!parsed) return
    // Reset to 0 when leaving viewport
    if (!active) { setDisplay(`${parsed.prefix}0${parsed.suffix}`); return }
    const { number, prefix, suffix } = parsed
    const duration = 1800
    const start = performance.now()
    let raf
    const step = (now) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(eased * number)
      setDisplay(`${prefix}${formatNumber(current)}${suffix}`)
      if (progress < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [active])

  return <>{display}</>
}

export default function Hero() {
  const { lang } = useLang()
  const t = content[lang].hero
  const isRTL = lang === 'he'
  // Trigger count-up when stats strip scrolls into view
  const statsRef = useRef(null)
  const [statsActive, setStatsActive] = useState(false)
  useEffect(() => {
    const el = statsRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { setStatsActive(entry.isIntersecting) },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      style={{
        /* Hero photo — all layers combined to avoid CSS property override */
        background: "linear-gradient(rgba(13,30,47,0.72), rgba(26,53,84,0.78)), radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px), url('/hero-bg.jpg'), linear-gradient(135deg, #0D1E2F 0%, #1A3554 100%)",
        backgroundSize: 'cover, 32px 32px, cover, auto',
        backgroundPosition: 'center, center, center, center',
        backgroundRepeat: 'no-repeat, repeat, no-repeat, no-repeat',
        paddingTop: 'clamp(100px, 18vw, 200px)',
        paddingBottom: '0',
        overflow: 'visible',
        position: 'relative',
      }}
    >
      {/* Glow accents */}
      <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '500px', height: '500px', borderRadius: '50%', background: 'rgba(196,136,58,0.07)', filter: 'blur(100px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '0', left: '-60px', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)', filter: 'blur(60px)', pointerEvents: 'none' }} />

      {/* Main content */}
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
            color: '#C4883A',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.2)',
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
            marginBottom: '16px',
          }}
        >
          {t.heading}
        </h1>
        {/* Animated gold underline accent */}
        <div
          className="hero-animate hero-delay-2"
          style={{
            width: '64px',
            height: '3px',
            background: 'linear-gradient(90deg, #C4883A, #E4A855)',
            borderRadius: '100px',
            margin: '0 auto 24px',
            animation: 'underlineGrow 0.9s cubic-bezier(0.4,0,0.2,1) 0.4s both',
            transformOrigin: 'center',
          }}
        />

        {/* Subheading */}
        <p
          className="hero-animate hero-delay-3"
          style={{
            fontSize: '18px',
            color: '#B0C8E0',
            lineHeight: 1.7,
            maxWidth: '560px',
            margin: '0 auto 40px',
            textAlign: 'center',
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
          }}
        >
          <Link
            to="/contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: '#C4883A',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '15px',
              padding: '14px 36px',
              borderRadius: '100px',
              boxShadow: '0 4px 20px rgba(196,136,58,0.4)',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#A96F25'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(196,136,58,0.5)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#C4883A'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(196,136,58,0.4)'; }}
          >
            {t.cta}
          </Link>
          <Link
            to="/services"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: 'transparent',
              color: '#ffffff',
              fontWeight: 600,
              fontSize: '15px',
              padding: '14px 36px',
              borderRadius: '100px',
              border: '1.5px solid rgba(255,255,255,0.35)',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.8)'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'; e.currentTarget.style.background = 'transparent'; }}
          >
            {t.ctaSecondary}
          </Link>
        </div>
      </div>

      {/* Trust Bar — medium weight, sits at bottom of dark hero */}
      <div
        ref={statsRef}
        className="hero-animate hero-delay-5"
        style={{
          marginTop: '64px',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          paddingTop: '32px',
          paddingBottom: '32px',
        }}
      >
        <div
          className="trust-grid"
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            paddingLeft: 'clamp(24px, 5vw, 80px)',
            paddingRight: 'clamp(24px, 5vw, 80px)',
          }}
        >
          {content[lang].trust.map((item, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 'clamp(20px, 5.5vw, 24px)', fontWeight: 800, color: '#ffffff', lineHeight: 1.2 }}>
                <CountUp value={item.value} active={statsActive} />
              </div>
              <div style={{ fontSize: '13px', color: '#8AA8C5', marginTop: '6px', letterSpacing: '0.01em' }}>
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
