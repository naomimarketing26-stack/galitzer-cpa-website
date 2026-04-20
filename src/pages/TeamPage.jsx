import { useLang } from '../context/LanguageContext'
import { staff, groups, teamContent, officePhone } from '../data/team'
import { useReveal } from '../hooks/useReveal'

const container = {
  maxWidth: '1200px',
  margin: '0 auto',
  paddingLeft: 'clamp(24px, 5vw, 80px)',
  paddingRight: 'clamp(24px, 5vw, 80px)',
}

const narrowContainer = {
  maxWidth: '800px',
  margin: '0 auto',
  paddingLeft: 'clamp(24px, 5vw, 80px)',
  paddingRight: 'clamp(24px, 5vw, 80px)',
}

function MailIcon() {
  return <svg style={{ width: '13px', height: '13px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
}
function PhoneIcon() {
  return <svg style={{ width: '13px', height: '13px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 8V5z" /></svg>
}
function HashIcon() {
  return <svg style={{ width: '13px', height: '13px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" /></svg>
}

function StaffCard({ member, t, isRTL }) {
  const displayName = isRTL ? member.nameHe : member.name
  const displayPosition = isRTL ? member.positionHe : member.position
  const initials = member.name.split(' ').map(n => n[0]).slice(0, 2).join('')

  return (
    <div
      className="hover:-translate-y-1 transition-all duration-300"
      style={{
        background: '#ffffff',
        border: '1px solid #eef1f4',
        borderRadius: '16px',
        padding: '24px',
        boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 24px rgba(39,110,125,0.1)'; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.05)'; }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#276e7d', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', fontWeight: 700, flexShrink: 0, outline: '4px solid rgba(39,110,125,0.1)' }}>
          {initials}
        </div>
        <div style={{ textAlign: isRTL ? 'right' : 'left' }}>
          <p style={{ fontSize: '14px', fontWeight: 700, color: '#1a1a1a', lineHeight: 1.3 }}>{displayName}</p>
          <p style={{ fontSize: '12px', color: '#7ed957', fontWeight: 600, marginTop: '3px' }}>{displayPosition}</p>
        </div>
      </div>
      <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <a href={`mailto:${member.email}`} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#666666', textDecoration: 'none', flexDirection: isRTL ? 'row-reverse' : 'row' }}
          onMouseEnter={e => e.currentTarget.style.color = '#276e7d'} onMouseLeave={e => e.currentTarget.style.color = '#666'}>
          <span style={{ color: '#276e7d' }}><MailIcon /></span>
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{member.email}</span>
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#666666', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
          <span style={{ color: '#276e7d' }}><HashIcon /></span>
          <span>{t.extLabel} {member.extension}</span>
        </div>
        {member.phone && (
          <a href={`tel:${member.phone.replace(/\D/g, '')}`} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#666666', textDecoration: 'none', flexDirection: isRTL ? 'row-reverse' : 'row' }}
            onMouseEnter={e => e.currentTarget.style.color = '#276e7d'} onMouseLeave={e => e.currentTarget.style.color = '#666'}>
            <span style={{ color: '#276e7d' }}><PhoneIcon /></span>
            <span>{member.phone}</span>
          </a>
        )}
      </div>
    </div>
  )
}

function GroupSection({ group, members, t, isRTL }) {
  const [gridRef, gridRevealed] = useReveal()
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#276e7d', whiteSpace: 'nowrap' }}>{t.groupLabels[group]}</h2>
        <div style={{ flex: 1, height: '1px', background: '#eef1f4' }} />
      </div>
      <div ref={gridRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: '16px' }}>
        {members.map((member, i) => (
          <div key={i} style={{ opacity: gridRevealed ? 1 : 0, transform: gridRevealed ? 'translateY(0)' : 'translateY(20px)', transition: `opacity 0.6s ease ${i * 60}ms, transform 0.6s ease ${i * 60}ms` }}>
            <StaffCard member={member} t={t} isRTL={isRTL} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function TeamPage() {
  const { lang } = useLang()
  const t = teamContent[lang]
  const isRTL = lang === 'he'
  const [ctaRef, ctaRevealed] = useReveal()

  return (
    <main>
      {/* Hero */}
      <section style={{ background: '#276e7d', paddingTop: '160px', paddingBottom: '80px', backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', paddingLeft: 'clamp(24px, 5vw, 80px)', paddingRight: 'clamp(24px, 5vw, 80px)', textAlign: isRTL ? 'right' : 'center' }}>
          <span className="hero-animate hero-delay-1 inline-block" style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#7ed957', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '100px', padding: '6px 16px', marginBottom: '24px', display: 'inline-block' }}>{t.eyebrow}</span>
          <h1 className="hero-animate hero-delay-2" style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', fontWeight: 800, color: '#ffffff', lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: '20px' }}>{t.heading}</h1>
          <p className="hero-animate hero-delay-3" style={{ fontSize: '17px', color: '#c8e8ed', lineHeight: 1.7, maxWidth: '560px', margin: isRTL ? '0 0 0 auto' : '0 auto' }}>{t.subheading}</p>
        </div>
      </section>

      {/* Office contact bar */}
      <section style={{ background: '#1a1a1a', paddingTop: '16px', paddingBottom: '16px' }}>
        <div style={{ ...container, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '20px', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#555555', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{t.officeLabel}:</span>
          <a href={`tel:${officePhone.il}`} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#cccccc', textDecoration: 'none' }} onMouseEnter={e => e.currentTarget.style.color = '#7ed957'} onMouseLeave={e => e.currentTarget.style.color = '#ccc'}>
            🇮🇱 {officePhone.il}
          </a>
          <span style={{ color: '#333', display: 'none' }}>|</span>
          <a href={`tel:${officePhone.us}`} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#cccccc', textDecoration: 'none' }} onMouseEnter={e => e.currentTarget.style.color = '#7ed957'} onMouseLeave={e => e.currentTarget.style.color = '#ccc'}>
            🇺🇸 {officePhone.us}
          </a>
          <span style={{ fontSize: '12px', color: '#444444' }}>Fax: {officePhone.ilFax}</span>
        </div>
      </section>

      {/* Staff by group */}
      <section style={{ backgroundColor: '#f4f7f9', paddingTop: '96px', paddingBottom: '96px' }}>
        <div style={{ ...container, display: 'flex', flexDirection: 'column', gap: '64px' }}>
          {groups.map(group => {
            const members = staff.filter(s => s.group === group)
            if (!members.length) return null
            return <GroupSection key={group} group={group} members={members} t={t} isRTL={isRTL} />
          })}
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{ backgroundColor: '#e8f4f6', paddingTop: '80px', paddingBottom: '80px' }}>
        <div ref={ctaRef} style={{ maxWidth: '600px', margin: '0 auto', paddingLeft: 'clamp(24px, 5vw, 80px)', paddingRight: 'clamp(24px, 5vw, 80px)', textAlign: isRTL ? 'right' : 'center', opacity: ctaRevealed ? 1 : 0, transform: ctaRevealed ? 'translateY(0)' : 'translateY(20px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}>
          <p style={{ fontSize: '22px', fontWeight: 700, color: '#276e7d', marginBottom: '12px' }}>{t.notSure}</p>
          <p style={{ fontSize: '16px', color: '#555555', lineHeight: 1.7, marginBottom: '32px' }}>{t.notSureSub}</p>
          <a href="/contact" style={{ display: 'inline-flex', alignItems: 'center', background: '#7ed957', color: '#1a1a1a', fontWeight: 700, fontSize: '15px', padding: '14px 40px', borderRadius: '10px', textDecoration: 'none', boxShadow: '0 4px 16px rgba(126,217,87,0.3)', transition: 'all 0.2s ease' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#65c040'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#7ed957'; e.currentTarget.style.transform = 'translateY(0)'; }}>
            {t.cta}
          </a>
        </div>
      </section>
    </main>
  )
}
