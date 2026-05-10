import { Link } from 'react-router-dom'
import { CircleFlag } from 'react-circle-flags'
import { useLang } from '../context/LanguageContext'
import { content } from '../data/content'

const container = {
  maxWidth: '1200px',
  margin: '0 auto',
  paddingLeft: 'clamp(24px, 5vw, 80px)',
  paddingRight: 'clamp(24px, 5vw, 80px)',
}

const linkPaths = ['/services', '/team', '/about', '/blog', '/contact', '/privacy']

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
          <div style={{ textAlign: isRTL ? 'right' : 'left', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            {/* Logo — always LTR text order, but column is RTL-aligned */}
            <div style={{ marginBottom: '12px' }}>
              <div style={{ direction: 'ltr', display: 'inline-flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '18px', fontWeight: 800, color: 'white', letterSpacing: '-0.01em' }}>S.GALITZER</span>
                <span style={{ fontSize: '18px', fontWeight: 800, color: '#C4883A', margin: '0 2px' }}>&</span>
                <span style={{ fontSize: '18px', fontWeight: 800, color: 'white', letterSpacing: '-0.01em' }}>ASSOCIATES</span>
              </div>
            </div>
            <p style={{ fontSize: '13px', color: '#777777', marginBottom: '16px', lineHeight: 1.6 }}>{t.tagline}</p>
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
              <li style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: isRTL ? 'flex-end' : 'flex-start', direction: 'ltr' }}>
                <span style={{ opacity: 0.5 }}>🇮🇱</span>
                <a href={`tel:${t.contact.phoneIL}`} style={{ fontSize: '14px', color: '#777777', textDecoration: 'none' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#fff'} onMouseLeave={e => e.currentTarget.style.color = '#777'}>
                  {t.contact.phoneIL}
                </a>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: isRTL ? 'flex-end' : 'flex-start', direction: 'ltr' }}>
                <span style={{ opacity: 0.5 }}>🇺🇸</span>
                <a href={`tel:${t.contact.phoneUS}`} style={{ fontSize: '14px', color: '#777777', textDecoration: 'none' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#fff'} onMouseLeave={e => e.currentTarget.style.color = '#777'}>
                  {t.contact.phoneUS}
                </a>
              </li>
              <li style={{ fontSize: '13px', color: '#555555', display: 'flex', gap: '4px', justifyContent: isRTL ? 'flex-end' : 'flex-start', direction: 'ltr' }}>
                <span>{isRTL ? 'פקס:' : 'Fax:'}</span>
                <span>{t.contact.fax}</span>
              </li>
            </ul>
          </div>

          {/* Office */}
          <div>
            <h4 style={{ fontSize: '11px', fontWeight: 700, color: 'white', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '20px' }}>
              {t.office.label}
            </h4>
            <p style={{ fontSize: '14px', color: '#777777', lineHeight: 1.7, whiteSpace: 'pre-line', marginBottom: '16px' }}>
              {t.office.address}
            </p>
            <p style={{ fontSize: '11px', color: '#555555', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>{t.office.hoursLabel}</p>
            <p style={{ fontSize: '14px', color: '#777777' }}>{t.office.hours}</p>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid #1E3448', paddingTop: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
          <p style={{ fontSize: '12px', color: '#555555' }}>{t.copyright}</p>
          <Link to="/privacy" style={{ fontSize: '12px', color: '#555555', textDecoration: 'none' }}
            onMouseEnter={e => e.currentTarget.style.color = '#fff'} onMouseLeave={e => e.currentTarget.style.color = '#555'}>
            {isRTL ? 'מדיניות פרטיות' : 'Privacy Policy'}
          </Link>
        </div>
      </div>
    </footer>
  )
}
