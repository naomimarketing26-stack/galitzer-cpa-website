import { Link } from 'react-router-dom'
import { CircleFlag } from 'react-circle-flags'
import { useLang } from '../context/LanguageContext'
import { content } from '../data/content'
import { OFFICE } from '../data/officeLocation'

const container = {
  maxWidth: '1200px',
  margin: '0 auto',
  paddingLeft: 'clamp(24px, 5vw, 80px)',
  paddingRight: 'clamp(24px, 5vw, 80px)',
}

const linkPaths = ['/services', '/team', '/about', '/blog', '/contact']

export default function Footer() {
  const { lang, toggle } = useLang()
  const t = content[lang].footer
  const isRTL = lang === 'he'

  return (
    <footer style={{ background: '#0D1E2F', color: 'white', paddingTop: '64px', paddingBottom: '40px' }}>
      <div style={container}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '40px',
            marginBottom: '48px',
            textAlign: isRTL ? 'right' : 'left',
          }}
        >
          {/* Brand */}
          <div style={{ textAlign: isRTL ? 'right' : 'left' }}>
            {/* Logo — inline-block so text-align: right pushes it to the right edge in Hebrew */}
            <div style={{ marginBottom: '12px' }}>
              <div style={{ direction: 'ltr', display: 'inline-block' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ fontSize: '18px', fontWeight: 800, color: 'white', letterSpacing: '-0.01em' }}>S.GALITZER</span>
                  <span style={{ fontSize: '18px', fontWeight: 800, color: '#C4883A', margin: '0 2px' }}>&</span>
                </div>
                <div style={{ fontSize: '18px', fontWeight: 800, color: 'white', letterSpacing: '-0.01em' }}>ASSOCIATES</div>
              </div>
            </div>
            <p style={{ fontSize: '13px', color: '#777777', marginBottom: '16px', lineHeight: 1.6 }}>{t.tagline}</p>
            {/* flex-start = right in RTL, left in LTR */}
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <button
                onClick={toggle}
                className={`flex items-center gap-2 rounded-full border transition-colors hover:border-[#555] ${isRTL ? 'py-1 pr-1 pl-3' : 'py-1 pl-1 pr-3'}`}
                style={{ background: 'rgba(255,255,255,0.05)', borderColor: '#2A3F55', cursor: 'pointer', direction: 'ltr' }}
              >
                <CircleFlag countryCode={lang === 'en' ? 'il' : 'us'} height={22} width={22} />
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#aaaaaa' }}>
                  {lang === 'en' ? 'עברית' : 'English'}
                </span>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '11px', fontWeight: 700, color: 'white', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '20px' }}>
              {isRTL ? 'ניווט מהיר' : 'Quick Links'}
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', listStyle: 'none' }}>
              {t.links.map((label, i) => (
                <li key={i}>
                  <Link
                    to={linkPaths[i]}
                    style={{ fontSize: '14px', color: '#777777', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
                    onMouseLeave={e => e.currentTarget.style.color = '#777777'}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: '11px', fontWeight: 700, color: 'white', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '20px' }}>
              {isRTL ? 'יצירת קשר' : 'Contact'}
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', listStyle: 'none' }}>
              <li>
                <a href={`mailto:${t.contact.email}`} style={{ fontSize: '14px', color: '#777777', textDecoration: 'none' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#fff'} onMouseLeave={e => e.currentTarget.style.color = '#777'}>
                  {t.contact.email}
                </a>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'flex-start' }}>
                <span style={{ opacity: 0.5 }}>🇮🇱</span>
                <a href={`tel:${t.contact.phoneIL}`} style={{ fontSize: '14px', color: '#777777', textDecoration: 'none', direction: 'ltr' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#fff'} onMouseLeave={e => e.currentTarget.style.color = '#777'}>
                  {t.contact.phoneIL}
                </a>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'flex-start' }}>
                <span style={{ opacity: 0.5 }}>🇺🇸</span>
                <a href={`tel:${t.contact.phoneUS}`} style={{ fontSize: '14px', color: '#777777', textDecoration: 'none', direction: 'ltr' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#fff'} onMouseLeave={e => e.currentTarget.style.color = '#777'}>
                  {t.contact.phoneUS}
                </a>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'flex-start' }}>
                <span aria-hidden="true" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '16px', color: '#25D366', fontSize: '16px', lineHeight: 1 }}>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                    <path d="M20.52 3.48A11.82 11.82 0 0 0 12.06 0C5.44 0 .05 5.39.05 12.01c0 2.12.55 4.2 1.59 6.03L0 24l6.12-1.61A12.02 12.02 0 0 0 12.06 24c6.62 0 12.01-5.39 12.01-12.01 0-3.21-1.25-6.23-3.55-8.51ZM12.06 21.9c-1.94 0-3.83-.52-5.48-1.51l-.39-.23-3.64.96 1-3.54-.26-.38A9.82 9.82 0 0 1 2.2 12.01c0-5.43 4.43-9.86 9.86-9.86 2.63 0 5.1 1.03 6.96 2.89a9.79 9.79 0 0 1 2.89 6.97c0 5.43-4.43 9.86-9.86 9.86Zm5.38-7.37c-.29-.15-1.72-.85-1.99-.95-.27-.1-.46-.15-.66.15-.2.29-.77.95-.94 1.15-.17.2-.35.22-.64.08-.29-.15-1.22-.45-2.32-1.44-.86-.77-1.44-1.71-1.6-2-.17-.29-.02-.45.13-.59.13-.13.29-.35.44-.52.15-.17.2-.29.29-.49.1-.2.05-.37-.02-.52-.08-.15-.66-1.6-.9-2.2-.24-.59-.48-.51-.66-.52l-.56-.01c-.2 0-.52.08-.79.38-.27.3-1.03 1.01-1.03 2.46s1.06 2.85 1.2 3.05c.15.2 2.08 3.18 5.04 4.46.7.3 1.25.48 1.68.62.7.22 1.34.19 1.85.12.56-.08 1.72-.7 1.96-1.38.24-.68.24-1.27.17-1.39-.08-.12-.29-.19-.6-.33Z" />
                  </svg>
                </span>
                <a
                  href={`https://wa.me/${t.contact.whatsAppIL.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: '14px', color: '#777777', textDecoration: 'none', direction: 'ltr' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                  onMouseLeave={e => e.currentTarget.style.color = '#777'}
                >
                  {t.contact.whatsAppIL}
                </a>
              </li>
              <li style={{ fontSize: '13px', color: '#555555', display: 'flex', gap: '4px', justifyContent: 'flex-start' }}>
                <span>{isRTL ? 'פקס:' : 'Fax:'}</span>
                <span style={{ direction: 'ltr' }}>{t.contact.fax}</span>
              </li>
            </ul>
          </div>

          {/* Office */}
          <div>
            <h4 style={{ fontSize: '11px', fontWeight: 700, color: 'white', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '20px' }}>
              {t.office.label}
            </h4>
            <a
              href={OFFICE.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: '14px', color: '#777777', lineHeight: 1.7, whiteSpace: 'pre-line', marginBottom: '16px', display: 'block', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
              onMouseLeave={e => e.currentTarget.style.color = '#777777'}
            >
              {t.office.address}
            </a>
            <p style={{ fontSize: '11px', color: '#555555', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>{t.office.hoursLabel}</p>
            <p style={{ fontSize: '14px', color: '#777777' }}>{t.office.hours}</p>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid #1E3448', paddingTop: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <p style={{ fontSize: '12px', color: '#4A5E72', textAlign: 'center', lineHeight: 1.6 }}>{t.copyright}</p>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link to="/privacy" style={{ fontSize: '12px', color: '#3D5268', textDecoration: 'none' }}
              onMouseEnter={e => e.currentTarget.style.color = '#fff'} onMouseLeave={e => e.currentTarget.style.color = '#3D5268'}>
              {isRTL ? 'מדיניות פרטיות' : 'Privacy Policy'}
            </Link>
            <span style={{ color: '#2A3F55', fontSize: '12px' }}>·</span>
            <Link to="/accessibility" style={{ fontSize: '12px', color: '#3D5268', textDecoration: 'none' }}
              onMouseEnter={e => e.currentTarget.style.color = '#fff'} onMouseLeave={e => e.currentTarget.style.color = '#3D5268'}>
              {isRTL ? 'הצהרת נגישות' : 'Accessibility Statement'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
