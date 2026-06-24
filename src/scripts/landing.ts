/**
 * Landing interactions — one orchestrated idea (TZ §6):
 *  - sections reveal as the next "output" of the session on scroll
 *  - copy buttons on every command block
 * Both respect prefers-reduced-motion and degrade gracefully without JS.
 */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* ── reveal on scroll ── */
function setupReveal(): void {
  const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
  if (sections.length === 0) return

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    // show everything immediately
    sections.forEach((s) => {
      s.style.opacity = '1'
      s.style.transform = 'none'
    })
    return
  }

  for (const s of sections) {
    s.style.opacity = '0'
    s.style.transform = 'translateY(16px)'
    s.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
  }

  const reveal = (el: HTMLElement): void => {
    el.style.opacity = '1'
    el.style.transform = 'none'
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          reveal(entry.target as HTMLElement)
          io.unobserve(entry.target)
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  )
  sections.forEach((s) => io.observe(s))

  // safety net: never leave content stranded invisible
  window.setTimeout(() => sections.forEach(reveal), 2600)
}

/* ── copy buttons ── */
function setupCopy(): void {
  document.addEventListener('click', (ev) => {
    const target = ev.target as HTMLElement | null
    const btn = target?.closest<HTMLButtonElement>('[data-copy]')
    if (!btn) return

    const block = btn.closest('[data-codeblock]')
    const code = block?.querySelector<HTMLElement>('[data-code]')
    if (!code) return

    const text = (code.innerText || '').replace(/ /g, ' ')
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).catch(() => {})
    }

    btn.textContent = 'copied ✓'
    btn.dataset.copied = 'true'
    window.clearTimeout(Number(btn.dataset.timer))
    btn.dataset.timer = String(
      window.setTimeout(() => {
        btn.textContent = 'copy'
        delete btn.dataset.copied
      }, 1500),
    )
  })
}

setupReveal()
setupCopy()
