import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const options = {
  en: [
    {
      icon: '🇺🇸',
      title: 'American Living in Israel',
      desc: 'U.S. expat taxes, FBAR & foreign income reporting',
    },
    {
      icon: '🇮🇱',
      title: 'Israeli with U.S. Income or Assets',
      desc: 'Cross-border investments, compliance & reporting',
    },
    {
      icon: '🏢',
      title: 'Cross-Border Business Owner',
      desc: 'Corporate setup, dual filing & entity structure',
    },
    {
      icon: '🤔',
      title: "Not Sure — I Just Need Advice",
      desc: "We'll help you figure out exactly what you need",
    },
  ],
  he: [
    {
      icon: '🇺🇸',
      title: 'אמריקאי המתגורר בישראל',
      desc: 'מס אמריקאי לגולים, FBAR ודיווח הכנסות זרות',
    },
    {
      icon: '🇮🇱',
      title: 'ישראלי עם הכנסות או נכסים בארה"ב',
      desc: 'השקעות חוצות גבולות, ציות ודיווח',
    },
    {
      icon: '🏢',
      title: 'בעל עסק בינלאומי',
      desc: 'הקמת חברות, דיווח כפול ומבנה ישויות',
    },
    {
      icon: '🤔',
      title: 'לא בטוח — אני רק צריך ייעוץ',
      desc: 'נעזור לך להבין בדיוק מה אתה צריך',
    },
  ],
}

export default function SituationPopup({ onClose, lang }) {
  const isRTL = lang === 'he'
  const navigate = useNavigate()
  const items = options[lang] || options.en

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const handleOption = () => {
    onClose()
    navigate('/contact')
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1100,
        background: 'rgba(13,30,47,0.65)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#ffffff',
          borderRadius: '24px',
          maxWidth: '560px',
          width: '100%',
          boxShadow: '0 32px 80px rgba(0,0,0,0.25)',
          animation: 'popupIn 0.3s cubic-bezier(0.34,1.56,0.64,1) both',
          direction: isRTL ? 'rtl' : 'ltr',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #0D1E2F 0%, #1A3554 100%)',
          padding: '28px 32px 24px',
          position: 'relative',
        }}>
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '20px',
              [isRTL ? 'left' : 'right']: '20px',
              background: 'rgba(255,255,255,0.12)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#ffffff',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.22)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C4883A', marginBottom: '8px' }}>
            {isRTL ? 'לא בטוחים?' : 'Not Sure Where You Fit?'}
          </p>
          <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#ffffff', lineHeight: 1.3 }}>
            {isRTL ? 'בחרו את המצב שמתאים לכם' : 'Choose Your Situation'}
          </h3>
        </div>

        {/* Options */}
        <div style={{ padding: '20px 24px 24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {items.map((opt, i) => (
            <button
              key={i}
              onClick={handleOption}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                flexDirection: isRTL ? 'row-reverse' : 'row',
                textAlign: isRTL ? 'right' : 'left',
                background: '#F7F9FC',
                border: '1.5px solid #E8EDF3',
                borderRadius: '14px',
                padding: '16px 20px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                width: '100%',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#EAF0F8'
                e.currentTarget.style.borderColor = '#C4883A'
                e.currentTarget.style.transform = 'translateX(' + (isRTL ? '-3px' : '3px') + ')'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#F7F9FC'
                e.currentTarget.style.borderColor = '#E8EDF3'
                e.currentTarget.style.transform = 'translateX(0)'
              }}
            >
              <span style={{ fontSize: '28px', flexShrink: 0 }}>{opt.icon}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: '15px', fontWeight: 700, color: '#1A3554', marginBottom: '3px' }}>{opt.title}</p>
                <p style={{ fontSize: '13px', color: '#6A7280', lineHeight: 1.5 }}>{opt.desc}</p>
              </div>
              <svg
                style={{
                  width: '16px',
                  height: '16px',
                  color: '#C4883A',
                  flexShrink: 0,
                  transform: isRTL ? 'rotate(180deg)' : 'none',
                }}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
