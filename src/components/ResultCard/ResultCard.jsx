import React, { useState, useEffect } from 'react';
import './ResultCard.scss';

const ResultCard = ({ program, onReset }) => {
  const [scores, setScores] = useState({ p1: 150, p2: 150, p3: 150, p4: 150 });
  const [isFirstPriority, setIsFirstPriority] = useState(true);
  // finalScore is derived from props/state — compute synchronously without setState to avoid cascading renders
  const finalScore = React.useMemo(() => {
    if (!program || !program.coefficients || program.error) return 0;

    const { p1, p2, p3, p4 } = scores;
    const { k1, k2, k3, k4 } = program.coefficients;

    const gk = isFirstPriority ? 1.02 : 1.0; // Галузевий коефіцієнт [cite: 234]

    const weightedSum = (p1 * k1) + (p2 * k2) + (p3 * k3) + (p4 * k4);
    const coeffSum = k1 + k2 + k3 + k4;

    let score = (weightedSum / coeffSum) * gk;
    if (score > 200) score = 200;

    return Number(score.toFixed(2));
  }, [scores, isFirstPriority, program]);

  const getChanceIndicator = () => {
    if (finalScore < 130) return { text: "Лише контракт", color: "#ff4d4d" };
    if (finalScore >= program.minScoreLastYear) return { text: "Високі шанси на бюджет 🔥", color: "#00ffcc" };
    return { text: "Середні шанси, варто спробувати!", color: "#ffcc005d" };
  };

  const chance = getChanceIndicator();

  return (
    <div className="">
      <div className="result animate-fade-in">
        <span className="result__badge">{program.code} {program.speciality}</span>
        <p className="result__description">{program.description}</p>

        <div className="result__meta-info">
          <span><strong>Інститут:</strong> {program.institute}</span><br />
          <span><strong>Форма:</strong> {program.forms.join(', ')}</span>
        </div>

        <a href={program.url} target="_blank" rel="noreferrer" className="result__details-link">
          Детальніше про ОП
        </a>
      </div>

      {/* Блок Калькулятора НМТ */}
      <div className="nmt-calculator-card">
        <h3>3. Калькулятор НМТ та Шанси</h3>
        <div className="inputs-grid">
          {['p1', 'p2', 'p3', 'p4'].map((pKey, i) => {
            const labels = ["Укр. мова", "Математика", "Історія", "Вибірковий"];
            return (
              <div key={pKey} className="input-box">
                <label>{labels[i]}</label>
                <input 
                  type="number" 
                  min="100" 
                  max="200" 
                  value={scores[pKey]} 
                  onChange={(e) => setScores({ ...scores, [pKey]: Number(e.target.value) })}
                />
              </div>
            );
          })}
        </div>

        <div className="checkbox-row">
          <label>
            <input 
              type="checkbox" 
              checked={isFirstPriority} 
              onChange={(e) => setIsFirstPriority(e.target.checked)} 
            />
            Подаю заяву з 1 або 2 пріоритетом (ГК = 1.02)
          </label> [cite: 234]
        </div>

        <div className="score-results">
          <p>Твій конкурсний бал: <strong>{finalScore}</strong></p>
          <p>Минулорічний прохідний: {program.minScoreLastYear}</p>
          <div className="chance-badge" style={{ backgroundColor: chance.color }}>
            {chance.text}
          </div>
        </div>
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