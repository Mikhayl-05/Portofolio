import { useState, useEffect, useCallback } from 'react';

export function useTheme() {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') !== 'light';
  });

  const applyTheme = useCallback((dark) => {
    setIsDark(dark);
    document.documentElement.classList.toggle('dark', dark);
    document.body.classList.toggle('light-mode', !dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, []);

  // Apply on mount
  useEffect(() => {
    applyTheme(isDark);
  }, []); // eslint-disable-line

  const toggle = useCallback(() => applyTheme(!isDark), [isDark, applyTheme]);

  return { isDark, toggle, applyTheme };
}

