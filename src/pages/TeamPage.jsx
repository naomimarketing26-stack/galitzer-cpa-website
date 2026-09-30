import { useState } from 'react'
import { useLang } from '../context/LanguageContext'
import { staff, teamContent, officePhone } from '../data/team'
import { useReveal } from '../hooks/useReveal'

const container = { maxWidth: '1200px', margin: '0 auto', paddingLeft: 'clamp(24px, 5vw, 80px)', paddingRight: 'clamp(24px, 5vw, 80px)' }

function MailIcon() { return <svg style={{ width: '13px', height: '13px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> }
function PhoneIcon() { return <svg style={{ width: '13px', height: '13px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg> }
function HashIcon() { return <svg style={{ width: '13px', height: '13px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h12M4 15h16" /></svg> }

function BioModal({ member, lang, isRTL, onClose }) {
  const bio = lang === 'he' ? member.bioHe : member.bioEn
  const name = isRTL ? member.nameHe : member.name
  const position = isRTL ? member.positionHe : member.position
  return <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(13,30,47,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
    <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: '20px', padding: '40px', maxWidth: '640px', width: '100%', maxHeight: '82vh', overflowY: 'auto', position: 'relative' }}>
      <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, border: 0, background: 'none', cursor: 'pointer', fontSize: 18 }}>✕</button>
      <h2 style={{ color: '#1A3554', marginBottom: 4 }}>{name}</h2>
      <p style={{ color: '#C4883A', fontWeight: 600, marginBottom: 24 }}>{position}</p>
      <div style={{ borderTop: '1px solid #eef1f4', paddingTop: 24 }}>
        {bio.split('\n\n').map((paragraph, i) => <p key={i} style={{ lineHeight: 1.8, marginBottom: 16, textAlign: isRTL ? 'right' : 'left' }}>{paragraph}</p>)}
      </div>
      <a href="/contact" onClick={onClose} style={{ display: 'inline-flex', marginTop: 8, padding: '12px 24px', borderRadius: 8, background: '#C4883A', color: '#fff', textDecoration: 'none', fontWeight: 700 }}>{isRTL ? 'קבע ייעוץ' : 'Book a Consultation'}</a>
    </div>
  </div>
}

function StaffCard({ member, t, isRTL, onViewBio }) {
  const name = isRTL ? member.nameHe : member.name
  const position = isRTL ? member.positionHe : member.position
  const initials = name.split(' ').map(part => part[0]).slice(0, 2).join('')
  const hasBio = !!member.bioEn
  return <div className="hover:-translate-y-1 transition-all duration-300" style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.07)', borderRadius: 16, padding: 24, boxSizing: 'border-box', minHeight: 128, height: '100%', boxShadow: '0 1px 6px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: 16 }} onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 4px 14px rgba(0,0,0,0.09)' }} onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 1px 6px rgba(0,0,0,0.05)' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, minHeight: 56 }}>
      <div style={{ width: 48, height: 48, flexShrink: 0, borderRadius: '50%', background: 'linear-gradient(135deg, #0D1E2F, #1A3554)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700 }}>{initials}</div>
      <div style={{ minWidth: 0, textAlign: isRTL ? 'right' : 'left' }}>
        <p style={{ fontSize: 14, fontWeight: 700, color: '#1a1a1a', lineHeight: 1.3, margin: 0 }}>{name}</p>
        <p style={{ fontSize: 12, color: '#C4883A', fontWeight: 600, lineHeight: 1.35, margin: '3px 0 0' }}>{position}</p>
      </div>
    </div>
    <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 10, marginTop: 'auto' }}>
      <a href={`mailto:${member.email}`} style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0, fontSize: 12, color: '#666', textDecoration: 'none' }}><span style={{ color: '#1A3554' }}><MailIcon /></span><span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{member.email}</span></a>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#666' }}><span style={{ color: '#1A3554' }}><HashIcon /></span><span>{t.extLabel} {member.extension}</span></div>
      {member.phone && <a href={`tel:${member.phone.replace(/\D/g, '')}`} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#666', textDecoration: 'none' }}><span style={{ color: '#1A3554' }}><PhoneIcon /></span><span>{member.phone}</span></a>}
    </div>
    {hasBio && <button onClick={() => onViewBio(member)} style={{ padding: '8px 0', background: '#EEF3F7', color: '#1A3554', fontSize: 12, fontWeight: 600, border: 0, borderRadius: 8, cursor: 'pointer', width: '100%' }}>{isRTL ? 'צפה בביו' : 'View Bio'}</button>}
  </div>
}

function GroupSection({ title, members, t, isRTL, onViewBio }) {
  const [gridRef, revealed] = useReveal()
  return <div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}><h2 style={{ fontSize: 22, color: '#1A3554', whiteSpace: 'nowrap' }}>{title}</h2><div style={{ flex: 1, height: 1, background: '#eef1f4' }} /></div>
    <div ref={gridRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', alignItems: 'stretch', gap: 16 }}>
      {members.map(member => <div key={member.email} style={{ height: '100%', opacity: revealed ? 1 : 0, transform: revealed ? 'translateY(0)' : 'translateY(20px)', transition: 'opacity .6s ease, transform .6s ease' }}><StaffCard member={member} t={t} isRTL={isRTL} onViewBio={onViewBio} /></div>)}
    </div>
  </div>
}

export default function TeamPage() {
  const { lang } = useLang()
  const t = teamContent[lang]
  const isRTL = lang === 'he'
  const [activeBioMember, setActiveBioMember] = useState(null)
  const partnerInternational = staff.filter(s => s.group === 'Partners & CPAs' && /U\.S\.|CAN\./.test(s.position))
  const partnerIsraeli = staff.filter(s => s.group === 'Partners & CPAs' && !/U\.S\.|CAN\./.test(s.position))
  const groups = [
    { title: isRTL ? 'שותפים ורואי חשבון בינלאומיים' : 'Partners & International CPAs', members: partnerInternational },
    { title: isRTL ? 'רואי חשבון ישראליים' : 'Israeli CPAs', members: partnerIsraeli },
    { title: t.groupLabels['Tax Advisors'], members: staff.filter(s => s.group === 'Tax Advisors') },
    { title: t.groupLabels.Bookkeeping, members: staff.filter(s => s.group === 'Bookkeeping') },
    { title: t.groupLabels.Operations, members: staff.filter(s => s.group === 'Operations') },
  ]
  return <main>
    <section style={{ background: 'linear-gradient(135deg, #0D1E2F, #1A3554)', padding: '64px 24px', textAlign: 'center', color: '#fff' }}><h1 style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', margin: 0 }}>{isRTL ? 'מומחים בשירותם' : 'Experts at Your Service'}</h1><p style={{ color: '#B0C8E0', fontSize: 17 }}>{t.subheading}</p></section>
    <section style={{ background: '#1a1a1a', padding: 16 }}><div style={{ ...container, display: 'flex', justifyContent: 'center', gap: 20, color: '#ccc', fontSize: 13 }}><span>{t.officeLabel}:</span><a href={`tel:${officePhone.il}`} style={{ color: '#ccc' }}>🇮🇱 {officePhone.il}</a><a href={`tel:${officePhone.us}`} style={{ color: '#ccc' }}>🇺🇸 {officePhone.us}</a></div></section>
    <section style={{ background: '#f4f7f9', padding: '96px 0' }}><div style={{ ...container, display: 'flex', flexDirection: 'column', gap: 64 }}>{groups.filter(group => group.members.length).map(group => <GroupSection key={group.title} {...group} t={t} isRTL={isRTL} onViewBio={setActiveBioMember} />)}</div></section>
    <section style={{ background: '#e8f4f6', padding: '80px 24px', textAlign: 'center' }}><h2 style={{ color: '#1A3554' }}>{t.notSure}</h2><p>{t.notSureSub}</p><a href="/contact" style={{ display: 'inline-flex', background: '#C4883A', color: '#fff', padding: '14px 40px', borderRadius: 10, textDecoration: 'none', fontWeight: 700 }}>{t.cta}</a></section>
    {activeBioMember && <BioModal member={activeBioMember} lang={lang} isRTL={isRTL} onClose={() => setActiveBioMember(null)} />}
  </main>
}
