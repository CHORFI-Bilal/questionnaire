// src/components/SurveyQuestions.jsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../assets/styles/SurveyQuestions.css';

const SurveyQuestions = ({ onSubmit, onPrevious }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const sections = [
    {
      id: 'control_environment',
      questions: [
        { id: 'q1' }, { id: 'q2' }, { id: 'q3' }, { id: 'q4' }, { id: 'q5' }
      ]
    },
    {
      id: 'risk_assessment',
      questions: [
        { id: 'q6' }, { id: 'q7' }, { id: 'q8' }, { id: 'q9' }
      ]
    },
    {
      id: 'control_activities',
      questions: [
        { id: 'q10' }, { id: 'q11' }, { id: 'q12' }
      ]
    },
    {
      id: 'information_communication',
      questions: [
        { id: 'q13' }, { id: 'q14' }, { id: 'q15' }
      ]
    },
    {
      id: 'monitoring_activities',
      questions: [
        { id: 'q16' }, { id: 'q17' }
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

  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleAnswerSelect = (questionId, answerId) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerId }));
  };

  const handleNextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(s => s + 1);
      window.scrollTo(0, 0);
      return;
    }
    // dernière section => soumission globale
    const totalQuestions = sections.reduce((acc, s) => acc + s.questions.length, 0);
    if (Object.keys(answers).length < totalQuestions) {
      alert(t('please_answer_all'));
      return;
    }
    onSubmit && onSubmit(answers);
  };

  const handlePrevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(s => s - 1);
      window.scrollTo(0, 0);
    } else if (onPrevious) {
      onPrevious();
    }
  };

  const currentSectionData = sections[currentSection];
  const totalSections = sections.length;
  const progress = ((currentSection + 1) / totalSections) * 100;

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
            total: totalSections
          })}
        </div>
      </div>

      <div className="section-container">
        <h2 className="section-title">
          {t(`sections.${currentSectionData.id}.title`)}
        </h2>

        <div className="questions-list">
          {currentSectionData.questions.map((q, index) => (
            <div key={q.id} className="question-item">
              <p className="question-text">
                {index + 1}. {t(`sections.${currentSectionData.id}.questions.${q.id}`)}
              </p>
              <div className="answer-options">
                {answerOptions.map(option => (
                  <button
                    key={option.id}
                    className={`answer-option ${answers[q.id] === option.id ? 'selected' : ''}`}
                    onClick={() => handleAnswerSelect(q.id, option.id)}
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
        >
          {t('buttons.previous')}
        </button>

        <button
          className="nav-button next-button"
          onClick={handleNextSection}
        >
          {currentSection < totalSections - 1 ? t('buttons.next') : t('buttons.submit')}
        </button>
      </div>
    </div>
  );
};

export default SurveyQuestions;
