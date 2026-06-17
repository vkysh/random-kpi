import { useState, useEffect, useRef } from 'react';
import './MagicBall.scss';
import usePerformanceOptimizer from '../hooks/usePerformanceOptimizer';

const phrases = [
  "Аналізуємо твоє майбутнє...",
  "Завантажуємо випадковість…",
  "Обчислюємо квантову невизначеність…"
];

const MagicBall = ({ animState, onSpin }) => {
  const [loadingText, setLoadingText] = useState(phrases[0]);
  const ballRef = useRef(null);
  const isPaused = usePerformanceOptimizer(ballRef);

  useEffect(() => {
    let interval;
    if (animState === 'spinning') {
      let index = 0;
      interval = setInterval(() => {
        index = (index + 1) % phrases.length;
        setLoadingText(phrases[index]);
      }, 800);
    }
    return () => clearInterval(interval);
  }, [animState]);

  return (
    <div 
      ref={ballRef} 
      className={`magic-ball ${isPaused ? 'is-paused' : ''}`}
    >
      <div className={`magic-ball__digital-orb ${animState}`}>
        <div 
          className="magic-ball__orb-core"
          onClick={animState !== 'spinning' ? onSpin : undefined} 
        >
          {animState === 'spinning' ? (
            <p className="magic-ball__loading-text">{loadingText}</p>
          ) : (
            <p className="magic-ball__core-title">МАГІЯ<br/>ВИПАДКОВИХ<br/>ПРОЦЕСІВ</p>
          )}
        </div>
        <div className="magic-ball__orb-ring ring-1"></div>
        <div className="magic-ball__orb-ring ring-2"></div>
        <div className="magic-ball__orb-ring ring-3"></div>
      </div>

      <button 
        className="magic-ball__action-button" 
        onClick={onSpin} 
        disabled={animState === 'spinning'}
      >
        {animState === 'spinning' ? 'ОБЧИСЛЕННЯ...' : 'ОБРАТИ ПРОГРАМУ!'}
      </button>
    </div>
  );
};

export default MagicBall;