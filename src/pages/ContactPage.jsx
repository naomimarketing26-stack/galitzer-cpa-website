import { useState } from 'react'
import { useLang } from '../context/LanguageContext'
import { officePhone } from '../data/team'
import { useReveal } from '../hooks/useReveal'
import FinalCTA from '../components/FinalCTA'

const contactContent = {
  en: {
    eyebrow: 'Contact Us',
    heading: 'Get in Touch',
    subheading: 'Have questions? Our team is here to help you navigate your financial future.',
    form: {
      name: 'Full Name',
      namePlaceholder: 'Your full name',
      email: 'Email Address',
      emailPlaceholder: 'you@example.com',
      phone: 'Phone Number',
      phonePlaceholder: '+1 or +972...',
      topic: 'Topic',
      topicOptions: [
        { value: '', label: 'Select a topic...' },
        { value: 'us-tax', label: 'U.S. Tax Filing' },
        { value: 'israeli-tax', label: 'Israeli Tax Filing' },
        { value: 'expat', label: 'Expat Tax Advisory' },
        { value: 'fbar', label: 'FBAR / Offshore Reporting' },
        { value: 'corporate', label: 'Corporate Setup' },
        { value: 'retirement', label: 'Retirement Planning' },
        { value: 'bookkeeping', label: 'Bookkeeping & Payroll' },
        { value: 'other', label: 'Other' },
      ],
      message: 'Message',
      messagePlaceholder: 'Tell us briefly about your situation...',
      submit: 'Send Message',
      submitting: 'Sending...',
      success: 'Message sent! We\'ll be in touch as soon as possible.',
      errors: {
        nameRequired: 'Full name is required.',
        emailRequired: 'Email address is required.',
        emailInvalid: 'Please enter a valid email address.',
        topicRequired: 'Please select a topic.',
        messageRequired: 'Message is required.',
      },
    },
    info: {
      heading: 'Contact Information',
      address: 'S. Galitzer Associates\n28 Ben Zion Street\nGivat Shaul, Jerusalem\nIsrael',
      phoneIL: 'Israel Office',
      phoneUS: 'U.S. Line',
      fax: 'Fax',
      email: 'Email',
      hours: 'Office Hours',
      hoursValue: 'Sun–Thu: 9:00–18:00',
    },
  },
  he: {
    eyebrow: 'צרו קשר',
    heading: 'בואו נדבר',
    subheading: 'יש לכם שאלות? הצוות שלנו כאן כדי לעזור לכם בניווט בעתידכם הפיננסי.',
    form: {
      name: 'שם מלא',
      namePlaceholder: 'השם המלא שלך',
      email: 'כתובת אימייל',
      emailPlaceholder: 'you@example.com',
      phone: 'מספר טלפון',
      phonePlaceholder: '+972 או +1...',
      topic: 'נושא',
      topicOptions: [
        { value: '', label: 'בחר נושא...' },
        { value: 'us-tax', label: 'הגשת מס אמריקאי' },
        { value: 'israeli-tax', label: 'הגשת מס ישראלי' },
        { value: 'expat', label: 'ייעוץ מס לגולים' },
        { value: 'fbar', label: 'FBAR / דיווח חשבונות' },
        { value: 'corporate', label: 'הקמת חברה' },
        { value: 'retirement', label: 'תכנון פרישה' },
        { value: 'bookkeeping', label: 'הנהלת חשבונות ושכר' },
        { value: 'other', label: 'אחר' },
      ],
      message: 'הודעה',
      messagePlaceholder: 'ספר לנו בקצרה על המצב שלך...',
      submit: 'שלח הודעה',
      submitting: 'שולח...',
      success: 'ההודעה נשלחה! נחזור אליך בהקדם האפשרי.',
      errors: {
        nameRequired: 'שם מלא הוא שדה חובה.',
        emailRequired: 'כתובת אימייל היא שדה חובה.',
        emailInvalid: 'אנא הזן כתובת אימייל תקינה.',
        topicRequired: 'אנא בחר נושא.',
        messageRequired: 'הודעה היא שדה חובה.',
      },
    },
    info: {
      heading: 'פרטי יצירת קשר',
      address: 'S. Galitzer Associates\nרחוב בן ציון 28\nגבעת שאול, ירושלים\nישראל',
      phoneIL: 'משרד ישראל',
      phoneUS: 'קו ארה"ב',
      fax: 'פקס',
      email: 'אימייל',
      hours: 'שעות פעילות',
      hoursValue: 'א׳–ה׳: 9:00–18:00',
    },
  },
}

function InputField({ label, error, children, isRTL }) {
  return (
    <div style={{ textAlign: isRTL ? 'right' : 'left' }}>
      <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#1a1a1a', marginBottom: '8px' }}>
        {label}
      </label>
      {children}
      {error && <p style={{ marginTop: '8px', fontSize: '12px', color: '#dc2626' }}>{error}</p>}
    </div>
  )
}

export default function ContactPage() {
  const { lang } = useLang()
  const t = contactContent[lang]
  const f = t.form
  const isRTL = lang === 'he'

  const [formRef, formRevealed] = useReveal()
  const [infoRef, infoRevealed] = useReveal()

  const [values, setValues] = useState({ name: '', email: '', phone: '', topic: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const inputStyle = (field) => ({
    width: '100%',
    padding: '12px 16px',
    fontSize: '14px',
    border: `1px solid ${errors[field] ? '#fca5a5' : '#eef1f4'}`,
    borderRadius: '12px',
    outline: 'none',
    transition: 'all 0.2s ease',
    backgroundColor: errors[field] ? '#fef2f2' : '#ffffff',
    color: '#1a1a1a',
    textAlign: isRTL ? 'right' : 'left',
    fontFamily: 'inherit',
  })

  const validate = () => {
    const e = {}
    if (!values.name.trim()) e.name = f.errors.nameRequired
    if (!values.email.trim()) e.email = f.errors.emailRequired
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) e.email = f.errors.emailInvalid
    if (!values.topic) e.topic = f.errors.topicRequired
    if (!values.message.trim()) e.message = f.errors.messageRequired
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSubmitting(true)
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY,
          subject: isRTL ? 'פנייה חדשה מהאתר – גליצר רואי חשבון' : 'New Website Inquiry – Galitzer CPA',
          to: 'yonatan@galitzercpa.com',
          name: values.name,
          email: values.email,
          phone: values.phone,
          topic: values.topic,
          message: values.message,
          botcheck: '',
        }),
      })
      const data = await res.json()
      if (!data.success) throw new Error('failed')
      setSubmitted(true)
    } catch {
      setErrors(er => ({ ...er, _submit: f.errors?.submitError || (isRTL ? 'אירעה שגיאה. נסו שוב.' : 'Something went wrong. Please try again.') }))
    } finally {
      setSubmitting(false)
    }
  }

  const set = (field) => (e) => {
    setValues(v => ({ ...v, [field]: e.target.value }))
    if (errors[field]) setErrors(er => ({ ...er, [field]: '' }))
  }

  return (
    <main>
      {/* Hero */}
      <section style={{
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(135deg, #0D1E2F 0%, #1A3554 100%)',
        backgroundSize: '32px 32px, cover',
        paddingTop: '160px',
        paddingBottom: '100px',
        textAlign: 'center',
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          paddingLeft: 'clamp(24px, 5vw, 80px)',
          paddingRight: 'clamp(24px, 5vw, 80px)',
          textAlign: 'center',
        }}>
          <span style={{
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#C4883A',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.18)',
            borderRadius: '100px',
            padding: '6px 16px',
            marginBottom: '24px',
            display: 'inline-block',
          }}>
            {t.eyebrow}
          </span>
          <h1 style={{
            fontSize: 'clamp(32px, 4.5vw, 56px)',
            fontWeight: 800,
            color: '#ffffff',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            marginBottom: '20px',
          }}>
            {t.heading}
          </h1>
          <p style={{
            fontSize: '18px',
            color: '#B0C8E0',
            lineHeight: 1.6,
            marginBottom: 0,
          }}>
            {t.subheading}
          </p>
        </div>
      </section>

      {/* Main content */}
      <section style={{
        backgroundColor: '#f4f7f9',
        paddingTop: '96px',
        paddingBottom: '96px',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          paddingLeft: 'clamp(24px, 5vw, 80px)',
          paddingRight: 'clamp(24px, 5vw, 80px)',
        }}>

          {/* Contact Form */}
          <div
            ref={formRef}
            style={{
              maxWidth: '760px',
              margin: '0 auto 64px',
              opacity: formRevealed ? 1 : 0,
              transform: formRevealed ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease',
            }}
          >
            <div style={{
              backgroundColor: '#ffffff',
              border: '1px solid #eef1f4',
              borderRadius: '16px',
              padding: '48px',
              boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
            }}>
              {submitted ? (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '64px 0',
                  textAlign: 'center',
                  gap: '16px',
                }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    backgroundColor: '#e8f4f6',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <svg style={{ width: '32px', height: '32px', color: '#1A3554' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p style={{ fontSize: '18px', fontWeight: 600, color: '#1A3554' }}>{f.success}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                    <InputField label={f.name} error={errors.name} isRTL={isRTL}>
                      <input
                        type="text"
                        value={values.name}
                        onChange={set('name')}
                        placeholder={f.namePlaceholder}
                        style={inputStyle('name')}
                      />
                    </InputField>
                    <InputField label={f.email} error={errors.email} isRTL={isRTL}>
                      <input
                        type="email"
                        value={values.email}
                        onChange={set('email')}
                        placeholder={f.emailPlaceholder}
                        style={inputStyle('email')}
                      />
                    </InputField>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                    <InputField label={f.phone} isRTL={isRTL}>
                      <input
                        type="tel"
                        value={values.phone}
                        onChange={set('phone')}
                        placeholder={f.phonePlaceholder}
                        style={inputStyle('phone')}
                      />
                    </InputField>
                    <InputField label={f.topic} error={errors.topic} isRTL={isRTL}>
                      <select
                        value={values.topic}
                        onChange={set('topic')}
                        style={inputStyle('topic')}
                      >
                        {f.topicOptions.map(o => (
                          <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                      </select>
                    </InputField>
                  </div>

                  <InputField label={f.message} error={errors.message} isRTL={isRTL}>
                    <textarea
                      rows={6}
                      value={values.message}
                      onChange={set('message')}
                      placeholder={f.messagePlaceholder}
                      style={{ ...inputStyle('message'), resize: 'none' }}
                    />
                  </InputField>

                  {errors._submit && (
                    <p style={{ fontSize: '13px', color: '#dc2626', textAlign: isRTL ? 'right' : 'left', margin: 0 }}>
                      {errors._submit}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={submitting}
                    style={{
                      width: '100%',
                      backgroundColor: '#C4883A',
                      color: '#ffffff',
                      fontWeight: 600,
                      fontSize: '16px',
                      padding: '16px',
                      border: 'none',
                      borderRadius: '12px',
                      cursor: submitting ? 'not-allowed' : 'pointer',
                      opacity: submitting ? 0.6 : 1,
                      transition: 'all 0.2s ease',
                      marginTop: '8px',
                    }}
                    onMouseEnter={(e) => !submitting && (e.target.style.backgroundColor = '#A96F25')}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = '#C4883A')}
                  >
                    {submitting ? f.submitting : f.submit}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Contact Details Cards */}
          <div
            ref={infoRef}
            style={{
              opacity: infoRevealed ? 1 : 0,
              transform: infoRevealed ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease',
            }}
          >
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '24px',
              marginBottom: '40px',
            }}>
              {/* Contact Info Card */}
              <ContactCard
                isRTL={isRTL}
                heading={t.info.heading}
                index={0}
                revealed={infoRevealed}
              >
                <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexDirection: 'row' }}>
                  <span style={{ color: '#C4883A', marginTop: '2px', flexShrink: 0 }}>
                    <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </span>
                  <div style={{ color: '#555555', lineHeight: 1.6, fontSize: '14px', whiteSpace: 'pre-line' }}>
                    {t.info.address}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexDirection: 'row' }}>
                  <span style={{ color: '#C4883A', flexShrink: 0 }}>
                    <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  <div style={{ fontSize: '14px' }}>
                    <span style={{ color: '#777777', fontSize: '12px' }}>{t.info.hours}: </span>
                    <span style={{ color: '#555555' }}>{t.info.hoursValue}</span>
                  </div>
                </div>
              </ContactCard>

              {/* Phone & Email Card */}
              <ContactCard
                isRTL={isRTL}
                heading={isRTL ? 'טלפון ואימייל' : 'Phone & Email'}
                index={1}
                revealed={infoRevealed}
              >
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '16px', flexDirection: 'row' }}>
                  <span style={{ color: '#C4883A', marginTop: '2px', flexShrink: 0 }}>
                    <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 8V5z" />
                    </svg>
                  </span>
                  <div>
                    <span style={{ color: '#777777', fontSize: '12px' }}>{t.info.phoneIL}: </span>
                    <a href={`tel:${officePhone.il}`} style={{ color: '#1A3554', textDecoration: 'none', fontWeight: 500, fontSize: '14px', display: 'block' }}>
                      {officePhone.il}
                    </a>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '16px', flexDirection: 'row' }}>
                  <span style={{ color: '#C4883A', marginTop: '2px', flexShrink: 0 }}>
                    <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 8V5z" />
                    </svg>
                  </span>
                  <div>
                    <span style={{ color: '#777777', fontSize: '12px' }}>{t.info.phoneUS}: </span>
                    <a href={`tel:${officePhone.us}`} style={{ color: '#1A3554', textDecoration: 'none', fontWeight: 500, fontSize: '14px', display: 'block' }}>
                      {officePhone.us}
                    </a>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '16px', flexDirection: 'row' }}>
                  <span style={{ color: '#C4883A', marginTop: '2px', flexShrink: 0 }}>
                    <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                  </span>
                  <div>
                    <span style={{ color: '#777777', fontSize: '12px' }}>{t.info.fax}: </span>
                    <span style={{ color: '#555555', fontSize: '14px', display: 'block' }}>{officePhone.ilFax}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', flexDirection: 'row' }}>
                  <span style={{ color: '#C4883A', marginTop: '2px', flexShrink: 0 }}>
                    <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <a href="mailto:info@galitzercpa.com" style={{ color: '#1A3554', textDecoration: 'none', fontWeight: 500, fontSize: '14px' }}>
                    info@galitzercpa.com
                  </a>
                </div>
              </ContactCard>

              {/* Map Card */}
              <div style={{
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid #eef1f4',
                boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
                minHeight: '240px',
                opacity: infoRevealed ? 1 : 0,
                transform: infoRevealed ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.6s ease ${2 * 80}ms, transform 0.6s ease ${2 * 80}ms`,
              }}>
                <iframe
                  title="S. Galitzer Associates Office"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3392.1!2d35.1763!3d31.7894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x150329d1b5ea!2s28%20Ben%20Zion%20St%2C%20Givat%20Shaul%2C%20Jerusalem!5e0!3m2!1sen!2sil!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0, display: 'block', minHeight: '240px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Waze button — mobile only */}
            <a
              href="https://waze.com/ul?ll=31.7894,35.1763&navigate=yes&q=28+Ben+Zion+Street+Jerusalem"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                backgroundColor: '#05c8f7',
                color: '#ffffff',
                fontWeight: 600,
                fontSize: '14px',
                padding: '12px 24px',
                borderRadius: '12px',
                boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
                textDecoration: 'none',
                maxWidth: '760px',
                margin: '0 auto',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#00b0e0'
                e.target.style.boxShadow = '0 8px 24px rgba(5,200,247,0.25)'
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#05c8f7'
                e.target.style.boxShadow = '0 1px 4px rgba(0,0,0,0.05)'
              }}
            >
              <svg style={{ width: '20px', height: '20px' }} viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.54 6.63C19.18 3.19 15.89 1 12.22 1 7.1 1 2.96 5.1 2.96 10.18c0 2.3.87 4.43 2.3 6.06l-.56 2.08a.75.75 0 00.94.93l2.18-.64A9.22 9.22 0 0012.22 19.4c5.12 0 9.26-4.1 9.26-9.18 0-.93-.14-1.83-.4-2.68l-.54-.91zM12.22 17.9c-1.4 0-2.72-.4-3.84-1.09l-.27-.17-1.6.47.44-1.65-.19-.28a7.55 7.55 0 01-1.24-4 7.5 7.5 0 0115-.03c0 4.16-3.37 7.52-7.52 7.52zm4.1-5.65c-.22-.11-1.3-.64-1.5-.71-.2-.07-.35-.11-.5.11-.15.22-.57.72-.7.86-.13.15-.26.17-.48.06-.22-.11-.93-.34-1.77-1.09-.65-.58-1.09-1.3-1.22-1.52-.13-.22-.01-.34.1-.45.1-.1.22-.26.33-.39.11-.13.15-.22.22-.37.07-.15.04-.28-.02-.39-.06-.11-.5-1.2-.68-1.64-.18-.43-.36-.37-.5-.38h-.43c-.15 0-.39.06-.6.28-.2.22-.78.76-.78 1.86s.8 2.16.91 2.31c.11.15 1.57 2.4 3.8 3.36.53.23.95.37 1.27.47.53.17 1.02.14 1.4.09.43-.06 1.32-.54 1.5-1.06.19-.52.19-.97.13-1.06-.05-.09-.2-.15-.43-.26z"/>
              </svg>
              {isRTL ? 'פתח ב-Waze' : 'Open in Waze'}
            </a>
          </div>
        </div>
      </section>

      <FinalCTA
        headingOverride={isRTL ? 'דברו איתנו — ועשו סדר במיסים שלכם' : undefined}
        ctaOverride={isRTL ? 'קבעו שיחה' : undefined}
      />
    </main>
  )
}

function ContactCard({ isRTL, heading, index, revealed, children }) {
  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        border: '1px solid #eef1f4',
        borderRadius: '16px',
        padding: '24px',
        boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
        textAlign: isRTL ? 'right' : 'left',
        opacity: revealed ? 1 : 0,
        transform: revealed ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.6s ease ${index * 80}ms, transform 0.6s ease ${index * 80}ms, box-shadow 0.3s ease`,
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(39,110,125,0.12)'
        e.currentTarget.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.05)'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#1A3554', marginBottom: '16px' }}>
        {heading}
      </h3>
      <div style={{ fontSize: '14px', color: '#666666', lineHeight: 1.6 }}>
        {children}
      </div>
    </div>
  )
}
