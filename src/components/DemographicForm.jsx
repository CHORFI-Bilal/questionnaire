import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faVenusMars, 
  faUser, 
  faGraduationCap, 
  faBriefcase, 
  faIdCard 
} from '@fortawesome/free-solid-svg-icons';

const DemographicForm = ({ goBack, onSubmit }) => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  const [formData, setFormData] = useState({
    gender: '',
    age: '',
    education: '',
    experience: '',
    position: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const validateForm = () => {
    return (
      formData.gender && 
      formData.age && 
      formData.education && 
      formData.experience && 
      formData.position
    );
  };

  return (
    <motion.main
      className="main container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 style={{ fontFamily: isArabic ? 'var(--font-arabic)' : 'var(--font-latin)' }}>
        {t('demographic.title')}
      </h1>

      <form onSubmit={handleSubmit} className="demographic-form">
        {/* Gender Field */}
        <div className="form-group">
          <label className="form-label">
            <FontAwesomeIcon icon={faVenusMars} />
            {t('demographic.gender')}
          </label>
          <div className="radio-group">
            {['male', 'female'].map(gender => (
              <label key={gender} className="radio-label">
                <input
                  type="radio"
                  name="gender"
                  value={gender}
                  checked={formData.gender === gender}
                  onChange={handleChange}
                  required
                />
                <span className="radio-custom"></span>
                {t(`demographic.genderOptions.${gender}`)}
              </label>
            ))}
          </div>
        </div>

        {/* Age Field */}
        <div className="form-group">
          <label className="form-label">
            <FontAwesomeIcon icon={faUser} />
            {t('demographic.age')}
          </label>
          <select
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="">{t('demographic.selectOption')}</option>
            {['under30', '30to40', '40to50', '50to60', 'over60'].map(age => (
              <option key={age} value={age}>
                {t(`demographic.ageOptions.${age}`)}
              </option>
            ))}
          </select>
        </div>

        {/* Education Field */}
        <div className="form-group">
          <label className="form-label">
            <FontAwesomeIcon icon={faGraduationCap} />
            {t('demographic.education')}
          </label>
          <select
            name="education"
            value={formData.education}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="">{t('demographic.selectOption')}</option>
            {['technical', 'bachelor', 'master', 'phd'].map(edu => (
              <option key={edu} value={edu}>
                {t(`demographic.educationOptions.${edu}`)}
              </option>
            ))}
          </select>
        </div>

        {/* Experience Field */}
        <div className="form-group">
          <label className="form-label">
            <FontAwesomeIcon icon={faBriefcase} />
            {t('demographic.experience')}
          </label>
          <select
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="">{t('demographic.selectOption')}</option>
            {['under5', '5to10', '10to15', 'over15'].map(exp => (
              <option key={exp} value={exp}>
                {t(`demographic.experienceOptions.${exp}`)}
              </option>
            ))}
          </select>
        </div>

        {/* Position Field */}
        <div className="form-group">
          <label className="form-label">
            <FontAwesomeIcon icon={faIdCard} />
            {t('demographic.position')}
          </label>
          <select
            name="position"
            value={formData.position}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="">{t('demographic.selectOption')}</option>
            {['chairman', 'board_member', 'director', 'manager', 'department_head', 'accountant', 'legal', 'auditor'].map(pos => (
              <option key={pos} value={pos}>
                {t(`demographic.positionOptions.${pos}`)}
              </option>
            ))}
          </select>
        </div>

        <div className="form-actions">
          <motion.button
            type="button"
            className="btn btn--secondary"
            onClick={goBack}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('demographic.previous')}
          </motion.button>
          
          <motion.button
            type="submit"
            className="btn btn--primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('demographic.next')}
          </motion.button>
        </div>
      </form>
    </motion.main>
  );
};

export default DemographicForm;