import { useState } from 'react';
import { fieldsList, groupedSoftTags } from '../../data/programs';
import './Filters.scss';

const Filters = ({
  selectedFields,
  setSelectedFields,
  selectedTags,
  setSelectedTags,
  degree,
  setDegree,
  form,
  setForm,
  disabled
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleField = (id) => {
    if (selectedFields.includes(id)) {
      setSelectedFields(selectedFields.filter(f => f !== id));
    } else {
      setSelectedFields([...selectedFields, id]);
    }
  };

  const [openAccordion, setOpenAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const toggleTag = (tagId) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter(id => id !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  };

  return (
    <div className={`filters ${disabled ? 'disabled' : ''}`}>
      <h3>1. Налаштуй фільтри</h3>
      
      <div className="filters__group">
        <label>Напрями інтересів:</label>

        <div className={`filters__wrapper ${isExpanded ? 'filters__wrapper--expanded' : ''}`}>
          <div className="filters__grid">
            {fieldsList.map(field => (
              <button
                key={field.id}
                type="button"
                className={`filters__chip-button ${selectedFields.includes(field.id) ? 'filters__chip-button--active' : ''}`}
                onClick={() => toggleField(field.id)}
                disabled={disabled}
              >
                <field.icon className="filters__chip-icon" />
                {field.label}
              </button>
            ))}
          </div>
        </div>

        <div className={`filters__btn-container ${isExpanded ? 'filters__btn-container--expanded' : ''}`}>
          <button 
            type="button" 
            className="filters__expand-btn" 
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Згорнути' : 'Показати більше напрямів...'}
          </button>
        </div>
      </div>

      <div className="filters__select-group">
        <div className="filters__input-box">
          <label>Рівень:</label>
          <select 
            className="filters__select"
            value={degree} 
            onChange={(e) => setDegree(e.target.value)}
            disabled={disabled}
          >
            <option value="бакалавр">Бакалавр</option>
            <option value="магістр">Магістр</option>
          </select>
        </div>

        <div className="filters__input-box">
          <label>Форма:</label>
          <select 
            className="filters__select"
            value={form} 
            onChange={(e) => setForm(e.target.value)}
            disabled={disabled}
          >
            <option value="будь-яка">Будь-яка</option>
            <option value="очна">Очна</option>
            <option value="заочна">Заочна</option>
            <option value="дистанційна">Дистанційна</option>
            <option value="прискорена">Прискорена</option>
          </select>
        </div>
      </div>

      <div className="filters__tags-section">
        <label>Що тобі ближче? (Софт-скіли):</label>
        
        <div className="filters__accordions">
          {groupedSoftTags.map((group, index) => (
            <div 
              key={index} 
              className={`filters__accordion ${openAccordion === index ? 'filters__accordion--open' : ''}`}
            >
              <button 
                type="button" 
                className="filters__accordion-header"
                onClick={() => toggleAccordion(index)}
                disabled={disabled}
              >
                <div className="filters__accordion-title-wrapper">
                  <group.icon className="filters__accordion-icon-category" />
                  {group.title}
                </div>
                <span className="filters__accordion-icon">▼</span>
              </button>
              
              <div className="filters__accordion-body">
                <div className="filters__accordion-content">
                  {group.tags.map(tag => (
                    <button
                      key={tag.id}
                      type="button"
                      className={`filters__tag-btn ${selectedTags.includes(tag.id) ? 'filters__tag-btn--active' : ''}`}
                      onClick={() => toggleTag(tag.id)}
                      disabled={disabled}
                    >
                      {tag.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filters;