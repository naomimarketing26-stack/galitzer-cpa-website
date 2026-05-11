import { Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'

export default function AccessibilityWidget() {
  const { lang } = useLang()
  const isRTL = lang === 'he'
  const side = isRTL ? { right: '16px' } : { left: '16px' }

  return (
    <Link
      to="/accessibility"
      aria-label={isRTL ? 'הצהרת נגישות' : 'Accessibility Statement'}
      title={isRTL ? 'הצהרת נגישות' : 'Accessibility Statement'}
      style={{
        position: 'fixed',
        bottom: '24px',
        ...side,
        zIndex: 1001,
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.85)',
        border: '1px solid rgba(0,0,0,0.12)',
        color: '#1A3554',
        fontSize: '18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        opacity: 0.7,
        transition: 'opacity 0.2s',
      }}
      onMouseEnter={e => { e.currentTarget.style.opacity = '1' }}
      onMouseLeave={e => { e.currentTarget.style.opacity = '0.7' }}
    >
      ♿
    </Link>
  )
}
