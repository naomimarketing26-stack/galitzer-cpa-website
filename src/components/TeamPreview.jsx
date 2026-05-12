import { Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'
import { staff } from '../data/team'
import { useReveal } from '../hooks/useReveal'

const container = {
  maxWidth: '1200px',
  margin: '0 auto',
  paddingLeft: 'clamp(24px, 5vw, 80px)',
  paddingRight: 'clamp(24px, 5vw, 80px)',
}

const preview = {
  en: {
    eyebrow: 'Meet the Team',
    heading: 'Expert CPAs. Personal Service.',
    subheading: 'Our bilingual team of licensed U.S. and Israeli CPAs is dedicated to your financial success.',
    cta: 'Meet the Full Team',
  },
  he: {
    eyebrow: 'הצוות שלנו',
    heading: 'רואי חשבון מומחים. שירות אישי.',
    subheading: 'צוות רואי החשבון הדו-לשוני המורשה שלנו בארה"ב ובישראל מחויב להצלחתכם הפיננסית.',
    cta: 'הכירו את הצוות המלא',
  },
}

const featured = staff.filter(s => s.group === 'Partners & CPAs').slice(0, 4)

function MiniCard({ member, isRTL }) {
  const initials = (isRTL ? member.nameHe : member.name).split(' ').map(n => n[0]).slice(0, 2).join('')
  const displayName = isRTL ? member.nameHe : member.name
  const displayPosition = isRTL ? member.positionHe : member.position

  return (
    <div
      className="hover:-translate-y-1 transition-all duration-300"
      style={{
        background: '#F7F9FC',
        border: '1.5px solid #E8EDF3',
        borderRadius: '20px',
        padding: '24px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        flexDirection: isRTL ? 'row-reverse' : 'row',
        direction: 'ltr',
        boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
      }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 10px 28px rgba(26,53,84,0.13)'; e.currentTarget.style.borderColor = '#C4883A'; e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.04)'; e.currentTarget.style.borderColor = '#E8EDF3'; e.currentTarget.style.background = '#F7F9FC'; e.currentTarget.style.transform = 'translateY(0)'; }}
    >
      <div
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: '#1A3554',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '15px',
          fontWeight: 700,
          flexShrink: 0,
          outline: '4px solid rgba(26,53,84,0.12)',
        }}
      >
        {initials}
      </div>
      <div style={{ minWidth: 0, textAlign: isRTL ? 'right' : 'left' }}>
        <p style={{ fontSize: '14px', fontWeight: 700, color: '#1a1a1a', lineHeight: 1.3 }}>{displayName}</p>
        <p style={{ fontSize: '12px', color: '#C4883A', fontWeight: 600, marginTop: '3px' }}>{displayPosition}</p>
        <a
          href={`mailto:${member.email}`}
          style={{ fontSize: '12px', color: '#888888', textDecoration: 'none', marginTop: '3px', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
          onMouseEnter={e => e.currentTarget.style.color = '#1A3554'}
          onMouseLeave={e => e.currentTarget.style.color = '#888888'}
        >
          {member.email}
        </a>
      </div>
    </div>
  )
}

export default function TeamPreview() {
  const { lang } = useLang()
  const t = preview[lang]
  const isRTL = lang === 'he'

  const [headerRef, headerRevealed] = useReveal()
  const [gridRef, gridRevealed] = useReveal()
  const [ctaRef, ctaRevealed] = useReveal()

  return (
    <section style={{ backgroundColor: '#f4f7f9', paddingTop: '96px', paddingBottom: '96px' }}>
      <div style={container}>
        {/* Header */}
        <div
          ref={headerRef}
          style={{
            textAlign: 'center',
            marginBottom: '56px',
            opacity: headerRevealed ? 1 : 0,
            transform: headerRevealed ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#1A3554',
              background: '#EAF0F8',
              padding: '5px 14px',
              borderRadius: '100px',
              marginBottom: '16px',
            }}
          >
            {t.eyebrow}
          </span>
          <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 700, color: '#1A3554', lineHeight: 1.25, marginBottom: '14px' }}>
            {t.heading}
          </h2>
          <p style={{ fontSize: '17px', color: '#666666', lineHeight: 1.7, maxWidth: '520px', margin: '0 auto' }}>
            {t.subheading}
          </p>
        </div>

        {/* Cards */}
        <div
          ref={gridRef}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '40px' }}
        >
          {featured.map((member, i) => (
            <div
              key={i}
              style={{
                opacity: gridRevealed ? 1 : 0,
                transform: gridRevealed ? 'translateY(0)' : 'translateY(24px)',
                transition: `opacity 0.6s ease ${i * 80}ms, transform 0.6s ease ${i * 80}ms`,
              }}
            >
              <MiniCard member={member} isRTL={isRTL} />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          ref={ctaRef}
          style={{
            textAlign: 'center',
            opacity: ctaRevealed ? 1 : 0,
            transform: ctaRevealed ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <Link
            to="/team"
            className="group inline-flex items-center gap-2 font-semibold transition-colors"
            style={{ color: '#1A3554', fontSize: '15px', textDecoration: 'none', flexDirection: 'row' }}
          >
            {t.cta}
            <span>{isRTL ? '←' : '→'}</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
