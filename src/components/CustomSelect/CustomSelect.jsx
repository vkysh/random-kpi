import { useState, useRef, useEffect } from 'react';
import './CustomSelect.scss';

const CustomSelect = ({ value, options, onChange, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div 
      className={`custom-select ${disabled ? 'disabled' : ''}`} 
      ref={selectRef}
    >
      <div 
        className="custom-select__header" 
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <span>{value}</span>
        <svg 
          className={`custom-select__arrow ${isOpen ? 'open' : ''}`} 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>

      {isOpen && !disabled && (
        <ul className="custom-select__list">
          {options.map((opt) => (
            <li 
              key={opt}
              className={`custom-select__item ${opt === value ? 'active' : ''}`}
              onClick={() => handleSelect(opt)}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;