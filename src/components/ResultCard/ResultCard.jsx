import { useState, useMemo, useRef, useEffect } from 'react';
import CustomSelect from '../CustomSelect/CustomSelect';
import './ResultCard.scss';

const ResultCard = ({ program }) => {
  console.log("Перевірка URL:", program.url);

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

  const electiveMap = {
    'Біологія': 'bio',
    'Фізика': 'phys',
    'Хімія': 'chem',
    'Українська література': 'ukrlit',
    'Географія': 'geo',
    'Англійська мова': 'language'
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
              onChange={(e) => {setScores({...scores, ukr: Number(e.target.value)}); setIsCalculated(false)}} 
            />
          </div>
          
          <div className="nmt-calculator__field">
            <label className="nmt-calculator__label">Математика</label>
            <input 
              className="nmt-calculator__input"
              type="number" min="100" max="200" 
              value={scores.math} 
              onChange={(e) => {setScores({...scores, math: Number(e.target.value)}); setIsCalculated(false)}} 
            />
          </div>
          
          <div className="nmt-calculator__field">
            <label className="nmt-calculator__label">Історія України</label>
            <input 
              className="nmt-calculator__input"
              type="number" min="100" max="200" 
              value={scores.hist} 
              onChange={(e) => {setScores({...scores, hist: Number(e.target.value)}); setIsCalculated(false)}} 
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
              onChange={(e) => {setScores({...scores, elective: Number(e.target.value)}); setIsCalculated(false)}} 
            />
          </div>

          {program.coefficients.creative > 0 && (
            <div className="nmt-calculator__field nmt-calculator__field--creative">
              <label className="nmt-calculator__label">Творчий конкурс / Співбесіда</label>
              <input 
                className="nmt-calculator__input"
                type="number" min="100" max="200" 
                value={scores.creative} 
                onChange={(e) => {setScores({...scores, creative: Number(e.target.value)}); setIsCalculated(false)}} 
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
          <div className="nmt-calculator__result animate-slide-up">
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
          </div>
        )}
      </div>

      {/* М'яка воронка рекрутингу для НН ІТС */}
      {program.institute !== "НН ІТС" && (
        <div className="its-recruitment-banner">
          <h4>Також тобі можуть сподобатися програми НН ІТС 👇</h4> [cite: 207]
          <p className="slogan">"НН ІТС — коли хочеш не просто користуватися технологіями, а створювати зв’язок майбутнього."</p> [cite: 212]
          <ul>
            <li>🌐 Інформаційно-комунікаційні системи</li> [cite: 214]
            <li>📡 Технології електронних комунікацій</li> [cite: 214]
          </ul>
        </div>
      )}
    </div>
  );
};

export default ResultCard;