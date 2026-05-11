import { useState } from 'react'
import { useLang } from '../context/LanguageContext'
import { content } from '../data/content'
import { useReveal } from '../hooks/useReveal'

const container = {
  maxWidth: '1200px',
  margin: '0 auto',
  paddingLeft: 'clamp(24px, 5vw, 80px)',
  paddingRight: 'clamp(24px, 5vw, 80px)',
}

export default function HowItWorks() {
  const { lang } = useLang()
  const t = content[lang].howItWorks
  const isRTL = lang === 'he'

  const [headerRef, headerRevealed] = useReveal()
  const [stepsRef, stepsRevealed] = useReveal()

  const [formValues, setFormValues] = useState({ name: '', email: '', phone: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const handleSubmit = async (e) => {
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
          to: 'yonatan@galitzercpa.com',
          name: formValues.name,
          email: formValues.email,
          phone: formValues.phone,
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
    border: '1px solid #2A4A6E',
    background: '#ffffff',
    fontSize: '14px',
    color: '#1A3554',
    outline: 'none',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
  }

  const labelStyle = {
    fontSize: '12px',
    fontWeight: 600,
    color: '#8AA8C5',
    marginBottom: '6px',
    display: 'block',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    textAlign: isRTL ? 'right' : 'left',
  }

  /* ── Steps column (same markup, just direction-aware) ── */
  const StepsCol = (
    <div>
      {/* position:relative wrapper holds the connector line */}
      <div style={{ position: 'relative' }}>

        {/* Dashed connector — runs from centre of first circle to centre of last */}
        <div style={{
          position: 'absolute',
          top: '32px',
          bottom: '32px',
          /* align with circle centre (circle = 64 px → centre = 32 px from its edge) */
          ...(isRTL
            ? { right: '31px', left: 'auto' }
            : { left: '31px', right: 'auto' }),
          width: '2px',
          /* pure background dashed — avoids borderLeft/Right RTL quirks */
          background: `repeating-linear-gradient(
            to bottom,
            rgba(26,53,84,0.25) 0px,
            rgba(26,53,84,0.25) 6px,
            transparent 6px,
            transparent 14px
          )`,
          pointerEvents: 'none',
        }} />

        {t.steps.map((step, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '20px',
              /* parent grid has direction:ltr, so row-reverse puts circle on RIGHT in RTL */
              flexDirection: isRTL ? 'row-reverse' : 'row',
              marginBottom: i < t.steps.length - 1 ? '40px' : '0',
              opacity: stepsRevealed ? 1 : 0,
              transform: stepsRevealed ? 'translateY(0)' : 'translateY(24px)',
              transition: `opacity 0.6s ease ${i * 150}ms, transform 0.6s ease ${i * 150}ms`,
            }}
          >
            {/* Circle number */}
            <div style={{
              flexShrink: 0,
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: '#1A3554',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              fontWeight: 800,
              boxShadow: '0 4px 16px rgba(26,53,84,0.3)',
              outline: '8px solid rgba(26,53,84,0.08)',
              position: 'relative',
              zIndex: 1,
            }}>
              {step.number}
            </div>

            {/* Text — always aligned toward the reading direction */}
            <div style={{
              paddingTop: '10px',
              textAlign: isRTL ? 'right' : 'left',
            }}>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#1A3554', marginBottom: '8px' }}>
                {step.title}
              </h3>
              <p style={{ fontSize: '14px', color: '#666666', lineHeight: 1.65, direction: isRTL ? 'rtl' : 'ltr' }}>
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  /* ── Consultation form column ── */
  const FormCol = (
    <div
      style={{
        background: '#0D1E2F',
        borderRadius: '20px',
        padding: '40px',
        opacity: stepsRevealed ? 1 : 0,
        transform: stepsRevealed ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s',
        direction: isRTL ? 'rtl' : 'ltr',
      }}
    >
      <h3 style={{
        fontSize: '22px',
        fontWeight: 800,
        color: '#ffffff',
        marginBottom: '8px',
        textAlign: isRTL ? 'right' : 'left',
      }}>
        {isRTL ? 'תתחילו כאן' : 'Take the First Step'}
      </h3>
      <p style={{
        fontSize: '14px',
        color: '#8AA8C5',
        marginBottom: '28px',
        textAlign: isRTL ? 'right' : 'left',
        lineHeight: 1.6,
      }}>
        {isRTL
          ? 'השאירו פרטים ונחזור אליכם בהקדם.'
          : "Leave your details and we'll get back to you shortly."}
      </p>

      {submitted ? (
        <div style={{ textAlign: isRTL ? 'right' : 'left', padding: '16px 0' }}>
          <div style={{ fontSize: '40px', marginBottom: '12px', textAlign: 'center' }}>✅</div>
          <p style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff', textAlign: 'center', lineHeight: 1.6 }}>
            {isRTL ? 'תודה! נחזור אליכם בהקדם.' : "Thanks! We'll be in touch shortly."}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <input type="hidden" name="botcheck" value="" />
          <div>
            <label style={labelStyle}>{isRTL ? 'שם' : 'Full Name'}</label>
            <input
              required
              type="text"
              placeholder={isRTL ? 'ישראל ישראלי' : 'John Smith'}
              value={formValues.name}
              onChange={e => setFormValues(v => ({ ...v, name: e.target.value }))}
              style={{ ...inputStyle, direction: isRTL ? 'rtl' : 'ltr', textAlign: isRTL ? 'right' : 'left' }}
            />
          </div>
          <div>
            <label style={labelStyle}>{isRTL ? 'אימייל' : 'Email Address'}</label>
            <input
              required
              type="email"
              placeholder={isRTL ? 'israel@example.com' : 'john@example.com'}
              value={formValues.email}
              onChange={e => setFormValues(v => ({ ...v, email: e.target.value }))}
              style={{ ...inputStyle, direction: 'ltr', textAlign: isRTL ? 'right' : 'left' }}
            />
          </div>
          <div>
            <label style={labelStyle}>{isRTL ? 'טלפון' : 'Phone Number'}</label>
            <input
              type="tel"
              placeholder={isRTL ? '050-000-0000' : '+1 (555) 000-0000'}
              value={formValues.phone}
              onChange={e => setFormValues(v => ({ ...v, phone: e.target.value }))}
              style={{ ...inputStyle, direction: 'ltr', textAlign: isRTL ? 'right' : 'left' }}
            />
          </div>
          {error && (
            <p style={{ fontSize: '13px', color: '#FF6B6B', textAlign: isRTL ? 'right' : 'left', margin: 0 }}>
              {isRTL ? 'אירעה שגיאה. נסו שוב או פנו אלינו ישירות.' : 'Something went wrong. Please try again.'}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            style={{
              display: 'block',
              width: '100%',
              textAlign: 'center',
              background: loading ? '#A96F25' : '#C4883A',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '15px',
              padding: '14px 28px',
              borderRadius: '100px',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              marginTop: '8px',
              boxShadow: '0 4px 16px rgba(196,136,58,0.35)',
              transition: 'all 0.2s ease',
              fontFamily: 'inherit',
            }}
            onMouseEnter={e => { if (!loading) { e.currentTarget.style.background = '#A96F25'; e.currentTarget.style.transform = 'translateY(-2px)'; } }}
            onMouseLeave={e => { if (!loading) { e.currentTarget.style.background = '#C4883A'; e.currentTarget.style.transform = 'translateY(0)'; } }}
          >
            {loading ? (isRTL ? 'שולח…' : 'Sending…') : (isRTL ? 'קביעת פגישה' : 'Book Now')}
          </button>
        </form>
      )}
    </div>
  )

  return (
    <section style={{ backgroundColor: '#f4f7f9', paddingTop: '96px', paddingBottom: '96px' }}>
      <div style={container}>

        {/* Header */}
        <div
          ref={headerRef}
          style={{
            textAlign: 'center',
            marginBottom: '64px',
            opacity: headerRevealed ? 1 : 0,
            transform: headerRevealed ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 700, color: '#1A3554', lineHeight: 1.25, marginBottom: '14px' }}>
            {t.heading}
          </h2>
          <p style={{ fontSize: '17px', color: '#666666', lineHeight: 1.7 }}>{t.subheading}</p>
        </div>

        {/*
          Grid is always direction:ltr so column order is explicit.
          RTL: Form first in DOM → left column | Steps second → right column  ✓
          LTR: Steps first in DOM → left column | Form second → right column  ✓
        */}
        <div
          ref={stepsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '48px',
            alignItems: 'start',
            direction: 'ltr', /* explicit — we control order ourselves */
          }}
        >
          {isRTL ? (
            /* Hebrew: Form on LEFT, Steps on RIGHT */
            <>{FormCol}{StepsCol}</>
          ) : (
            /* English: Steps on LEFT, Form on RIGHT */
            <>{StepsCol}{FormCol}</>
          )}
        </div>

      </div>
    </section>
  )
}