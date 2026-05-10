import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CircleFlag } from 'react-circle-flags'
import { useLang } from '../context/LanguageContext'
import { content } from '../data/content'

const navContainer = {
  maxWidth: '1200px',
  margin: '0 auto',
  paddingLeft: 'clamp(24px, 5vw, 80px)',
  paddingRight: 'clamp(24px, 5vw, 80px)',
  height: '64px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}

export default function Navbar() {
  const { lang, toggle } = useLang()
  const t = content[lang].nav
  const isRTL = lang === 'he'
  const [scrolled, setScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const isInnerPage = location.pathname !== '/'

  useEffect(() => {
    const onScroll = () => {
      const sy = window.scrollY
      setScrolled(sy > 20)
      const docH = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(docH > 0 ? Math.min((sy / docH) * 100, 100) : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    window.scrollTo(0, 0)
  }, [location.pathname])

  const links = [
    { label: t.services, href: '/services' },
    { label: t.team, href: '/team' },
    { label: t.about, href: '/about' },
    { label: t.blog, href: '/blog' },
    { label: t.contact, href: '/contact' },
  ]

  const isActive = (href) => location.pathname === href

  const FlagToggle = () => (
    <button
      onClick={toggle}
      title={lang === 'en' ? 'עברית' : 'English'}
      className="hidden sm:flex items-center gap-2 rounded-full pl-1 pr-3 py-1 transition-all duration-200 bg-white border border-[#e2e2e2] hover:border-[#1A3554]"
    >
      <CircleFlag countryCode={lang === 'en' ? 'il' : 'us'} height={30} width={30} />
      <span className="text-sm font-semibold text-[#1A3554]">
        {lang === 'en' ? 'עב' : 'EN'}
      </span>
    </button>
  )

  const MobileFlagToggle = () => (
    <button
      onClick={toggle}
      className="flex items-center gap-2 rounded-full pl-1 pr-3 py-1 bg-white border border-[#e2e2e2]"
    >
      <CircleFlag countryCode={lang === 'en' ? 'il' : 'us'} height={26} width={26} />
      <span className="text-sm font-semibold text-[#1A3554]">
        {lang === 'en' ? 'עב' : 'EN'}
      </span>
    </button>
  )

  return (
    <header
      style={{ position: 'relative' }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white shadow-sm border-b border-[#eef1f4]'
          : 'bg-white/96 backdrop-blur-sm'
      }`}
    >
      {/* Scroll progress bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: '2px',
          width: `${scrollProgress}%`,
          background: 'linear-gradient(90deg, #C4883A, #E4A855)',
          transition: 'width 0.1s ease',
          borderRadius: '0 2px 2px 0',
        }}
      />

      <div style={navContainer}>
        {/* Logo */}
        <Link to="/" className={`flex items-center gap-1 shrink-0 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div style={{ direction: 'ltr', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <span className="text-xl font-extrabold tracking-tight leading-none text-[#1A3554]">S.GALITZER</span>
            <span className="text-xl font-extrabold text-[#C4883A] leading-none mx-0.5">&</span>
            <span className="text-xl font-extrabold tracking-tight leading-none text-[#1A3554]">ASSOCIATES</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {links.map(link => (
            <Link
              key={link.label}
              to={link.href}
              className={`text-sm font-medium transition-colors relative pb-0.5 ${
                isActive(link.href)
                  ? 'text-[#1A3554] font-semibold after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-0.5 after:bg-[#C4883A] after:rounded-full'
                  : 'text-[#555555] hover:text-[#1A3554]'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <FlagToggle />
          <Link
            to="/contact"
            className="hidden sm:inline-flex items-center bg-[#C4883A] hover:bg-[#A96F25] text-white text-sm font-semibold px-6 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-px"
          >
            {t.cta}
          </Link>
          <button
            className="lg:hidden p-2 text-[#1A3554]"
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div
          className="flex flex-col gap-4 py-4 bg-white border-t border-[#eef1f4]"
          style={{ paddingLeft: 'clamp(24px, 5vw, 80px)', paddingRight: 'clamp(24px, 5vw, 80px)' }}
        >
          {links.map(link => (
            <Link
              key={link.label}
              to={link.href}
              className={`text-sm font-medium transition-colors ${
                isActive(link.href) ? 'text-[#1A3554] font-semibold' : 'text-[#555555]'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center gap-3 pt-2 border-t border-[#eef1f4]">
            <MobileFlagToggle />
            <Link
              to="/contact"
              className="flex-1 text-center bg-[#C4883A] text-white text-sm font-semibold px-6 py-3 rounded-full"
            >
              {t.cta}
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
