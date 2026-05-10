import { useState, useEffect, useRef } from 'react'
import { useLang } from '../context/LanguageContext'
import { content } from '../data/content'
import { useReveal } from '../hooks/useReveal'

const container = {
  maxWidth: '1200px',
  margin: '0 auto',
  paddingLeft: 'clamp(24px, 5vw, 80px)',
  paddingRight: 'clamp(24px, 5vw, 80px)',
}

export default function Testimonials() {
  const { lang } = useLang()
  const t = content[lang].testimonials
  const isRTL = lang === 'he'
  const items = t.items

  const [active, setActive] = useState(0)
  const [visible, setVisible] = useState(true)
  const [paused, setPaused] = useState(false)
  const timerRef = useRef(null)

  const goTo = (idx) => {
    const next = typeof idx === 'function' ? idx(active) : idx
    setVisible(false)
    setTimeout(() => {
      setActive(next)
      setVisible(true)
    }, 260)
  }

  useEffect(() => {
    if (paused) return
    timerRef.current = setInterval(() => {
      setActive(prev => {
        const next = (prev + 1) % items.length
        setVisible(false)
        setTimeout(() => setVisible(true), 260)
        return next
      })
    }, 5500)
    return () => clearInterval(timerRef.current)
  }, [paused, items.length])

  const [sectionRef, sectionRevealed] = useReveal()

  const item = items[active]

  return (
    <section
      style={{ backgroundColor: '#ffffff', paddingTop: '96px', paddingBottom: '96px' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div style={container}>

        {/* Section heading */}
        <div
          ref={sectionRef}
          style={{
            textAlign: 'center',
            opacity: sectionRevealed ? 1 : 0,
            transform: sectionRevealed ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <h2 style={{
            fontSize: 'clamp(28px, 3.5vw, 44px)',
            fontWeight: 700,
            color: '#1A3554',
            lineHeight: 1.25,
            marginBottom: '64px',
          }}>
            {t.heading}
          </h2>

          {/* Quote body — floats on the white page, no card */}
          <div
            style={{
              maxWidth: '680px',
              margin: '0 auto',
              position: 'relative',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(10px)',
              transition: 'opacity 0.26s ease, transform 0.26s ease',
            }}
          >
            {/* Giant decorative quotation mark */}
            <span
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: isRTL ? '-10px' : '-20px',
                [isRTL ? 'right' : 'left']: isRTL ? '-8px' : '-16px',
                fontSize: 'clamp(100px, 14vw, 160px)',
                fontFamily: 'Georgia, "Times New Roman", serif',
                lineHeight: 1,
                color: 'rgba(196,136,58,0.10)',
                pointerEvents: 'none',
                userSelect: 'none',
                zIndex: 0,
              }}
            >
              {isRTL ? '”' : '“'}
            </span>

            {/* Stars */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '4px',
              marginBottom: '28px',
              direction: 'ltr',
              position: 'relative',
              zIndex: 1,
            }}>
              {Array.from({ length: item.stars }).map((_, j) => (
                <span key={j} style={{ color: '#C4883A', fontSize: '20px' }}>★</span>
              ))}
            </div>

            {/* Quote text */}
            <p style={{
              fontSize: 'clamp(18px, 2.2vw, 22px)',
              color: '#2D3F55',
              lineHeight: 1.8,
              fontStyle: 'italic',
              fontWeight: 400,
              textAlign: 'center',
              marginBottom: '36px',
              position: 'relative',
              zIndex: 1,
              letterSpacing: '0.01em',
            }}>
              {item.quote}
            </p>

            {/* Thin divider */}
            <div style={{
              width: '40px',
              height: '2px',
              background: 'linear-gradient(90deg, #C4883A, #E4A855)',
              borderRadius: '100px',
              margin: '0 auto 24px',
            }} />

            {/* Client info — centered, no avatar */}
            <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
              <p style={{
                fontSize: '15px',
                fontWeight: 700,
                color: '#1A3554',
                marginBottom: '4px',
              }}>
                {item.name}
              </p>
              <p style={{
                fontSize: '13px',
                color: '#9AA3AE',
                letterSpacing: '0.03em',
              }}>
                {item.location}
              </p>
            </div>
          </div>

          {/* Dots navigation */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
            marginTop: '48px',
          }}>
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                style={{
                  width: i === active ? '28px' : '8px',
                  height: '8px',
                  borderRadius: '100px',
                  background: i === active ? '#C4883A' : 'rgba(196,136,58,0.25)',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'all 0.35s ease',
                }}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
