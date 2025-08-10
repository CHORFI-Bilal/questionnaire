import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../assets/styles/SurveyQuestions.css';

const SurveyQuestions = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showThankYou, setShowThankYou] = useState(false);

  const sections = [
    {
      id: 'control_environment',
      questions: [
        { id: 'q1', key: 'control_environment.q1' },
        { id: 'q2', key: 'control_environment.q2' },
        { id: 'q3', key: 'control_environment.q3' },
        { id: 'q4', key: 'control_environment.q4' },
        { id: 'q5', key: 'control_environment.q5' }
      ]
    },
    {
      id: 'risk_assessment',
      questions: [
        { id: 'q6', key: 'risk_assessment.q6' },
        { id: 'q7', key: 'risk_assessment.q7' },
        { id: 'q8', key: 'risk_assessment.q8' },
        { id: 'q9', key: 'risk_assessment.q9' }
      ]
    },
    {
      id: 'control_activities',
      questions: [
        { id: 'q10', key: 'control_activities.q10' },
        { id: 'q11', key: 'control_activities.q11' },
        { id: 'q12', key: 'control_activities.q12' }
      ]
    },
    {
      id: 'information_communication',
      questions: [
        { id: 'q13', key: 'information_communication.q13' },
        { id: 'q14', key: 'information_communication.q14' },
        { id: 'q15', key: 'information_communication.q15' }
      ]
    },
    {
      id: 'monitoring_activities',
      questions: [
        { id: 'q16', key: 'monitoring_activities.q16' },
        { id: 'q17', key: 'monitoring_activities.q17' }
      ]
    }
  ];

  const answerOptions = [
    { id: 5, key: 'answers.strongly_agree' },
    { id: 4, key: 'answers.agree' },
    { id: 3, key: 'answers.neutral' },
    { id: 2, key: 'answers.disagree' },
    { id: 1, key: 'answers.strongly_disagree' }
  ];

  const handleAnswerSelect = (questionId, answerId) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerId
    }));
  };

  const handleNextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
      window.scrollTo(0, 0);
    } else {
      setShowThankYou(true);
    }
  };

  const handlePrevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleCloseThankYou = () => {
    setShowThankYou(false);
    navigate('/page1');
  };

  const currentSectionData = sections[currentSection];
  const progress = ((currentSection + 1) / sections.length) * 100;
  const isRTL = i18n.language === 'ar';

  return (
    <div className={`survey-container ${isRTL ? 'rtl' : ''}`}>
      <div className="survey-header">
        <h1 className="survey-title">{t('survey_title')}</h1>
      </div>

      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        <div className="progress-text">
          {t('section_progress', {
            current: currentSection + 1,
            total: sections.length
          })}
        </div>
      </div>

      <div className="section-container">
        <h2 className="section-title">{t(`sections.${currentSectionData.id}.title`)}</h2>
        
        <div className="questions-list">
          {currentSectionData.questions.map((question, index) => (
            <div key={question.id} className="question-item">
              <p className="question-text">
                {index + 1}. {t(`sections.${currentSectionData.id}.questions.${question.id}`)}
              </p>
              
              <div className="answer-options">
                {answerOptions.map(option => (
                  <button
                    key={option.id}
                    className={`answer-option ${answers[question.id] === option.id ? 'selected' : ''}`}
                    onClick={() => handleAnswerSelect(question.id, option.id)}
                  >
                    {t(option.key)}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="navigation-buttons">
        <button
          className="nav-button prev-button"
          onClick={handlePrevSection}
          disabled={currentSection === 0}
        >
          {t('buttons.previous')}
        </button>
        
        <button
          className="nav-button next-button"
          onClick={handleNextSection}
        >
          {currentSection < sections.length - 1 ? 
            t('buttons.next') : 
            t('buttons.submit')}
        </button>
      </div>

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

export default SurveyQuestions;