import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return savedTheme || (systemPrefersDark ? 'dark' : 'light');
    }
    return 'light';
  });

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Variants for animation
  const iconVariants = {
    light: { opacity: 1, y: 0 },
    dark: { opacity: 0, y: 20 }
  };

  return (
    <motion.button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      whileTap={{ scale: 0.9 }}
    >
      <div className="toggle-track">
        <motion.div
          className="toggle-thumb"
          animate={theme === 'dark' ? { x: '100%' } : { x: 0 }}
          transition={{ type: 'spring', stiffness: 700, damping: 30 }}
        />
        
        <div className="icons-container">
          <motion.div
            className="icon-wrapper"
            animate={theme === 'light' ? iconVariants.light : iconVariants.dark}
            transition={{ duration: 0.2 }}
          >
            <FontAwesomeIcon icon={faSun} className="sun-icon" />
          </motion.div>
          
          <motion.div
            className="icon-wrapper"
            animate={theme === 'dark' ? iconVariants.light : iconVariants.dark}
            transition={{ duration: 0.2 }}
          >
            <FontAwesomeIcon icon={faMoon} className="moon-icon" />
          </motion.div>
        </div>
      </div>
    </motion.button>
  );
};

export default ThemeToggle;