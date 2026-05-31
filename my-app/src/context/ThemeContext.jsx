import { createContext, useContext, useState } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(false)

  const toggle = () => {
    setDark(d => {
      const next = !d
      document.documentElement.setAttribute(
        'data-theme',
        next ? 'voquota-dark' : 'voquota-light'
      )
      return next
    })
  }

  return (
    <ThemeContext.Provider value={{ dark, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
