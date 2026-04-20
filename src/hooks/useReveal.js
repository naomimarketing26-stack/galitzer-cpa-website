import { useEffect, useRef, useState } from 'react'

/**
 * useReveal — IntersectionObserver-based scroll reveal hook.
 * Returns [ref, revealed] where revealed flips true once the element enters the viewport.
 * Animates once (unobserves after first trigger).
 */
export function useReveal(options = {}) {
  const ref = useRef(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true)
          io.unobserve(el)
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -50px 0px', ...options }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return [ref, revealed]
}
