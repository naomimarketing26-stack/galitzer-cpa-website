import { useLang } from '../context/LanguageContext'

const content = {
  en: {
    eyebrow: 'Legal',
    heading: 'Privacy Policy',
    updated: 'Last updated: May 2026',
    sections: [
      {
        title: '1. General',
        body: 'S. Galitzer & Associates CPA ("the Firm", "we", "us") respects the privacy of its website visitors and is committed to protecting personal information in accordance with the Protection of Privacy Law, 5741-1981, and its regulations.',
      },
      {
        title: '2. Data Controller',
        body: 'The entity responsible for the personal data collected through this website is:\n\nS. Galitzer & Associates CPA\n28 Ben Zion Street, Givat Shaul, Jerusalem, Israel\nEmail: info@galitzercpa.com\nPhone: 972-2-652-5060',
      },
      {
        title: '3. What Information We Collect',
        body: 'When you submit a contact form on this website, we collect the following personal information you voluntarily provide:\n• Full name\n• Email address\n• Phone number (optional)\n• Topic of inquiry\n• Message content\n\nWe do not collect sensitive personal data, payment information, or any information beyond what you choose to provide.',
      },
      {
        title: '4. Purpose of Collection',
        body: 'The information you provide is used solely for the purpose of:\n• Responding to your inquiry or request\n• Providing the professional services you requested\n• Communicating with you regarding your matter\n\nWe do not use your information for marketing, advertising, or any purpose other than responding to your specific request.',
      },
      {
        title: '5. Data Retention',
        body: 'We retain personal information for as long as required to provide the requested service or fulfill legal and professional obligations. When the information is no longer needed, it is securely deleted.',
      },
      {
        title: '6. Third-Party Sharing',
        body: 'We do not sell, rent, or share your personal information with third parties, except where required by law or with your explicit consent. The website currently does not use external analytics or advertising tools.',
      },
      {
        title: '7. Cookies',
        body: 'This website uses only essential technical cookies required for basic website operation. We do not use tracking, analytics, or advertising cookies.',
      },
      {
        title: '8. Your Rights',
        body: 'Under the Protection of Privacy Law, you have the right to:\n• Request access to personal information we hold about you\n• Request correction of inaccurate information\n• Request deletion of your information, subject to legal limitations\n\nTo exercise these rights, please contact us at: info@galitzercpa.com',
      },
      {
        title: '9. Information Security',
        body: 'We implement reasonable technical and organizational measures to protect personal information against unauthorized access, loss, or disclosure, in accordance with the Privacy Protection Regulations (Information Security), 5777-2017.',
      },
      {
        title: '10. Changes to This Policy',
        body: 'We may update this Privacy Policy from time to time. The date of the last update appears at the top of this page. Continued use of the website after changes are published constitutes acceptance of the updated policy.',
      },
      {
        title: '11. Contact',
        body: 'For any questions or requests regarding this Privacy Policy:\n\nEmail: info@galitzercpa.com\nPhone: 972-2-652-5060\nAddress: 28 Ben Zion Street, Givat Shaul, Jerusalem, Israel',
      },
    ],
  },
  he: {
    eyebrow: 'משפטי',
    heading: 'מדיניות פרטיות',
    updated: 'עודכן לאחרונה: מאי 2026',
    sections: [
      {
        title: '1. כללי',
        body: 'ש. גליצר ושות׳ רואי חשבון ("המשרד", "אנחנו") מכבדת את פרטיות המבקרים באתר ומחויבת להגנה על מידע אישי בהתאם לחוק הגנת הפרטיות, תשמ"א-1981, ותקנותיו.',
      },
      {
        title: '2. אחראי על המידע',
        body: 'הגורם האחראי על המידע האישי הנאסף באמצעות אתר זה הוא:\n\nש. גליצר ושות׳ רואי חשבון\nרחוב בן ציון 28, גבעת שאול, ירושלים\nדוא״ל: info@galitzercpa.com\nטלפון: 02-652-5060',
      },
      {
        title: '3. איזה מידע נאסף',
        body: 'כאשר אתם ממלאים את טופס יצירת הקשר באתר, אנו אוספים את הפרטים הבאים שאתם מוסרים מרצונכם:\n• שם מלא\n• כתובת דוא״ל\n• מספר טלפון (אופציונלי)\n• נושא הפנייה\n• תוכן ההודעה\n\nאיננו אוספים מידע רגיש, מידע על אמצעי תשלום, או כל מידע שלא סיפקתם ביוזמתכם.',
      },
      {
        title: '4. מטרת האיסוף',
        body: 'המידע שתמסרו משמש אך ורק לצורך:\n• מתן מענה לפנייתכם\n• מתן השירותים המקצועיים שביקשתם\n• תקשורת עמכם בעניין הטיפול בפנייתכם\n\nאיננו משתמשים במידע לצרכי שיווק, פרסום, או כל מטרה אחרת מלבד מתן מענה לבקשתכם.',
      },
      {
        title: '5. שמירת המידע',
        body: 'המידע האישי יישמר כל עוד נדרש לצורך מתן השירות המבוקש או לשם עמידה בחובות משפטיות ומקצועיות. עם סיום הצורך, המידע יימחק בצורה מאובטחת.',
      },
      {
        title: '6. שיתוף עם צדדים שלישיים',
        body: 'אנו לא מוכרים, משכירים, או מעבירים את המידע האישי שלכם לצדדים שלישיים, אלא אם נדרש על פי חוק או בהסכמתכם המפורשת. האתר אינו עושה כרגע שימוש בכלי ניתוח או פרסום חיצוניים.',
      },
      {
        title: '7. עוגיות (Cookies)',
        body: 'אתר זה משתמש רק בעוגיות טכניות חיוניות הנדרשות לתפעול בסיסי של האתר. איננו משתמשים בעוגיות מעקב, ניתוח נתונים, או פרסום.',
      },
      {
        title: '8. זכויותיכם',
        body: 'לפי חוק הגנת הפרטיות, עומדות לכם הזכויות הבאות:\n• לעיין במידע האישי שאנו מחזיקים עליכם\n• לבקש תיקון מידע שגוי\n• לבקש מחיקת המידע, בכפוף למגבלות החוק\n\nלמימוש זכויות אלה, פנו אלינו בכתובת: info@galitzercpa.com',
      },
      {
        title: '9. אבטחת מידע',
        body: 'אנו נוקטים אמצעי אבטחה טכניים וארגוניים סבירים להגנה על מידע אישי מפני גישה בלתי מורשית, אובדן, או חשיפה, בהתאם לתקנות הגנת הפרטיות (אבטחת מידע), תשע"ז-2017.',
      },
      {
        title: '10. שינויים במדיניות',
        body: 'אנו עשויים לעדכן מדיניות פרטיות זו מעת לעת. תאריך העדכון האחרון מופיע בראש עמוד זה. המשך השימוש באתר לאחר פרסום שינויים מהווה הסכמה למדיניות המעודכנת.',
      },
      {
        title: '11. יצירת קשר',
        body: 'לכל שאלה או בקשה הנוגעת למדיניות פרטיות זו:\n\nדוא״ל: info@galitzercpa.com\nטלפון: 02-652-5060\nכתובת: רחוב בן ציון 28, גבעת שאול, ירושלים',
      },
    ],
  },
}

const container = {
  maxWidth: '800px',
  margin: '0 auto',
  paddingLeft: 'clamp(24px, 5vw, 80px)',
  paddingRight: 'clamp(24px, 5vw, 80px)',
}

export default function PrivacyPage() {
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
          {t.sections.map((sec, i) => (
            <div key={i} style={{ marginBottom: '44px' }}>
              <h2 style={{ fontSize: '17px', fontWeight: 800, color: '#1A3554', marginBottom: '12px', paddingBottom: '8px', borderBottom: '1px solid #eef1f4' }}>
                {sec.title}
              </h2>
              <p style={{ fontSize: '15px', color: '#444444', lineHeight: 1.9, whiteSpace: 'pre-line' }}>
                {sec.body}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
