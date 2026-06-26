import { useState, useMemo, useRef, useEffect } from 'react';
import CustomSelect from '../CustomSelect/CustomSelect';
import './ResultCard.scss';

const ResultCard = ({ program }) => {
  const [scores, setScores] = useState({
    ukr: 150,
    math: 150,
    hist: 150,
    elective: 150,
    creative: 150
  });

  const [selectedElective, setSelectedElective] = useState('Англійська мова');
  const [isFirstPriority, setIsFirstPriority] = useState(true);
  const [isCalculated, setIsCalculated] = useState(false);

  const cardRef = useRef(null);
  const calcResultRef = useRef(null);

  useEffect(() => {
    if (window.innerWidth <= 1044 && cardRef.current) {
      setTimeout(() => {
        cardRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }, 300);
    }
  }, [program]);

  useEffect(() => {
    if (isCalculated && calcResultRef.current) {
      setTimeout(() => {
        calcResultRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }, 150); 
    }
  }, [isCalculated]);

  const electiveMap = {
    'Біологія': 'bio',
    'Фізика': 'phys',
    'Хімія': 'chem',
    'Українська література': 'ukrlit',
    'Географія': 'geo',
    'Англійська мова': 'language'
  };

  const itsPrograms = [
    { id: 1, title: "Інформаційно-комунікаційні технології", desc: "Архітектура мереж, хмарні рішення та ПЗ", url: "https://vstup.its.kpi.ua/" },
    { id: 2, title: "Інженерія та програмування інфокомунікацій", desc: "Програмування, кібербезпека та мережні технології", url: "https://vstup.its.kpi.ua/" },
    { id: 3, title: "Системи електронних комунікацій та IoT", desc: "Розробка інфраструктури для розумних пристроїв IoT", url: "https://vstup.its.kpi.ua/" },
    { id: 4, title: "Системи штучного інтелекту в електронних комунікаціях", desc: "Машинне навчання та аналітика Big Data", url: "https://vstup.its.kpi.ua/" },
    { id: 5, title: "Інженерія систем телекомунікацій і керування БПАК", desc: "Системи зв'язку та апаратне управління БПЛА", url: "https://vstup.its.kpi.ua/" }
  ];

  const [randomItsProgram, setRandomItsProgram] = useState(itsPrograms[0]);
  const [isItsFading, setIsItsFading] = useState(false);

  const handleRandomizeIts = () => {
    if (isItsFading) return; 

    setIsItsFading(true);

    setTimeout(() => {
      let randomIndex = Math.floor(Math.random() * itsPrograms.length);
      
      while (itsPrograms[randomIndex].id === randomItsProgram.id) {
        randomIndex = Math.floor(Math.random() * itsPrograms.length);
      }
      
      setRandomItsProgram(itsPrograms[randomIndex]);
      setIsItsFading(false);
    }, 300);
  };

  const calculateScore = () => {
    if (!program || !program.coefficients) return 0;

    const k = program.coefficients;
    const p = scores;

    const k4_current = k[electiveMap[selectedElective]] || 0;

    const k4_max = Math.max(
      k.bio || 0,
      k.phys || 0,
      k.chem || 0,
      k.ukrlit || 0,
      k.geo || 0,
      k.language || 0
    );

    const k1 = k.ukr || 0;
    const k2 = k.math || 0;
    const k3 = k.hist || 0;
    const kt = k.creative || 0;

    const numerator = (p.ukr * k1) + (p.math * k2) + (p.hist * k3) + (p.elective * k4_current) + (p.creative * kt);
    const denominator = k1 + k2 + k3 + ((k4_current + k4_max) / 2) + kt;

    const gk = isFirstPriority ? 1.02 : 1.0;
    const oy = 0; 

    let result = (numerator / denominator + oy) * gk;
    
    if (result > 200) result = 200;
    return Number(result.toFixed(2));
  };

  const finalScore = useMemo(() => calculateScore(), [isCalculated, scores, isFirstPriority, selectedElective]);

  const getChanceIndicator = () => {
    const passScore = program.passScore || 0;
    if (finalScore < 130) return { text: "Лише контракт", color: "#ff4d4d" };
    if (passScore > 0 && finalScore >= passScore) return { text: "Високі шанси на бюджет 🔥", color: "#00ffcc" };
    return { text: "Середні шанси, варто спробувати!", color: "#ffcc00" };
  };

  const chance = getChanceIndicator();

  if (program.error) {
    return <div className="result-card error">{program.message}</div>;
  }

  const handleShare = async () => {
    // Спокійний, природний текст
    const shareText = `Довірив свою долю рандомайзеру КПІ і тепер я йду на "${program.speciality}" 💻. Калькулятор каже, що ${chance.text.toLowerCase()}. А куди закине тебе?`;
    const shareUrl = window.location.origin;

    if (navigator.share) {
      try {
        await navigator.share({
          text: shareText,
          url: shareUrl,
        });
      } catch (error) {
        console.log('Шеринг скасовано', error);
      }
    } else {
      navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      alert('✅ Текст скопійовано! Можеш відправляти друзям.');
    }
  };

  return (
    <div className="result-card-wrapper" ref={cardRef}>
      <div className="result animate-fade-in">
        <span className="result__badge">{(program.code_n.length > 5 ? ` ${program.code_n}` : program.code + program.code_n)} {program.speciality}</span>
        <div className="result__meta-info">
          <span><strong>Інститут:</strong> {program.institute}</span><br />
          <span><strong>Форма:</strong> {program.forms.join(', ')}</span>
        </div>
        <p className="result__description">{program.description}</p>

        <a href={program.url} target="_blank" rel="noreferrer" className="result__details-link">
          Детальніше про ОП
        </a>
      </div>

      {/* Блок Калькулятора НМТ */}
      <div className="nmt-calculator">
        <h3 className="nmt-calculator__title">
          <i className="fas fa-calculator"></i> Калькулятор шансів вступити
        </h3>
        
        <div className="nmt-calculator__grid">
          <div className="nmt-calculator__field">
            <label className="nmt-calculator__label">Українська мова</label>
            <input 
              className="nmt-calculator__input"
              type="number" min="100" max="200" 
              value={scores.ukr} 
              onChange={(e) => {
                setScores({...scores, ukr: e.target.value === '' ? '' : Number(e.target.value)}); 
                setIsCalculated(false);
              }} 
            />
          </div>
          
          <div className="nmt-calculator__field">
            <label className="nmt-calculator__label">Математика</label>
            <input 
              className="nmt-calculator__input"
              type="number" min="100" max="200" 
              value={scores.math} 
              onChange={(e) => {
                setScores({...scores, math: e.target.value === '' ? '' : Number(e.target.value)}); 
                setIsCalculated(false);
              }} 
            />
          </div>
          
          <div className="nmt-calculator__field">
            <label className="nmt-calculator__label">Історія України</label>
            <input 
              className="nmt-calculator__input"
              type="number" min="100" max="200" 
              value={scores.hist} 
              onChange={(e) => {
                setScores({...scores, hist: e.target.value === '' ? '' : Number(e.target.value)}); 
                setIsCalculated(false);
              }} 
            />
          </div>

          <div className="nmt-calculator__field">
            <div className="nmt-calculator__select-wrapper">
              <CustomSelect 
                value={selectedElective}
                options={Object.keys(electiveMap)}
                onChange={(val) => {setSelectedElective(val); setIsCalculated(false)}}
              />
            </div>
            <input 
              className="nmt-calculator__input nmt-calculator__input--mt"
              type="number" min="100" max="200" 
              value={scores.elective} 
              onChange={(e) => {
                setScores({...scores, elective: e.target.value === '' ? '' : Number(e.target.value)}); 
                setIsCalculated(false);
              }} 
            />
          </div>

          {program.coefficients.creative > 0 && (
            <div className="nmt-calculator__field nmt-calculator__field--creative">
              <label className="nmt-calculator__label">Творчий конкурс / Співбесіда</label>
              <input 
                className="nmt-calculator__input"
                type="number" min="100" max="200" 
                value={scores.creative} 
                onChange={(e) => {
                  setScores({...scores, creative: e.target.value === '' ? '' : Number(e.target.value)}); 
                  setIsCalculated(false);
                }} 
              />
            </div>
          )}
        </div>
        
        {program.coefficients.industry > 1 && (
          <div className="nmt-calculator__options">
            <label className="nmt-calculator__checkbox-label">
              <input 
                className="nmt-calculator__checkbox"
                type="checkbox" 
                checked={isFirstPriority} 
                onChange={(e) => {setIsFirstPriority(e.target.checked); setIsCalculated(false)}} 
              />
              <span className="nmt-calculator__checkmark"></span>
              Подаю заяву з 1 або 2 пріоритетом (ГК = 1.02)
            </label>
          </div>
        )}

        <button 
          className="nmt-calculator__btn" 
          onClick={() => setIsCalculated(true)}
        >
          {isCalculated ? 'ПЕРЕРАХУВАТИ' : 'РОЗРАХУВАТИ ШАНСИ'}
        </button>

        {isCalculated && (
          <div className="nmt-calculator__result animate-slide-up" ref={calcResultRef}>
            <div className="nmt-calculator__score-main">
              <span className="nmt-calculator__score-label">Твій конкурсний бал:</span>
              <div className="nmt-calculator__score-value">{finalScore}</div>
            </div>
            
            {program.passScore > 0 && (
              <p className="nmt-calculator__last-year">
                Минулорічний прохідний на бюджет: <strong>{program.passScore}</strong>
              </p>
            )}

            <div className="nmt-calculator__chance" style={{ borderLeft: `5px solid ${chance.color}` }}>
              {chance.text}
            </div>

            <button className="nmt-calculator__share-btn" onClick={handleShare}>
              Поділитися результатом
            </button>
          </div>
        )}
      </div>

      {/* М'яка воронка рекрутингу для НН ІТС */}
      {program.institute !== "НН ІТС" && (
        <div className="its-promo">
          <h4 className="its-promo__title">Також тобі можуть сподобатися програми НН ІТС 👇</h4>
          <p className="its-promo__slogan">"НН ІТС — коли хочеш не просто користуватися технологіями, а створювати зв’язок майбутнього."</p>
          
          <div className={`its-promo__card ${isItsFading ? 'its-promo__card--fading' : ''}`}>
            <h5 className="its-promo__program-title">{randomItsProgram.title}</h5>
            <p className="its-promo__program-desc">{randomItsProgram.desc}</p>
            <a href={randomItsProgram.url} target="_blank" rel="noreferrer" className="its-promo__link">
              Дізнатися більше на сайті
            </a>
          </div>

          <button className="its-promo__btn" onClick={handleRandomizeIts}>
            Показати іншу спеціальність ІТС
          </button>
        </div>
      )}
    </div>
  );
};

export default ResultCard;