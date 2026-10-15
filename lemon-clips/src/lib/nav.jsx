import { createContext, useContext } from 'react'
export const NavContext = createContext(null)
export const useNav = () => useContext(NavContext)

export function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return false
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  return true
}

export function setHash(token) {
  try { history.replaceState(null, '', token ? '#' + token : location.pathname + location.search) } catch { /* sandboxed */ }
}
