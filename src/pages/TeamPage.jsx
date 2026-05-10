import { useState } from 'react'
import { useLang } from '../context/LanguageContext'
import { staff, groups, teamContent, officePhone } from '../data/team'
import { useReveal } from '../hooks/useReveal'

const container = {
  maxWidth: '1200px',
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

function BioModal({ member, lang, isRTL, onClose }) {
  const bio = lang === 'he' ? member.bioHe : member.bioEn
  const displayName = isRTL ? member.nameHe : member.name
  const displayPosition = isRTL ? member.positionHe : member.position
  const initials = displayName.split(' ').map(n => n[0]).slice(0, 2).join('')

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(13,30,47,0.6)', backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#ffffff', borderRadius: '20px',
          padding: '40px', maxWidth: '640px', width: '100%',
          maxHeight: '82vh', overflowY: 'auto',
          boxShadow: '0 24px 64px rgba(0,0,0,0.25)',
          position: 'relative',
        }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: '16px', right: '16px',
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: '18px', color: '#aaa', lineHeight: 1,
            width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: '50%',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#f0f0f0'; e.currentTarget.style.color = '#555'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#aaa'; }}
        >
          ✕
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '28px', flexDirection: 'row' }}>
          <div style={{
            width: '52px', height: '52px', borderRadius: '50%', flexShrink: 0,
            backgroundImage: 'linear-gradient(135deg, #0D1E2F 0%, #1A3554 100%)',
            color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '16px', fontWeight: 700,
          }}>
            {initials}
          </div>
          <div style={{ textAlign: isRTL ? 'right' : 'left' }}>
            <p style={{ fontSize: '17px', fontWeight: 700, color: '#1a1a1a', marginBottom: '3px' }}>{displayName}</p>
            <p style={{ fontSize: '13px', color: '#C4883A', fontWeight: 600 }}>{displayPosition}</p>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #eef1f4', paddingTop: '24px' }}>
          {bio.split('\n\n').map((para, i) => (
            <p key={i} style={{ fontSize: '15px', color: '#444444', lineHeight: 1.8, marginBottom: '16px', textAlign: isRTL ? 'right' : 'left' }}>
              {para}
            </p>
          ))}
        </div>

        {/* CTA footer */}
        <div style={{ borderTop: '1px solid #eef1f4', paddingTop: '24px', marginTop: '8px' }}>
          {/* Desktop: phone + book link */}
          <div className="hidden sm:flex" style={{ alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexDirection: 'row' }}>
            <div style={{ textAlign: isRTL ? 'right' : 'left' }}>
              <p style={{ fontSize: '13px', fontWeight: 700, color: '#1A3554', marginBottom: '4px' }}>
                {isRTL ? 'רוצים לדבר?' : 'Want to connect?'}
              </p>
              <a
                href="tel:+97226525060"
                style={{ fontSize: '14px', fontWeight: 600, color: '#C4883A', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}
                onMouseEnter={e => e.currentTarget.style.color = '#A96F25'}
                onMouseLeave={e => e.currentTarget.style.color = '#C4883A'}
              >
                📞 972-2-652-5060
              </a>
            </div>
            <a
              href="/contact"
              onClick={onClose}
              style={{
                display: 'inline-flex', alignItems: 'center',
                background: '#C4883A', color: '#ffffff',
                fontWeight: 700, fontSize: '13px',
                padding: '10px 24px', borderRadius: '8px',
                textDecoration: 'none', whiteSpace: 'nowrap',
                transition: 'background 0.2s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#A96F25'}
              onMouseLeave={e => e.currentTarget.style.background = '#C4883A'}
            >
              {isRTL ? 'קבע ייעוץ' : 'Book a Consultation'}
            </a>
          </div>

          {/* Mobile: call button only */}
          <a
            href="tel:+97226525060"
            className="flex sm:hidden"
            style={{
              alignItems: 'center', justifyContent: 'center', gap: '10px',
              background: '#C4883A', color: '#ffffff',
              fontWeight: 700, fontSize: '15px',
              padding: '14px', borderRadius: '10px',
              textDecoration: 'none', width: '100%',
              boxShadow: '0 4px 12px rgba(196,136,58,0.3)',
            }}
          >
            📞 {isRTL ? 'התקשר למשרד' : 'Call the Office'}
          </a>
        </div>
      </div>
    </div>
  )
}

function StaffCard({ member, t, isRTL, onViewBio, isPartner }) {
  const displayName = isRTL ? member.nameHe : member.name
  const displayPosition = isRTL ? member.positionHe : member.position
  const initials = displayName.split(' ').map(n => n[0]).slice(0, 2).join('')
  const hasBio = !!(member.bioEn)

  return (
    <div
      className="hover:-translate-y-1 transition-all duration-300"
      style={{
        background: '#ffffff',
        border: isPartner ? '1.5px solid rgba(196,136,58,0.32)' : '1px solid rgba(0,0,0,0.06)',
        borderRadius: '16px',
        padding: '24px',
        boxShadow: isPartner ? '0 4px 24px rgba(196,136,58,0.10)' : '0 4px 20px rgba(0,0,0,0.06)',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = isPartner ? '0 8px 32px rgba(196,136,58,0.18)' : '0 8px 32px rgba(0,0,0,0.10)'; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = isPartner ? '0 4px 24px rgba(196,136,58,0.10)' : '0 4px 20px rgba(0,0,0,0.06)'; }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexDirection: 'row' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundImage: 'linear-gradient(135deg, #0D1E2F 0%, #1A3554 100%)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', fontWeight: 700, flexShrink: 0, outline: '4px solid rgba(39,110,125,0.1)' }}>
          {initials}
        </div>
        <div style={{ textAlign: isRTL ? 'right' : 'left' }}>
          <p style={{ fontSize: '14px', fontWeight: 700, color: '#1a1a1a', lineHeight: 1.3 }}>{displayName}</p>
          <p style={{ fontSize: '12px', color: '#C4883A', fontWeight: 600, marginTop: '3px' }}>{displayPosition}</p>
        </div>
      </div>

      <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <a href={`mailto:${member.email}`} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#666666', textDecoration: 'none', flexDirection: 'row' }}
          onMouseEnter={e => e.currentTarget.style.color = '#1A3554'} onMouseLeave={e => e.currentTarget.style.color = '#666'}>
          <span style={{ color: '#1A3554' }}><MailIcon /></span>
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{member.email}</span>
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#666666', flexDirection: 'row' }}>
          <span style={{ color: '#1A3554' }}><HashIcon /></span>
          <span>{t.extLabel} {member.extension}</span>
        </div>
        {member.phone && (
          <a href={`tel:${member.phone.replace(/\D/g, '')}`} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#666666', textDecoration: 'none', flexDirection: 'row' }}
            onMouseEnter={e => e.currentTarget.style.color = '#1A3554'} onMouseLeave={e => e.currentTarget.style.color = '#666'}>
            <span style={{ color: '#1A3554' }}><PhoneIcon /></span>
            <span>{member.phone}</span>
          </a>
        )}
      </div>

      {hasBio && (
        <button
          onClick={() => onViewBio(member)}
          style={{
            marginTop: '4px',
            padding: '8px 0',
            background: '#EEF3F7',
            color: '#1A3554',
            fontSize: '12px',
            fontWeight: 600,
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            width: '100%',
            transition: 'background 0.2s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#DDE6ED'; }}
          onMouseLeave={e => { e.currentTarget.style.background = '#EEF3F7'; }}
        >
          {isRTL ? 'צפה בביוגרפיה' : 'View Bio'}
        </button>
      )}
    </div>
  )
}

function GroupSection({ group, members, t, isRTL, onViewBio }) {
  const [gridRef, gridRevealed] = useReveal()
  const isPartner = group === 'Partners & CPAs'
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px', flexDirection: 'row' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#1A3554', whiteSpace: 'nowrap' }}>{t.groupLabels[group]}</h2>
        <div style={{ flex: 1, height: '1px', background: '#eef1f4' }} />
      </div>
      <div ref={gridRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: '16px' }}>
        {members.map((member, i) => (
          <div key={i} style={{ opacity: gridRevealed ? 1 : 0, transform: gridRevealed ? 'translateY(0)' : 'translateY(20px)', transition: `opacity 0.6s ease ${i * 60}ms, transform 0.6s ease ${i * 60}ms` }}>
            <StaffCard member={member} t={t} isRTL={isRTL} onViewBio={onViewBio} isPartner={isPartner} />
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
  const [activeBioMember, setActiveBioMember] = useState(null)

  return (
    <main>
      {/* Hero */}
      <section style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(135deg, #0D1E2F 0%, #1A3554 100%)', backgroundSize: '32px 32px, cover', paddingTop: '160px', paddingBottom: '80px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', paddingLeft: 'clamp(24px, 5vw, 80px)', paddingRight: 'clamp(24px, 5vw, 80px)', textAlign: 'center' }}>
          <span className="hero-animate hero-delay-1 inline-block" style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C4883A', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: '100px', padding: '6px 16px', marginBottom: '24px', display: 'inline-block' }}>{t.eyebrow}</span>
          <h1 className="hero-animate hero-delay-2" style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', fontWeight: 800, color: '#ffffff', lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: '20px' }}>{t.heading}</h1>
          <p className="hero-animate hero-delay-3" style={{ fontSize: '17px', color: '#B0C8E0', lineHeight: 1.7, maxWidth: '560px', margin: '0 auto' }}>{t.subheading}</p>
        </div>
      </section>

      {/* Office contact bar */}
      <section style={{ background: '#1a1a1a', paddingTop: '16px', paddingBottom: '16px' }}>
        <div style={{ ...container, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '20px', flexDirection: 'row' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#555555', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{t.officeLabel}:</span>
          <a href={`tel:${officePhone.il}`} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#cccccc', textDecoration: 'none' }} onMouseEnter={e => e.currentTarget.style.color = '#C4883A'} onMouseLeave={e => e.currentTarget.style.color = '#ccc'}>
            <span>🇮🇱</span>
            <span style={{ direction: 'ltr' }}>{officePhone.il}</span>
          </a>
          <span style={{ color: '#333', display: 'none' }}>|</span>
          <a href={`tel:${officePhone.us}`} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#cccccc', textDecoration: 'none' }} onMouseEnter={e => e.currentTarget.style.color = '#C4883A'} onMouseLeave={e => e.currentTarget.style.color = '#ccc'}>
            <span>🇺🇸</span>
            <span style={{ direction: 'ltr' }}>{officePhone.us}</span>
          </a>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#444444' }}>
            <span>{isRTL ? 'פקס:' : 'Fax:'}</span>
            <span style={{ direction: 'ltr' }}>{officePhone.ilFax}</span>
          </span>
        </div>
      </section>

      {/* Staff by group */}
      <section style={{ backgroundColor: '#f4f7f9', paddingTop: '96px', paddingBottom: '96px' }}>
        <div style={{ ...container, display: 'flex', flexDirection: 'column', gap: '64px' }}>
          {groups.map(group => {
            const members = staff.filter(s => s.group === group)
            if (!members.length) return null
            return <GroupSection key={group} group={group} members={members} t={t} isRTL={isRTL} onViewBio={setActiveBioMember} />
          })}
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{ backgroundColor: '#e8f4f6', paddingTop: '80px', paddingBottom: '80px' }}>
        <div ref={ctaRef} style={{ maxWidth: '600px', margin: '0 auto', paddingLeft: 'clamp(24px, 5vw, 80px)', paddingRight: 'clamp(24px, 5vw, 80px)', textAlign: isRTL ? 'right' : 'center', opacity: ctaRevealed ? 1 : 0, transform: ctaRevealed ? 'translateY(0)' : 'translateY(20px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}>
          <p style={{ fontSize: '22px', fontWeight: 700, color: '#1A3554', marginBottom: '12px' }}>{t.notSure}</p>
          <p style={{ fontSize: '16px', color: '#555555', lineHeight: 1.7, marginBottom: '32px' }}>{t.notSureSub}</p>
          <a href="/contact" style={{ display: 'inline-flex', alignItems: 'center', background: '#C4883A', color: '#ffffff', fontWeight: 700, fontSize: '15px', padding: '14px 40px', borderRadius: '10px', textDecoration: 'none', boxShadow: '0 4px 16px rgba(196,136,58,0.3)', transition: 'all 0.2s ease' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#A96F25'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#C4883A'; e.currentTarget.style.transform = 'translateY(0)'; }}>
            {t.cta}
          </a>
        </div>
      </section>

      {/* Bio Modal */}
      {activeBioMember && (
        <BioModal
          member={activeBioMember}
          lang={lang}
          isRTL={isRTL}
          onClose={() => setActiveBioMember(null)}
        />
      )}
    </main>
  )
}
