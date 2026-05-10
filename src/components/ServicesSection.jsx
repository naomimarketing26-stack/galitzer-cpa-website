import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'
import { content } from '../data/content'
import { useReveal } from '../hooks/useReveal'

const container = {
  maxWidth: '1200px',
  margin: '0 auto',
  paddingLeft: 'clamp(24px, 5vw, 80px)',
  paddingRight: 'clamp(24px, 5vw, 80px)',
}

/* ── SVG line icons — one per service ── */
const ServiceIcons = [
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14,2 14,8 20,8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <line x1="10" y1="9" x2="8" y2="9"/>
  </svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="20" width="20" height="1" rx="0.5"/>
    <rect x="4" y="11" width="3" height="9"/>
    <rect x="10.5" y="11" width="3" height="9"/>
    <rect x="17" y="11" width="3" height="9"/>
    <polygon points="12,3 2,11 22,11"/>
  </svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"/>
    <line x1="12" y1="20" x2="12" y2="4"/>
    <line x1="6" y1="20" x2="6" y2="14"/>
    <line x1="2" y1="20" x2="22" y2="20"/>
  </svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2"/>
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
  </svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <polyline points="9,12 11,14 15,10"/>
  </svg>,
]

const AUTOPLAY_MS = 4000
const CARD_W = 64 /* % — smaller so peek is more visible and cards feel square-ish */
const GAP = 24   /* px gap between cards */

function NavBtn({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      style={{
        flexShrink: 0,
        width: '44px', height: '44px',
        borderRadius: '50%',
        background: '#ffffff',
        border: '1.5px solid #E2E8F0',
        boxShadow: '0 2px 8px rgba(26,53,84,0.08)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer',
        color: '#1A3554',
        fontSize: '18px',
        lineHeight: 1,
        transition: 'all 0.2s ease',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = '#C4883A'; e.currentTarget.style.color = '#C4883A'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(196,136,58,0.2)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.color = '#1A3554'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(26,53,84,0.08)'; }}
    >
      {children}
    </button>
  )
}

export default function ServicesSection() {
  const { lang } = useLang()
  const t = content[lang].services
  const isRTL = lang === 'he'
  const items = t.items
  const total = items.length

  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const dragStart = useRef(null)

  const [headerRef, headerRevealed] = useReveal()
  const [carouselRef, carouselRevealed] = useReveal()

  const goTo = useCallback((idx) => {
    setCurrent(((idx % total) + total) % total)
  }, [total])

  const next = useCallback(() => goTo(current + 1), [current, goTo])
  const prev = useCallback(() => goTo(current - 1), [current, goTo])

  useEffect(() => {
    if (paused) return
    const id = setInterval(next, AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [paused, next])

  const onPointerDown = (e) => { dragStart.current = e.clientX }
  const onPointerUp = (e) => {
    if (dragStart.current === null) return
    const delta = e.clientX - dragStart.current
    if (Math.abs(delta) > 40) { delta < 0 ? next() : prev(); setPaused(true) }
    dragStart.current = null
  }

  return (
    <section
      style={{ backgroundColor: '#f4f7f9', paddingTop: '96px', paddingBottom: '96px' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div style={container}>

        {/* Header */}
        <div
          ref={headerRef}
          style={{
            textAlign: 'center',
            marginBottom: '48px',
            opacity: headerRevealed ? 1 : 0,
            transform: headerRevealed ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 700, color: '#1A3554', lineHeight: 1.25, marginBottom: '14px' }}>
            {t.heading}
          </h2>
          <p style={{ fontSize: '17px', color: '#666666', lineHeight: 1.7, maxWidth: '520px', margin: '0 auto' }}>
            {t.subheading}
          </p>
        </div>

        {/* Carousel */}
        <div
          ref={carouselRef}
          style={{
            opacity: carouselRevealed ? 1 : 0,
            transform: carouselRevealed ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          {/* Row: [Prev] [Track] [Next] */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>

            {/* Left button: prev in LTR, next in RTL — arrow faces outward */}
            <NavBtn onClick={() => { (isRTL ? next : prev)(); setPaused(true) }}>
              {isRTL ? '→' : '←'}
            </NavBtn>

            {/* Overflow mask */}
            <div
              style={{ flex: 1, overflow: 'hidden', cursor: 'grab', userSelect: 'none' }}
              onPointerDown={onPointerDown}
              onPointerUp={onPointerUp}
              onPointerLeave={() => { dragStart.current = null }}
            >
              {/* Sliding track — always LTR layout, centered active card */}
              <div
                style={{
                  display: 'flex',
                  gap: `${GAP}px`,
                  direction: 'ltr',
                  transform: `translateX(calc(((100% - ${CARD_W}%) / 2) - ${current} * (${CARD_W}% + ${GAP}px)))`,
                  transition: 'transform 0.45s cubic-bezier(0.4,0,0.2,1)',
                  willChange: 'transform',
                }}
              >
                {items.map((service, i) => {
                  const isActive = i === current
                  return (
                    <div
                      key={i}
                      style={{
                        flexShrink: 0,
                        width: `${CARD_W}%`,
                        minHeight: '300px',
                        background: isActive ? '#FFFCF8' : '#ffffff',
                        borderRadius: '16px',
                        border: isActive ? '1px solid #C4883A' : '1px solid #E8EDF3',
                        boxShadow: isActive ? '0 4px 20px rgba(196,136,58,0.09)' : 'none',
                        padding: '36px 32px 32px',
                        opacity: isActive ? 1 : 0.5,
                        textAlign: isRTL ? 'right' : 'left',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0',
                        transition: 'border-color 0.3s, background 0.3s, box-shadow 0.3s, opacity 0.3s',
                      }}
                    >
                      {/* Icon — prominent at top */}
                      <div style={{
                        width: '60px', height: '60px',
                        borderRadius: '16px',
                        background: isActive ? '#FDF3E7' : '#F6F8FB',
                        border: `1px solid ${isActive ? 'rgba(196,136,58,0.25)' : '#E8EDF3'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: isActive ? '#C4883A' : '#8AA0BA',
                        alignSelf: isRTL ? 'flex-end' : 'flex-start',
                        marginBottom: '24px',
                        transition: 'background 0.3s, border-color 0.3s, color 0.3s',
                      }}>
                        <div style={{ width: '28px', height: '28px' }}>
                          {ServiceIcons[i % ServiceIcons.length]}
                        </div>
                      </div>

                      {/* Title */}
                      <h3 style={{
                        fontSize: '17px',
                        fontWeight: 700,
                        color: '#1A3554',
                        margin: '0 0 12px 0',
                        lineHeight: 1.3,
                        letterSpacing: '-0.01em',
                      }}>
                        {service.title}
                      </h3>

                      {/* Description */}
                      <p style={{
                        fontSize: '14px',
                        color: '#6A7280',
                        lineHeight: 1.75,
                        margin: '0 0 auto 0',
                        paddingBottom: '24px',
                      }}>
                        {service.desc}
                      </p>

                      {/* CTA — sits at bottom */}
                      <div style={{
                        paddingTop: '20px',
                        borderTop: `1px solid ${isActive ? 'rgba(196,136,58,0.15)' : '#F0F3F7'}`,
                      }}>
                        <Link
                          to="/services"
                          style={{
                            fontSize: '13px', fontWeight: 700, color: '#C4883A',
                            textDecoration: 'none',
                            display: 'inline-flex', alignItems: 'center', gap: '5px',
                            flexDirection: 'row',
                            transition: 'color 0.2s',
                          }}
                          onMouseEnter={e => e.currentTarget.style.color = '#A96F25'}
                          onMouseLeave={e => e.currentTarget.style.color = '#C4883A'}
                        >
                          <span>{isRTL ? 'קרא עוד' : 'Learn More'}</span>
                          <span>{isRTL ? '←' : '→'}</span>
                        </Link>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Right button: next in LTR, prev in RTL — arrow faces outward */}
            <NavBtn onClick={() => { (isRTL ? prev : next)(); setPaused(true) }}>
              {isRTL ? '←' : '→'}
            </NavBtn>

          </div>{/* end row */}

          {/* Progress bar */}
          <div style={{ marginTop: '28px', height: '3px', background: '#E2E8F0', borderRadius: '100px', overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${((current + 1) / total) * 100}%`,
              background: 'linear-gradient(90deg, #C4883A, #E4A855)',
              borderRadius: '100px',
              transition: 'width 0.45s cubic-bezier(0.4,0,0.2,1)',
            }} />
          </div>

          {/* Dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '16px' }}>
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => { goTo(i); setPaused(true) }}
                style={{
                  width: i === current ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '100px',
                  background: i === current ? '#C4883A' : '#CBD5E1',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'width 0.3s ease, background 0.3s ease',
                }}
              />
            ))}
          </div>

        </div>{/* end carousel wrapper */}

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: '36px' }}>
          <Link
            to="/services"
            style={{ color: '#1A3554', fontSize: '15px', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', flexDirection: 'row' }}
            onMouseEnter={e => e.currentTarget.style.color = '#0F2B47'}
            onMouseLeave={e => e.currentTarget.style.color = '#1A3554'}
          >
            {t.cta}
            <span>{isRTL ? '←' : '→'}</span>
          </Link>
        </div>

      </div>
    </section>
  )
}
