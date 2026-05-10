import { Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'

const notFoundContent = {
  en: {
    code: '404',
    heading: 'Page Not Found',
    subheading: "The page you're looking for doesn't exist or has been moved.",
    cta: '← Return Home',
  },
  he: {
    code: '404',
    heading: 'הדף לא נמצא',
    subheading: 'הדף שחיפשת אינו קיים או הועבר.',
    cta: 'חזרה לדף הבית →',
  },
}

export default function NotFoundPage() {
  const { lang } = useLang()
  const t = notFoundContent[lang]
  const isRTL = lang === 'he'

  return (
    <main
      style={{
        minHeight: 'calc(100vh - 140px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#fafafa',
        padding: '80px 24px',
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: '480px' }}>
        <p
          style={{
            fontSize: '96px',
            fontWeight: 800,
            color: '#EAF0F8',
            lineHeight: 1,
            marginBottom: '16px',
            letterSpacing: '-0.04em',
          }}
        >
          {t.code}
        </p>
        <h1
          style={{
            fontSize: '28px',
            fontWeight: 800,
            color: '#1A3554',
            marginBottom: '12px',
          }}
        >
          {t.heading}
        </h1>
        <p
          style={{
            fontSize: '16px',
            color: '#777777',
            lineHeight: 1.6,
            marginBottom: '32px',
          }}
        >
          {t.subheading}
        </p>
        <Link
          to="/"
          style={{
            display: 'inline-block',
            background: '#C4883A',
            color: '#ffffff',
            fontWeight: 700,
            fontSize: '15px',
            padding: '12px 28px',
            borderRadius: '8px',
            textDecoration: 'none',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = '#A96F25')}
          onMouseLeave={e => (e.currentTarget.style.background = '#C4883A')}
        >
          {t.cta}
        </Link>
      </div>
    </main>
  )
}
