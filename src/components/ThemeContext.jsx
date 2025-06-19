import { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? JSON.parse(saved) : {
      backgroundColor: '#ffffff',
      textColor: '#000000'
    };
  });

  const updateTheme = (newTheme) => {
    const updated = { ...theme, ...newTheme };
    setTheme(updated);
    localStorage.setItem('theme', JSON.stringify(updated));
  };

  // Update CSS variables on the root element
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--bg-color', theme.backgroundColor);
    root.style.setProperty('--text-color', theme.textColor);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
