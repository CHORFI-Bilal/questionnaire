import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import DemographicForm from './components/DemographicForm';
import SurveyQuestions from './components/SurveyQuestions';

function App() {
  const { t, i18n } = useTranslation();
  const [currentPage, setCurrentPage] = useState('home');
  const [surveyData, setSurveyData] = useState({
    demographic: null,
    responses: {}
  });
  const isArabic = i18n.language === 'ar';

  // Navigation handlers
  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  const handleDemographicSubmit = (data) => {
    setSurveyData(prev => ({ ...prev, demographic: data }));
    navigateTo('survey');
  };

  const handleSurveySubmit = (responses) => {
    setSurveyData(prev => ({ ...prev, responses }));
    console.log('Survey completed:', { ...surveyData, responses });
    navigateTo('home');
  };

  // Render current page
  const renderPage = () => {
    switch (currentPage) {
      case 'demographic':
        return (
          <DemographicForm 
            goBack={() => navigateTo('home')}
            onSubmit={handleDemographicSubmit}
          />
        );
      
      case 'survey':
        return (
          <SurveyQuestions
            goBack={() => navigateTo('demographic')}
            onSubmit={handleSurveySubmit}
          />
        );
      
      default:
        return (
          <>
            <motion.section
              className="survey-header"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 style={{ fontFamily: isArabic ? 'var(--font-arabic)' : 'var(--font-latin)' }}>
                {t('home.title')}
              </h1>
            </motion.section>
            
            <motion.article
              className="survey-card"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div style={{ 
                  fontFamily: isArabic ? 'var(--font-arabic)' : 'var(--font-latin)',
                  textAlign: isArabic ? 'var(--align-arabic)' : 'var(--align-latin)' 
              }}>
                {t('home.message').split('\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </motion.article>
            
            <motion.button
              className="btn btn--primary"
              onClick={() => navigateTo('demographic')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ fontFamily: isArabic ? 'var(--font-arabic)' : 'var(--font-latin)' }}
            >
              {t('home.button')}
            </motion.button>
          </>
        );
    }
  };

  return (
    <div className="app">
      <Navbar />
      <main className="main container">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;