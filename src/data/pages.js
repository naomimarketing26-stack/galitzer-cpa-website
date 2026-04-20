export const pages = {
  en: {
    about: {
      hero: {
        eyebrow: 'About Us',
        heading: 'Trusted Cross-Border Accounting Expertise',
      },
      intro:
        'At S. Galitzer and Associates, we provide comprehensive accounting, tax, and advisory services for individuals and businesses, with specialized expertise in both Israeli and U.S. taxation.',
      body: [
        'With decades of experience, our firm assists clients with accounting, reporting, strategic tax planning, compliance, and cross-border financial matters. We work with individuals, business owners, retirees, companies, and non-profit organizations requiring cross-border financial guidance.',
        'Our strength lies in combining comprehensive professional knowledge with a personalized approach—helping clients stay compliant, make informed decisions, and optimize their financial positions both locally and internationally.',
        'Our services include tax return preparation, bookkeeping, payroll calculation and planning, corporate reporting, retirement tax planning assistance and optimization, estate planning, and ongoing advisory services regarding Israeli and U.S. related matters.',
        'We look forward to the opportunity to provide you with our expert services and hearing from you soon.',
      ],
      values: [
        { icon: '🎓', title: 'Deep Expertise', desc: 'Decades of combined experience in U.S. and Israeli tax law.' },
        { icon: '🤝', title: 'Personalized Approach', desc: 'Every client receives dedicated, senior-level attention.' },
        { icon: '🌐', title: 'Cross-Border Focus', desc: 'Specialists at the intersection of two financial systems.' },
        { icon: '✅', title: 'Full Compliance', desc: 'We keep you compliant, informed, and always prepared.' },
      ],
      cta: 'Book a Free Consultation',
    },

    services: {
      hero: {
        eyebrow: 'Our Services',
        heading: 'Comprehensive Israeli & U.S. Tax and Accounting Services',
        subheading:
          'At Galitzer Associates CPA, we provide comprehensive Israeli and U.S. tax and accounting services, with a strong focus on cross-border matters. We work with individuals, business owners, retirees, and companies who require precise compliance, strategic planning, and clear, reliable professional guidance.',
      },
      cta: 'Book a Consultation',
      categories: [
        {
          id: 'us-tax',
          icon: '🇺🇸',
          title: 'U.S. Tax Services',
          color: 'bg-blue-50',
          accentColor: 'border-blue-400',
          items: [
            'U.S. Individual Income Tax Returns (Federal & State)',
            'U.S. Corporate Tax Returns (C-Corporations & S-Corporations)',
            'Partnership & LLC Tax Returns',
            'Trust Tax Returns',
            'FBAR & International Information Reporting',
            'Ongoing Tax Advisory & Compliance Support',
          ],
        },
        {
          id: 'israeli-tax',
          icon: '🇮🇱',
          title: 'Israeli Tax Services',
          color: 'bg-[#e8f4f6]',
          accentColor: 'border-[#276e7d]',
          subGroups: [
            {
              label: 'Individuals',
              items: [
                'Israeli Individual Income Tax Returns',
                'Annual Rental Income Reporting',
                'Tax Assessments & Representation',
              ],
            },
            {
              label: 'Businesses & Corporations',
              items: [
                'Israeli Corporate Tax Returns',
                'Financial Statement Preparation',
                'Business Registration (Osek Patur / Osek Murshe / Companies)',
                'VAT Registration & Ongoing VAT Filings',
                'Ongoing Tax Advisory & Compliance',
              ],
            },
          ],
        },
        {
          id: 'accounting',
          icon: '📊',
          title: 'Accounting & Payroll Services',
          color: 'bg-green-50',
          accentColor: 'border-[#7ed957]',
          items: [
            'Bookkeeping for Companies & Self-Employed Individuals',
            'Payroll Processing & Salary Calculations',
            'Monthly & Annual Payroll Tax Filings',
            'Ongoing Accounting & Financial Reporting',
          ],
        },
        {
          id: 'retirement',
          icon: '🏦',
          title: 'Retirement Planning & Tax Advisory',
          color: 'bg-amber-50',
          accentColor: 'border-amber-400',
          items: [
            'Retirement Tax Planning',
            'Kibua Zchuyot (קיבוע זכויות) Assistance',
            'Pension & Lump-Sum Withdrawal Tax Optimization',
            'Coordination of Israeli & U.S. Retirement Income Taxation',
          ],
        },
      ],
    },
  },

  he: {
    about: {
      hero: {
        eyebrow: 'אודות המשרד',
        heading: 'התמחות במיסוי ישראלי ואמריקאי',
      },
      intro:
        'משרד ש. גליצר ושות' מעניק מעטפת מקצועית רחבה בתחומי חשבונאות, מיסוי וייעוץ עסקי ליחידים ולתאגידים, עם התמחות ייחודית בדיני המס של ישראל וארצות הברית.',
      body: [
        'עם ניסיון של עשרות שנים, אנו מלווים את לקוחותינו בתהליכי ביקורת, דיווח כספי, תכנון מס אסטרטגי וטיפול בסוגיות פיננסיות מורכבות, לרבות פעילות חוצת גבולות. בין לקוחותינו נמנים בעלי עסקים, בעלי מקצוע רפואי, חברות ושותפויות, מלכ"רים, יחידים וגמלאים הזקוקים לליווי מקצועי בסביבה פיננסית ומיסוי בינלאומית.',
        'הערך המוסף שלנו טמון בשילוב בין ידע מקצועי מעמיק לבין גישה אישית וקשובה. אנו מקפידים על עמידה מלאה בדרישות הרגולציה, תוך מתן כלים לקבלת החלטות מושכלות ושיפור התכנון והניהול של הנכסים הפיננסיים – בישראל ומחוצה לה.',
        'שירותי המשרד כוללים הכנת דוחות מס בישראל ובארה"ב, עריכת ביקורת ודוחות כספיים, הנהלת חשבונות וחשבות שכר, וכן דיווחים שוטפים לחברות. בנוסף, אנו גם מתמחים בתכנון מס לפרישה, טיפול בעיזבונות וליווי שוטף בסוגיות מס בינלאומיות.',
        'נשמח לעמוד לרשותכם ולבחון יחד כיצד נוכל לסייע לכם.',
      ],
      values: [
        { icon: '🎓', title: 'מומחיות עמוקה', desc: 'עשרות שנות ניסיון משולב בדיני מס ישראלי ואמריקאי.' },
        { icon: '🤝', title: 'גישה אישית', desc: 'כל לקוח מקבל תשומת לב אישית מרואי חשבון בכירים.' },
        { icon: '🌐', title: 'מיקוד חוצה גבולות', desc: 'מומחים בצומת בין שתי מערכות פיננסיות.' },
        { icon: '✅', title: 'ציות מלא', desc: 'אנחנו שומרים על תקינות, מעדכנים ומכינים אתכם תמיד.' },
      ],
      cta: 'לקביעת ייעוץ ראשוני',
    },

    services: {
      hero: {
        eyebrow: 'השירותים שלנו',
        heading: 'שירותי מיסוי וחשבונאות מקיפים בישראל ובארה"ב',
        subheading:
          'במשרד ש. גליצר ושות׳, אנו מספקים שירותי מיסוי וחשבונאות מקיפים, עם דגש חזק על סוגיות חוצות גבולות. אנו עובדים עם אנשים פרטיים, בעלי עסקים, גמלאים וחברות הזקוקים לציות מדויק, תכנון אסטרטגי והכוונה מקצועית אמינה.',
      },
      cta: 'לקביעת פגישת ייעוץ',
      categories: [
        {
          id: 'us-tax',
          icon: '🇺🇸',
          title: 'שירותי מס אמריקאי',
          color: 'bg-blue-50',
          accentColor: 'border-blue-400',
          items: [
            'דוחות מס הכנסה אמריקאיים לאנשים פרטיים (פדרלי ומדינתי)',
            'דוחות מס לתאגידים אמריקאיים (C-Corp ו-S-Corp)',
            'דוחות מס לשותפויות ו-LLC',
            'דוחות מס לנאמנויות (Trust)',
            'FBAR ודיווחי מידע בינלאומיים',
            'ייעוץ מס שוטף ותמיכת ציות',
          ],
        },
        {
          id: 'israeli-tax',
          icon: '🇮🇱',
          title: 'שירותי מס ישראלי',
          color: 'bg-[#e8f4f6]',
          accentColor: 'border-[#276e7d]',
          subGroups: [
            {
              label: 'לקוח פרטי',
              items: [
                'דוחות מס הכנסה ישראליים ליחידים',
                'דיווח שנתי על הכנסות שכירות',
                'שומות מס וייצוג מול רשות המסים',
              ],
            },
            {
              label: 'לקוח עסקי',
              items: [
                'דוחות מס חברות ישראליים',
                'הכנת דוחות כספיים',
                'רישום עסק (עוסק פטור / עוסק מורשה / חברות)',
                'רישום מע"מ והגשות מע"מ שוטפות',
                'ייעוץ מס שוטף וציות',
              ],
            },
          ],
        },
        {
          id: 'accounting',
          icon: '📊',
          title: 'שירותי הנהלת חשבונות ושכר',
          color: 'bg-green-50',
          accentColor: 'border-[#7ed957]',
          items: [
            'הנהלת חשבונות לחברות ולעצמאים',
            'עיבוד שכר וחישובי משכורות',
            'הגשות מס שכר חודשיות ושנתיות',
            'הנהלת חשבונות שוטפת ודיווח פיננסי',
          ],
        },
        {
          id: 'retirement',
          icon: '🏦',
          title: 'תכנון פרישה וייעוץ מס',
          color: 'bg-amber-50',
          accentColor: 'border-amber-400',
          items: [
            'תכנון מס לפרישה',
            'סיוע בקיבוע זכויות',
            'אופטימיזציה מס למשיכת פנסיה וסכום חד-פעמי',
            'תיאום מיסוי הכנסת פרישה ישראלית ואמריקאית',
          ],
        },
      ],
    },
  },
}
