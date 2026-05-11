import { useLang } from '../context/LanguageContext'

const sections = {
  he: {
    title: 'הצהרת נגישות',
    updated: 'עודכן לאחרונה: מאי 2026',
    intro: 'S. Galitzer & Associates – רואי חשבון מאמינים בשוויון הזדמנויות ומחויבים להנגיש את שירותיה הדיגיטליים לכלל הציבור, לרבות אנשים עם מוגבלות, בהתאם לתקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע"ג-2013, ולתקן הישראלי IS 5568 הנסמך על WCAG 2.1 ברמת AA.',
    sections: [
      {
        heading: 'רמת הנגישות',
        body: 'אתר זה עומד ברמת נגישות AA לפי תקן WCAG 2.1 ותקן ישראלי IS 5568. בוצעו התאמות נגישות מקיפות הכוללות תמיכה בקוראי מסך, ניווט מלא במקלדת, ניגודיות צבעים תקנית, תמיכה בהגדלת טקסט, ותיאורי תמונה חלופיים.',
      },
      {
        heading: 'רכזת הנגישות',
        body: 'לבקשות, הערות ותלונות בנושא נגישות ניתן לפנות אל רכזת הנגישות של המשרד:',
        contact: {
          name: 'נעמי היילברון',
          phone: '052-756-6559',
          email: 'naomimarketing26@gmail.com',
          address: 'רחוב בן ציון 28, גבעת שאול, ירושלים',
        },
      },
      {
        heading: 'מה בוצע בנושא נגישות',
        items: [
          'הגדרת שפה ברמת הדף (lang attribute) בהתאם לשפה הנבחרת',
          'מבנה כותרות היררכי ועקבי (H1–H3)',
          'ניווט מלא באמצעות מקלדת בכל דפי האתר',
          'ניגודיות צבעים העומדת בדרישות AA',
          'תגיות ARIA לרכיבים אינטראקטיביים',
          'טפסים עם תיוג נכון של שדות קלט',
          'טקסטים חלופיים לתמונות ואייקונים',
          'קישורי דילוג לתוכן הראשי',
          'תמיכה בהגדלת טקסט עד 200% ללא פגיעה בפונקציונליות',
          'האתר תומך בקוראי מסך מובילים: NVDA, JAWS, VoiceOver',
        ],
      },
      {
        heading: 'מגבלות ידועות',
        body: 'ייתכן כי חלק מהתכנים המוטמעים מצדדים שלישיים (כגון מפות Google) אינם עומדים במלוא דרישות הנגישות. אנו פועלים לצמצם מגבלות אלו.',
      },
      {
        heading: 'פנייה בנושא נגישות',
        body: 'נתקלתם בבעיית נגישות? נשמח לשמוע. ניתן לפנות אלינו בטלפון, בדואר אלקטרוני או בדואר רשום לכתובת המשרד. אנו מתחייבים לטפל בכל פנייה תוך 5 ימי עסקים.',
      },
      {
        heading: 'תאריך הצהרה ועדכון',
        body: 'הצהרת נגישות זו נכתבה בהתאם להמלצות הנציבות לשוויון זכויות לאנשים עם מוגבלות ועודכנה לאחרונה במאי 2026.',
      },
    ],
  },
  en: {
    title: 'Accessibility Statement',
    updated: 'Last updated: May 2026',
    intro: 'S. Galitzer & Associates – CPAs is committed to ensuring digital accessibility for people with disabilities. We continually improve the user experience for everyone and apply the relevant accessibility standards in accordance with Israeli Standard IS 5568 based on WCAG 2.1 Level AA.',
    sections: [
      {
        heading: 'Accessibility Level',
        body: 'This website conforms to WCAG 2.1 Level AA and Israeli Standard IS 5568. Accessibility enhancements include full keyboard navigation, screen reader support, sufficient color contrast, text resizing support, and alternative text for images.',
      },
      {
        heading: 'Accessibility Coordinator',
        body: 'For accessibility requests, feedback, or complaints, please contact our accessibility coordinator:',
        contact: {
          name: 'Naomi Heilbron',
          phone: '052-756-6559',
          email: 'naomimarketing26@gmail.com',
          address: '28 Ben Zion Street, Givat Shaul, Jerusalem, Israel',
        },
      },
      {
        heading: 'Accessibility Features Implemented',
        items: [
          'Language attribute set at page level matching the active language',
          'Consistent and hierarchical heading structure (H1–H3)',
          'Full keyboard navigation across all pages',
          'Color contrast meeting AA requirements throughout',
          'ARIA labels on all interactive components',
          'Properly labeled form fields and inputs',
          'Alternative text for images and icons',
          'Skip-to-main-content links',
          'Text resizing up to 200% without loss of functionality',
          'Compatibility with leading screen readers: NVDA, JAWS, VoiceOver',
        ],
      },
      {
        heading: 'Known Limitations',
        body: 'Some third-party embedded content (such as Google Maps) may not fully meet accessibility requirements. We are working to minimize these limitations.',
      },
      {
        heading: 'Feedback & Contact',
        body: 'Did you encounter an accessibility barrier? We would love to hear from you. Please contact us by phone, email, or postal mail. We are committed to responding to all accessibility inquiries within 5 business days.',
      },
      {
        heading: 'Statement Date',
        body: 'This accessibility statement was prepared in accordance with the guidelines of the Israeli Equal Rights Commission for Persons with Disabilities and was last updated in May 2026.',
      },
    ],
  },
}

export default function AccessibilityPage() {
  const { lang } = useLang()
  const t = sections[lang]
  const isRTL = lang === 'he'

  return (
    <main style={{ background: '#f4f7f9', minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px', direction: isRTL ? 'rtl' : 'ltr' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', paddingLeft: 'clamp(24px, 5vw, 48px)', paddingRight: 'clamp(24px, 5vw, 48px)' }}>

        {/* Header */}
        <div style={{ marginBottom: '48px', textAlign: isRTL ? 'right' : 'left' }}>
          <div style={{ display: 'inline-block', background: '#1A3554', color: '#C4883A', fontSize: '12px', fontWeight: 700, letterSpacing: '0.05em', padding: '6px 14px', borderRadius: '100px', marginBottom: '20px', direction: 'ltr' }}>
            IS 5568 / WCAG 2.1 AA
          </div>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, color: '#1A3554', lineHeight: 1.2, marginBottom: '12px' }}>
            {t.title}
          </h1>
          <p style={{ fontSize: '14px', color: '#8AA8C5' }}>{t.updated}</p>
        </div>

        {/* Intro */}
        <div style={{ background: '#ffffff', borderRadius: '16px', padding: '28px 32px', marginBottom: '24px', [isRTL ? 'borderRight' : 'borderLeft']: '4px solid #C4883A' }}>
          <p style={{ fontSize: '15px', color: '#444', lineHeight: 1.8, textAlign: isRTL ? 'right' : 'left' }}>{t.intro}</p>
        </div>

        {/* Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {t.sections.map((sec, i) => (
            <div key={i} style={{ background: '#ffffff', borderRadius: '16px', padding: '28px 32px', textAlign: isRTL ? 'right' : 'left' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#1A3554', marginBottom: '16px' }}>
                {sec.heading}
              </h2>

              {sec.body && (
                <p style={{ fontSize: '15px', color: '#555', lineHeight: 1.8, marginBottom: sec.contact ? '20px' : 0 }}>
                  {sec.body}
                </p>
              )}

              {sec.contact && (
                <div style={{ background: '#f4f7f9', borderRadius: '10px', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <p style={{ fontSize: '15px', color: '#1A3554', fontWeight: 700 }}>{sec.contact.name}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'flex-start' }}>
                    <span style={{ fontSize: '16px' }}>📞</span>
                    <span style={{ fontSize: '14px', color: '#555' }}>{sec.contact.phone}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'flex-start' }}>
                    <span style={{ fontSize: '16px' }}>✉️</span>
                    <a href={`mailto:${sec.contact.email}`} style={{ fontSize: '14px', color: '#C4883A', textDecoration: 'none', direction: 'ltr' }}>{sec.contact.email}</a>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'flex-start' }}>
                    <span style={{ fontSize: '16px' }}>📍</span>
                    <span style={{ fontSize: '14px', color: '#555' }}>{sec.contact.address}</span>
                  </div>
                </div>
              )}

              {sec.items && (
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', listStyle: 'none', padding: 0, margin: 0 }}>
                  {sec.items.map((item, j) => (
                    <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', justifyContent: 'flex-start' }}>
                      <span style={{ color: '#C4883A', fontWeight: 700, flexShrink: 0, marginTop: '2px' }}>✓</span>
                      <span style={{ fontSize: '14px', color: '#555', lineHeight: 1.7 }}>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
