import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import DemographicForm from './DemographicForm';
import SurveyQuestions from './SurveyQuestions';

const SurveyFlow = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  const [step, setStep] = useState('home');
  const [formData, setFormData] = useState({
    demographic: null,
    responses: {}
  });
  const [showThankYou, setShowThankYou] = useState(false);

  const handleDemographicSubmit = (data) => {
    setFormData(prev => ({ ...prev, demographic: data }));
    setStep('survey');
  };

  const submitAllData = async (finalResponses) => {
    const dataToSend = {
      demographic: formData.demographic,
      responses: finalResponses
    };

    try {
      const res = await fetch('http://localhost:4000/api/survey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend)
      });

      const result = await res.json();
      if (res.ok) {
        setShowThankYou(true);
      } else {
        alert(result.error || t('error_message'));
      }
    } catch (error) {
      console.error(error);
      alert(t('error_message'));
    }
  };

  const handleCloseThankYou = () => {
    setShowThankYou(false);
    setStep('home');
    setFormData({ demographic: null, responses: {} });
  };

  const renderStep = () => {
    switch (step) {
      case 'demographic':
        return (
          <DemographicForm
            goBack={() => setStep('home')}
            onSubmit={handleDemographicSubmit}
          />
        );

      case 'survey':
        return (
          <SurveyQuestions
            goBack={() => setStep('demographic')}
            onSubmit={submitAllData}
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
              <h1 style={{
                fontFamily: isArabic ? 'var(--font-arabic)' : 'var(--font-latin)'
              }}>
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
              onClick={() => setStep('demographic')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                fontFamily: isArabic ? 'var(--font-arabic)' : 'var(--font-latin)'
              }}
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
        {renderStep()}
      </main>

      {showThankYou && (
        <div className="thank-you-modal">
          <div className="modal-content">
            <div className="thank-you-message">
              {t('thank_you_message')}
            </div>
            <button
              className="close-button"
              onClick={handleCloseThankYou}
            >
              {t('buttons.close')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SurveyFlow;
