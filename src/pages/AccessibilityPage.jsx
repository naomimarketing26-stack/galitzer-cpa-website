import { useLang } from '../context/LanguageContext'

const content = {
  en: {
    eyebrow: 'Accessibility',
    heading: 'Accessibility Statement',
    updated: 'Last updated: May 2026',
    intro: {
      title: 'Our Commitment',
      body: 'S. Galitzer & Associates is committed to making its website accessible to all users, including people with disabilities, in accordance with the Equal Rights for Persons with Disabilities Law (1998) and Israeli Standard IS 5568:2022 (WCAG 2.1 Level AA).',
    },
    level: {
      title: 'Accessibility Level',
      body: 'This website strives to conform to WCAG 2.1 Level AA. Parts of the site are in an active process of accessibility improvement. We are working continuously to enhance the accessibility of our digital content.',
    },
    components: {
      title: 'Accessibility Features on This Site',
      items: [
        'Keyboard-navigable interface',
        'Text alternatives for non-text content',
        'Sufficient color contrast ratios',
        'Resizable text without loss of functionality',
        'Descriptive link labels and button names',
        'Semantic HTML structure with proper heading hierarchy',
        'Support for screen readers',
        'RTL/LTR bilingual layout',
      ],
    },
    browsers: {
      title: 'Supported Browsers & Assistive Technologies',
      body: 'The site is tested on Chrome, Firefox, Edge, and Safari (latest versions) with NVDA and VoiceOver screen readers.',
    },
    contact: {
      title: 'Accessibility Requests & Feedback',
      body: 'If you encounter an accessibility barrier on this website, or require content in an alternative format, please contact our Accessibility Coordinator:',
      coordinator: 'Accessibility Coordinator',
      name: 'Naomi Heilbron',
      phone: '052-756-6559',
      email: 'naomimarketing26@gmail.com',
      response: 'We aim to respond to accessibility requests within 5 business days.',
    },
    date: {
      title: 'Statement Validity',
      body: 'This statement was prepared in May 2026 and is reviewed annually or upon significant changes to the site.',
    },
  },
  he: {
    eyebrow: 'נגישות',
    heading: 'הצהרת נגישות',
    updated: 'עודכן לאחרונה: מאי 2026',
    intro: {
      title: 'המחויבות שלנו',
      body: 'ש. גליצר ושות׳ רואי חשבון מחויבת להנגיש את האתר לכלל המשתמשים, לרבות אנשים עם מוגבלויות, בהתאם לחוק שוויון זכויות לאנשים עם מוגבלות, תשנ"ח-1998 ותקן ישראלי 5568:2022 (WCAG 2.1 רמה AA).',
    },
    level: {
      title: 'רמת הנגישות',
      body: 'אתר זה שואף לעמוד בדרישות תקן WCAG 2.1 ברמה AA. חלקים מהאתר נמצאים בתהליך הנגשה פעיל. אנו עובדים באופן מתמיד לשיפור הנגישות של התכנים הדיגיטליים שלנו.',
    },
    components: {
      title: 'אמצעי הנגישות באתר',
      items: [
        'ניווט מלא באמצעות מקלדת',
        'חלופות טקסט לתכנים שאינם טקסטואליים',
        'יחסי ניגודיות צבע מספקים',
        'שינוי גודל טקסט ללא פגיעה בפונקציונליות',
        'תיאורים ברורים לקישורים ולכפתורים',
        'מבנה HTML סמנטי עם היררכיית כותרות תקינה',
        'תמיכה בקוראי מסך',
        'פריסה דו-לשונית עברית ואנגלית',
      ],
    },
    browsers: {
      title: 'דפדפנים וטכנולוגיות עזר נתמכים',
      body: 'האתר נבדק על Chrome, Firefox, Edge ו-Safari (גרסאות עדכניות) עם קוראי המסך NVDA ו-VoiceOver.',
    },
    contact: {
      title: 'בקשות נגישות ומשוב',
      body: 'אם נתקלתם במחסום נגישות באתר, או זקוקים לתוכן בפורמט חלופי, אנא פנו לרכזת הנגישות שלנו:',
      coordinator: 'רכזת נגישות',
      name: 'נעמי היילברון',
      phone: '052-756-6559',
      email: 'naomimarketing26@gmail.com',
      response: 'אנו שואפים להשיב לפניות נגישות תוך 5 ימי עסקים.',
    },
    date: {
      title: 'תוקף ההצהרה',
      body: 'הצהרה זו הוכנה במאי 2026 ומתעדכנת מדי שנה או בעת שינויים מהותיים באתר.',
    },
  },
}

const container = {
  maxWidth: '800px',
  margin: '0 auto',
  paddingLeft: 'clamp(24px, 5vw, 80px)',
  paddingRight: 'clamp(24px, 5vw, 80px)',
}

function Section({ title, children, isRTL }) {
  return (
    <div style={{ marginBottom: '48px' }}>
      <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#1A3554', marginBottom: '12px', paddingBottom: '8px', borderBottom: '2px solid #C4883A', display: 'inline-block' }}>
        {title}
      </h2>
      <div style={{ fontSize: '15px', color: '#444444', lineHeight: 1.8 }}>
        {children}
      </div>
    </div>
  )
}

export default function AccessibilityPage() {
  const { lang } = useLang()
  const t = content[lang]
  const isRTL = lang === 'he'

  return (
    <main>
      {/* Hero */}
      <section style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(135deg, #0D1E2F 0%, #1A3554 100%)', backgroundSize: '32px 32px, cover', paddingTop: '160px', paddingBottom: '80px' }}>
        <div style={{ ...container, textAlign: 'center' }}>
          <span className="hero-animate hero-delay-1 inline-block" style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C4883A', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: '100px', padding: '6px 16px', marginBottom: '24px', display: 'inline-block' }}>
            {t.eyebrow}
          </span>
          <h1 className="hero-animate hero-delay-2" style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, color: '#ffffff', lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: '16px' }}>
            {t.heading}
          </h1>
          <p className="hero-animate hero-delay-3" style={{ fontSize: '14px', color: '#B0C8E0' }}>
            {t.updated}
          </p>
        </div>
      </section>

      {/* Content */}
      <section style={{ backgroundColor: '#ffffff', paddingTop: '80px', paddingBottom: '100px' }}>
        <div style={{ ...container, textAlign: isRTL ? 'right' : 'left' }}>

          <Section title={t.intro.title} isRTL={isRTL}>
            <p>{t.intro.body}</p>
          </Section>

          <Section title={t.level.title} isRTL={isRTL}>
            <p>{t.level.body}</p>
          </Section>

          <Section title={t.components.title} isRTL={isRTL}>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '8px' }}>
              {t.components.items.map((item, i) => (
                <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', flexDirection: 'row' }}>
                  <span style={{ color: '#C4883A', fontWeight: 700, flexShrink: 0, marginTop: '2px' }}>✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section title={t.browsers.title} isRTL={isRTL}>
            <p>{t.browsers.body}</p>
          </Section>

          <Section title={t.contact.title} isRTL={isRTL}>
            <p style={{ marginBottom: '20px' }}>{t.contact.body}</p>
            <div style={{ background: '#f4f7f9', border: '1px solid #eef1f4', borderRight: isRTL ? '4px solid #C4883A' : '1px solid #eef1f4', borderLeft: isRTL ? '1px solid #eef1f4' : '4px solid #C4883A', borderRadius: '12px', padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-start' }}>
              <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#C4883A', margin: '0' }}>{t.contact.coordinator}</p>
              <p style={{ fontSize: '17px', fontWeight: 800, color: '#1A3554', margin: '0' }}>{t.contact.name}</p>
              <a href={`tel:${t.contact.phone.replace(/-/g, '')}`} style={{ fontSize: '15px', color: '#1A3554', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', flexDirection: 'row' }}>
                <span>📞</span>
                <span style={{ direction: 'ltr' }}>{t.contact.phone}</span>
              </a>
              <a href={`mailto:${t.contact.email}`} style={{ fontSize: '15px', color: '#C4883A', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', flexDirection: 'row' }}>
                <span>✉</span>
                <span>{t.contact.email}</span>
              </a>
              <p style={{ fontSize: '13px', color: '#777777', margin: '8px 0 0' }}>{t.contact.response}</p>
            </div>
          </Section>

          <Section title={t.date.title} isRTL={isRTL}>
            <p>{t.date.body}</p>
          </Section>

        </div>
      </section>
    </main>
  )
}
