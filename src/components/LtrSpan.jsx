import { useLang } from '../context/LanguageContext'

/**
 * Renders its children left-to-right even when embedded inside RTL (Hebrew) text.
 * Wraps content in <span dir="ltr" display="inline-block"> so the Unicode
 * Bidirectional Algorithm treats the fragment as its own LTR paragraph,
 * preventing Latin fragments (phone numbers, emails, acronyms) from being
 * reordered when surrounded by Hebrew.
 */
export default function LtrSpan({ children, className }) {
  const { lang } = useLang()
  const isRTL = lang === 'he'

  if (!isRTL) {
    // In LTR (English) context no isolation is needed; render children as-is.
    return <span className={className}>{children}</span>
  }

  return (
    <span
      dir="ltr"
      style={{ display: 'inline-block' }}
      className={className}
    >
      {children}
    </span>
  )
}