import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import ThemeToggle from './ThemeToggle';
import logo from '../assets/logo.jpg';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const languages = [
    { code: 'ar', name: 'العربية', dir: 'rtl' },
    { code: 'en', name: 'English', dir: 'ltr' },
    { code: 'fr', name: 'Français', dir: 'ltr' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const changeLanguage = (lng, dir) => {
    i18n.changeLanguage(lng);
    document.documentElement.lang = lng;
    document.documentElement.dir = dir;
    setIsLanguageOpen(false);
  };

  const currentLanguage = languages.find(lang => lang.code === i18n.language);

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="navbar-container">
        <div className="navbar-brand">
          <img src={logo} alt="University Logo" className="navbar-logo" />
          <div className="institution-info">
            <p>{t('navbar.ministry')}</p>
            <p>{t('navbar.university')}</p>
            
          </div>
        </div>

        <div className="navbar-controls">
          <div className="language-selector-container">
            <button
              className="language-selector"
              onClick={() => setIsLanguageOpen(!isLanguageOpen)}
              aria-expanded={isLanguageOpen}
              aria-haspopup="true"
            >
              <FontAwesomeIcon icon={faGlobe} className="language-icon" />
              <span>{currentLanguage?.name}</span>
              <FontAwesomeIcon 
                icon={faChevronDown} 
                className={`dropdown-chevron ${isLanguageOpen ? 'open' : ''}`} 
              />
            </button>

            <AnimatePresence>
              {isLanguageOpen && (
                <motion.div
                  className="language-dropdown"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      className={`language-option ${i18n.language === language.code ? 'active' : ''}`}
                      onClick={() => changeLanguage(language.code, language.dir)}
                    >
                      {language.name}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <ThemeToggle />
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;