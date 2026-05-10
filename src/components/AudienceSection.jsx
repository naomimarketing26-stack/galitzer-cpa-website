import { useLang } from '../context/LanguageContext'
import { useReveal } from '../hooks/useReveal'
import { useState, useRef, useEffect } from 'react'
import { content } from '../data/content'
import ContactPopup from './ContactPopup'

const cta = { en: 'Get Started', he: 'מתחילים כאן' }
const sub  = { en: 'Does this sound like you?', he: 'זה נשמע כמוך?' }
const heading = { en: 'Who We Help', he: 'למי השירות שלנו מתאים' }

export default function AudienceSection() {
  const { lang } = useLang()
  const isRTL = lang === 'he'
  const items = content[lang].audience.items
  const [popupOpen, setPopupOpen] = useState(false)
  const [hovered, setHovered] = useState(null)
  const [isMobile, setIsMobile] = useState(false)
  const [current, setCurrent] = useState(0)
  const [sectionRef, sectionRevealed] = useReveal()

  // Track drag/swipe
  const touchStartX = useRef(null)
  const touchStartY = useRef(null)
  const isDragging = useRef(false)
  const dragStartX = useRef(null)
  const dragOffset = useRef(0)
  const [liveOffset, setLiveOffset] = useState(0)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Reset carousel index when switching languages
  useEffect(() => { setCurrent(0) }, [lang])

  const goTo = (idx) => {
    const clamped = Math.max(0, Math.min(idx, items.length - 1))
    setCurrent(clamped)
    setLiveOffset(0)
  }

  // Touch handlers
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
    dragOffset.current = 0
    setLiveOffset(0)
  }
  const onTouchMove = (e) => {
    if (touchStartX.current === null) return
    const dx = e.touches[0].clientX - touchStartX.current
    const dy = e.touches[0].clientY - touchStartY.current
    if (Math.abs(dx) > Math.abs(dy)) {
      dragOffset.current = dx
      setLiveOffset(dx)
    }
  }
  const onTouchEnd = () => {
    const threshold = 60
    if (dragOffset.current < -threshold) goTo(isRTL ? current - 1 : current + 1)
    else if (dragOffset.current > threshold) goTo(isRTL ? current + 1 : current - 1)
    else setLiveOffset(0)
    touchStartX.current = null
  }

  // Mouse drag
  const onMouseDown = (e) => {
    isDragging.current = true
    dragStartX.current = e.clientX
    dragOffset.current = 0
  }
  const onMouseMove = (e) => {
    if (!isDragging.current) return
    const dx = e.clientX - dragStartX.current
    dragOffset.current = dx
    setLiveOffset(dx)
  }
  const onMouseUp = () => {
    if (!isDragging.current) return
    isDragging.current = false
    const threshold = 60
    if (dragOffset.current < -threshold) goTo(isRTL ? current - 1 : current + 1)
    else if (dragOffset.current > threshold) goTo(isRTL ? current + 1 : current - 1)
    else setLiveOffset(0)
  }

  const CardContent = ({ p, i, cardStyle = {} }) => (
    <button
      key={i}
      onClick={() => setPopupOpen(true)}
      onMouseEnter={() => setHovered(i)}
      onMouseLeave={() => setHovered(null)}
      style={{
        background: '#ffffff',
        border: hovered === i ? '2px solid #C4883A' : '2px solid #E8EDF3',
        borderRadius: '24px',
        padding: '32px 24px 24px',
        textAlign: isRTL ? 'right' : 'left',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: hovered === i
          ? '0 16px 40px rgba(196,136,58,0.14)'
          : '0 2px 8px rgba(26,53,84,0.06)',
        transform: hovered === i ? 'translateY(-5px)' : 'translateY(0)',
        transition: 'all 0.22s ease',
        ...cardStyle,
      }}
    >
      <span style={{ fontSize: '40px', lineHeight: 1, marginBottom: '16px', display: 'block' }}>
        {p.icon}
      </span>
      <h3 style={{
        fontSize: '16px',
        fontWeight: 800,
        color: '#1A3554',
        lineHeight: 1.3,
        marginBottom: '10px',
        letterSpacing: '-0.01em',
      }}>
        {p.title}
      </h3>
      <p style={{
        fontSize: '13px',
        color: '#6A7280',
        lineHeight: 1.65,
        flexGrow: 1,
        marginBottom: '20px',
      }}>
        {p.desc}
      </p>
      <span style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '13px',
        fontWeight: 700,
        color: hovered === i ? '#C4883A' : '#1A3554',
        transition: 'color 0.2s',
      }}>
        {cta[lang]}
        <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"
          style={{ transform: isRTL ? 'rotate(180deg)' : 'none' }}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </span>
    </button>
  )

  return (
    <>
      {popupOpen && <ContactPopup onClose={() => setPopupOpen(false)} />}

      <section style={{ backgroundColor: '#F7F9FC', paddingTop: '96px', paddingBottom: '96px', overflow: 'hidden' }}>
        <div
          ref={sectionRef}
          style={{
            opacity: sectionRevealed ? 1 : 0,
            transform: sectionRevealed ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          {/* Heading */}
          <div style={{ textAlign: 'center', marginBottom: '12px', paddingLeft: 'clamp(24px, 5vw, 80px)', paddingRight: 'clamp(24px, 5vw, 80px)' }}>
            <h2 style={{
              fontSize: 'clamp(28px, 3.5vw, 44px)',
              fontWeight: 800,
              color: '#1A3554',
              lineHeight: 1.25,
            }}>
              {heading[lang]}
            </h2>
          </div>
          <p style={{
            textAlign: 'center',
            fontSize: '16px',
            color: '#6A7280',
            marginBottom: '48px',
            paddingLeft: 'clamp(24px, 5vw, 80px)',
            paddingRight: 'clamp(24px, 5vw, 80px)',
          }}>
            {sub[lang]}
          </p>

          {/* ── DESKTOP: 4-column grid ── */}
          {!isMobile && (
            <div style={{
              maxWidth: '1300px',
              margin: '0 auto',
              paddingLeft: 'clamp(24px, 5vw, 80px)',
              paddingRight: 'clamp(24px, 5vw, 80px)',
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '20px',
              marginBottom: '48px',
            }}>
              {items.map((p, i) => (
                <CardContent key={i} p={p} i={i} />
              ))}
            </div>
          )}

          {/* ── MOBILE: carousel ── */}
          {isMobile && (
            <div style={{ marginBottom: '32px' }}>
              {/* Track */}
              <div
                style={{ overflow: 'hidden', cursor: 'grab', userSelect: 'none' }}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseUp}
              >
                <div style={{
                  display: 'flex',
                  flexDirection: isRTL ? 'row-reverse' : 'row',
                  transform: `translateX(calc(${isRTL ? '' : '-'}${current * 100}% + ${liveOffset}px))`,
                  transition: liveOffset !== 0 ? 'none' : 'transform 0.35s cubic-bezier(0.25, 1, 0.5, 1)',
                  willChange: 'transform',
                }}>
                  {items.map((p, i) => (
                    <div key={i} style={{ minWidth: '100%', paddingLeft: '24px', paddingRight: '24px', boxSizing: 'border-box' }}>
                      <CardContent p={p} i={i} cardStyle={{ width: '100%', height: '100%' }} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Dots */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '24px' }}>
                {items.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    style={{
                      width: current === i ? '24px' : '8px',
                      height: '8px',
                      borderRadius: '100px',
                      background: current === i ? '#C4883A' : '#CBD5E1',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                      transition: 'all 0.25s ease',
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Bottom CTA */}
          <div style={{ textAlign: 'center', paddingLeft: 'clamp(24px, 5vw, 80px)', paddingRight: 'clamp(24px, 5vw, 80px)' }}>
            <p style={{ fontSize: '14px', color: '#6A7280', marginBottom: '12px' }}>
              {isRTL ? 'לא בטוחים איפה אתם מתאימים?' : "Don't fit into a box?"}
            </p>
            <button
              onClick={() => setPopupOpen(true)}
              style={{
                background: 'transparent',
                border: '1.5px solid #1A3554',
                color: '#1A3554',
                fontWeight: 700,
                fontSize: '14px',
                padding: '11px 28px',
                borderRadius: '100px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#1A3554'; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#1A3554' }}
            >
              {isRTL ? 'בדקו את המצב שלכם' : 'Tell us about your situation'}
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
