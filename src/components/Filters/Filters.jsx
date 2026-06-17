import { useState } from 'react';
import { fieldsList, groupedSoftTags } from '../../data/programs';
import CustomSelect from '../CustomSelect/CustomSelect';
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
  const [openAccordion, setOpenAccordion] = useState(null);

  const toggleField = (code) => {
    if (selectedFields.includes(code)) {
      setSelectedFields(selectedFields.filter(c => c !== code));
    } else {
      setSelectedFields([...selectedFields, code]);
    }
  };

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
      <div className="filters__select-group">
        <div className="filters__input-box">
          <label>Рівень:</label>
          <CustomSelect 
            value={degree}
            options={['Бакалавр', 'Магістр']}
            onChange={(val) => setDegree(val)}
            disabled={disabled}
          />
        </div>

        <div className="filters__input-box">
          <label>Форма:</label>
          <CustomSelect 
            value={form}
            options={['Будь-яка', 'Очна', 'Заочна', 'Дистанційна', 'Прискорена']}
            onChange={(val) => setForm(val)}
            disabled={disabled}
          />
        </div>
      </div>

      <div className="filters__group">
        <label>Галузь знань:</label>
        <div className="filters__fields-list">
          {fieldsList.map(field => (
            <button
              key={field.code}
              type="button"
              className={`filters__field-btn ${selectedFields.includes(field.code) ? 'filters__field-btn--active' : ''}`}
              onClick={() => toggleField(field.code)}
              disabled={disabled}
            >
              <field.icon className="filters__field-icon" />
              <span className="filters__field-text">
                <strong>{field.code}</strong> - {field.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="filters__tags-section">
        <label>Що тобі ближче? (Софт-скіли):</label>
        
        <div className="filters__accordions">
          {groupedSoftTags.map((group, index) => {
            const isOpen = openAccordion === index;
            return (
              <div 
                key={index} 
                className={`filters__accordion ${isOpen ? 'filters__accordion--open' : ''}`}
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
                  <span className="filters__accordion-arrow">▼</span>
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
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Filters;