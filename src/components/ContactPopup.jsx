import { useState, useEffect } from 'react'
import { useLang } from '../context/LanguageContext'

export default function ContactPopup({ onClose }) {
  const { lang } = useLang()
  const isRTL = lang === 'he'
  const [values, setValues] = useState({ name: '', email: '', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const handle = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(false)
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY,
          subject: isRTL ? 'פנייה חדשה מהאתר – גליצר רואי חשבון' : 'New Website Inquiry – Galitzer CPA',
          name: values.name,
          email: values.email,
          phone: values.phone,
          message: values.message,
          botcheck: '',
        }),
      })
      const data = await res.json()
      if (!data.success) throw new Error('failed')
      setSubmitted(true)
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '11px 14px',
    borderRadius: '10px',
    border: '1.5px solid #E8EDF3',
    background: '#F7F9FC',
    fontSize: '14px',
    color: '#1A3554',
    outline: 'none',
    boxSizing: 'border-box',
    direction: isRTL ? 'rtl' : 'ltr',
    fontFamily: 'inherit',
    transition: 'border-color 0.2s',
  }

  const labelStyle = {
    fontSize: '12px',
    fontWeight: 700,
    color: '#6A7280',
    marginBottom: '6px',
    display: 'block',
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
    textAlign: isRTL ? 'right' : 'left',
  }

  const t = {
    en: {
      title: "Let's Talk",
      sub: "Fill in your details and we'll get back to you within one business day.",
      name: 'Full Name', namePh: 'John Smith',
      email: 'Email Address', emailPh: 'john@example.com',
      phone: 'Phone Number', phonePh: '+1 (555) 000-0000',
      msg: 'How can we help? (optional)', msgPh: 'Tell us a bit about your situation…',
      submit: 'Send Message',
      sending: 'Sending…',
      doneTitle: "We'll be in touch!",
      doneMsg: "Thanks for reaching out. We'll get back to you within one business day.",
      close: 'Close',
    },
    he: {
      title: 'בואו נדבר',
      sub: 'מלאו את הפרטים ונחזור אליכם תוך יום עסקים אחד.',
      name: 'שם מלא', namePh: 'ישראל ישראלי',
      email: 'כתובת אימייל', emailPh: 'israel@example.com',
      phone: 'מספר טלפון', phonePh: '050-000-0000',
      msg: 'איך נוכל לעזור? (אופציונלי)', msgPh: 'ספרו לנו קצת על המצב שלכם…',
      submit: 'שלח הודעה',
      sending: 'שולח…',
      doneTitle: 'קיבלנו!',
      doneMsg: 'תודה שפנית אלינו. נחזור אליך תוך יום עסקים אחד.',
      close: 'סגור',
    },
  }[lang]

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1200,
        background: 'rgba(13,30,47,0.65)',
        backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#ffffff',
          borderRadius: '24px',
          maxWidth: '500px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 32px 80px rgba(0,0,0,0.25)',
          animation: 'popupIn 0.3s cubic-bezier(0.34,1.56,0.64,1) both',
          direction: isRTL ? 'rtl' : 'ltr',
        }}
      >
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #0D1E2F 0%, #1A3554 100%)',
          borderRadius: '24px 24px 0 0',
          padding: '28px 32px 24px',
          position: 'relative',
        }}>
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: '18px',
              [isRTL ? 'left' : 'right']: '18px',
              background: 'rgba(255,255,255,0.12)',
              border: 'none', borderRadius: '50%',
              width: '32px', height: '32px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: '#fff', transition: 'background 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.22)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#fff', marginBottom: '6px' }}>{t.title}</h3>
          <p style={{ fontSize: '14px', color: '#8AA8C5', lineHeight: 1.5 }}>{t.sub}</p>
        </div>

        {/* Body */}
        <div style={{ padding: '28px 32px' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '16px 0' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
              <h4 style={{ fontSize: '20px', fontWeight: 800, color: '#1A3554', marginBottom: '8px' }}>{t.doneTitle}</h4>
              <p style={{ fontSize: '15px', color: '#6A7280', lineHeight: 1.6, marginBottom: '24px' }}>{t.doneMsg}</p>
              <button
                onClick={onClose}
                style={{
                  background: '#C4883A', color: '#fff', fontWeight: 700, fontSize: '14px',
                  padding: '12px 32px', borderRadius: '100px', border: 'none', cursor: 'pointer',
                }}
              >
                {t.close}
              </button>
            </div>
          ) : (
            <form onSubmit={handle} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={labelStyle}>{t.name}</label>
                <input
                  required type="text" placeholder={t.namePh}
                  value={values.name} onChange={e => setValues(v => ({ ...v, name: e.target.value }))}
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = '#C4883A'}
                  onBlur={e => e.target.style.borderColor = '#E8EDF3'}
                />
              </div>
              <div>
                <label style={labelStyle}>{t.email}</label>
                <input
                  required type="email" placeholder={t.emailPh}
                  value={values.email} onChange={e => setValues(v => ({ ...v, email: e.target.value }))}
                  style={{ ...inputStyle, direction: 'ltr' }}
                  onFocus={e => e.target.style.borderColor = '#C4883A'}
                  onBlur={e => e.target.style.borderColor = '#E8EDF3'}
                />
              </div>
              <div>
                <label style={labelStyle}>{t.phone}</label>
                <input
                  type="tel" placeholder={t.phonePh}
                  value={values.phone} onChange={e => setValues(v => ({ ...v, phone: e.target.value }))}
                  style={{ ...inputStyle, direction: 'ltr' }}
                  onFocus={e => e.target.style.borderColor = '#C4883A'}
                  onBlur={e => e.target.style.borderColor = '#E8EDF3'}
                />
              </div>
              <div>
                <label style={labelStyle}>{t.msg}</label>
                <textarea
                  rows={3} placeholder={t.msgPh}
                  value={values.message} onChange={e => setValues(v => ({ ...v, message: e.target.value }))}
                  style={{ ...inputStyle, resize: 'vertical', minHeight: '80px' }}
                  onFocus={e => e.target.style.borderColor = '#C4883A'}
                  onBlur={e => e.target.style.borderColor = '#E8EDF3'}
                />
              </div>
              {error && (
                <p style={{ fontSize: '13px', color: '#E53E3E', textAlign: isRTL ? 'right' : 'left', margin: 0 }}>
                  {isRTL ? 'אירעה שגיאה. נסו שוב או פנו אלינו ישירות.' : 'Something went wrong. Please try again.'}
                </p>
              )}
              <button
                type="submit"
                disabled={loading}
                style={{
                  background: loading ? '#A96F25' : '#C4883A',
                  color: '#fff', fontWeight: 700, fontSize: '15px',
                  padding: '14px', borderRadius: '100px',
                  border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
                  boxShadow: '0 4px 16px rgba(196,136,58,0.35)',
                  transition: 'all 0.2s',
                  marginTop: '4px',
                }}
                onMouseEnter={e => { if (!loading) e.currentTarget.style.background = '#A96F25' }}
                onMouseLeave={e => { if (!loading) e.currentTarget.style.background = '#C4883A' }}
              >
                {loading ? t.sending : t.submit}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
