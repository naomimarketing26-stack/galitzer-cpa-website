import { useState, useEffect } from 'react'
import { useLang } from '../context/LanguageContext'

export default function ScrollToTopBtn() {
  const { lang } = useLang()
  const [visible, setVisible] = useState(false)
  const isRTL = lang === 'he'

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label={isRTL ? 'חזור למעלה' : 'Back to top'}
      style={{
        position: 'fixed',
        bottom: '24px',
        ...(isRTL ? { left: '24px' } : { right: '24px' }),
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        border: '1px solid #e1e1e1',
        background: 'rgba(255,255,255,0.95)',
        color: '#1A3554',
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(0,0,0,0.10)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(10px)',
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'opacity 0.3s ease, transform 0.3s ease, box-shadow 0.2s ease, background 0.2s ease',
      }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.15)'; e.currentTarget.style.background = '#f5f7f9'; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.10)'; e.currentTarget.style.background = 'rgba(255,255,255,0.95)'; }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  )
}
