/**
 * PageHero — Split-screen hero for all inner pages.
 *
 * Layout (LTR):
 *   [Dark navy bg — full width]
 *   Text block (left ~50%) | Photo (right ~55%, fades into bg via gradient mask)
 *
 * Layout (RTL):
 *   Photo (left ~55%, fades right) | Text block (right ~50%)
 *
 * Props:
 *   eyebrow   — small uppercase label (string)
 *   heading   — h1 text (string)
 *   subheading — paragraph below heading (string, optional)
 *   imageSrc  — path to photo, e.g. '/hero-services.jpg'
 *   imageAlt  — alt text for the photo
 *   isRTL     — boolean, mirrors the layout for Hebrew
 */

export default function PageHero({ eyebrow, heading, subheading, imageSrc, imageAlt = '', isRTL = false }) {
  return (
    <section
      style={{
        position: 'relative',
        overflow: 'hidden',
        backgroundImage: [
          'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)',
          'linear-gradient(135deg, #0D1E2F 0%, #1A3554 100%)',
        ].join(', '),
        backgroundSize: '32px 32px, auto',
        /* Inner pages: shorter + less top-padding than homepage */
        paddingTop: 'clamp(110px, 12vw, 148px)',
        paddingBottom: 'clamp(52px, 6vw, 76px)',
        minHeight: '340px',
      }}
    >
      {/* ── Photo — narrower than homepage, sits on the far edge ── */}
      {imageSrc && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            [isRTL ? 'left' : 'right']: 0,
            /* 42% wide — intentionally narrow, feels like accent not backdrop */
            width: '42%',
            height: '100%',
            pointerEvents: 'none',
          }}
        >
          <img
            src={imageSrc}
            alt={imageAlt}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              display: 'block',
              opacity: 0.7,
            }}
          />
          {/* Left-edge fade: aggressive so text side stays pure dark navy */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: isRTL
                ? 'linear-gradient(to left,  #0D1E2F 0%, rgba(13,30,47,0.7) 22%, rgba(13,30,47,0.2) 55%, transparent 100%)'
                : 'linear-gradient(to right, #0D1E2F 0%, rgba(13,30,47,0.7) 22%, rgba(13,30,47,0.2) 55%, transparent 100%)',
            }}
          />
          {/* Top & bottom bleed */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, rgba(13,30,47,0.45) 0%, transparent 25%, transparent 75%, rgba(13,30,47,0.45) 100%)',
            }}
          />
        </div>
      )}

      {/* ── Text block ── */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          paddingLeft:  'clamp(24px, 5vw, 80px)',
          paddingRight: 'clamp(24px, 5vw, 80px)',
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          justifyContent: isRTL ? 'flex-end' : 'flex-start',
        }}
      >
        <div style={{ maxWidth: '480px', textAlign: isRTL ? 'right' : 'left' }}>

          {/* Eyebrow */}
          {eyebrow && (
            <span
              className="hero-animate hero-delay-1 inline-block"
              style={{
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#C4883A',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.18)',
                borderRadius: '100px',
                padding: '5px 14px',
                marginBottom: '20px',
                display: 'inline-block',
              }}
            >
              {eyebrow}
            </span>
          )}

          {/* H1 — slightly smaller than homepage */}
          <h1
            className="hero-animate hero-delay-2"
            style={{
              fontSize: 'clamp(28px, 3.8vw, 46px)',
              fontWeight: 800,
              color: '#ffffff',
              lineHeight: 1.15,
              letterSpacing: '-0.022em',
              margin: 0,
            }}
          >
            {heading}
          </h1>

          {/* Gold accent rule */}
          <div
            className="hero-animate hero-delay-2"
            style={{
              width: '40px',
              height: '2.5px',
              background: 'linear-gradient(90deg, #C4883A, #E4A855)',
              borderRadius: '100px',
              marginTop: '16px',
              marginBottom: subheading ? '16px' : '0',
              marginLeft: isRTL ? 'auto' : '0',
            }}
          />

          {/* Subheading */}
          {subheading && (
            <p
              className="hero-animate hero-delay-3"
              style={{
                fontSize: '16px',
                color: '#B0C8E0',
                lineHeight: 1.7,
                margin: 0,
                fontWeight: 400,
              }}
            >
              {subheading}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
