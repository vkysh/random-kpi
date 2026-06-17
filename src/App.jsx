import { useState } from 'react';
import Papa from 'papaparse';
import Filters from './components/Filters/Filters.jsx';
import MagicBall from './components/MagicBall/MagicBall.jsx';
import ResultCard from './components/ResultCard/ResultCard.jsx';
import './styles/Main.scss';

const GOOGLE_SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRX8L7lErG70WU5sHv8efGWXVth7AjXLB44SUV0nJZ6KqQBN_O9hxtWm7ydwFaSlb0uEi_abnJ0t_y9/pub?gid=0&single=true&output=csv";

function App() {
  const [programs, setPrograms] = useState([]);

  const [selectedFields, setSelectedFields] = useState([]);
  const [degree, setDegree] = useState('бакалавр');
  const [form, setForm] = useState('будь-яка');
  const [selectedTags, setSelectedTags] = useState([]); 

  const [currentProgram, setCurrentProgram] = useState(null);
  const [animState, setAnimState] = useState('idle');

  const getFilteredPrograms = (data) => {
    const strictFiltered = data.filter(prog => {
      const matchDegree = prog.degree.includes(degree.toLowerCase());
      const matchForm = form === 'будь-яка' || prog.forms.includes(form.toLowerCase());
      return matchDegree && matchForm;
    });

    const scoredPrograms = strictFiltered.map(prog => {
      const matchCount = selectedTags.reduce((count, tag) => {
        return count + (prog.tags.includes(tag) ? 1 : 0);
      }, 0);
      return { ...prog, matchCount };
    });

    let finalPrograms = scoredPrograms.filter(prog => {
      return selectedFields.length === 0 || selectedFields.includes(prog.code);
    });

    finalPrograms.sort((a, b) => b.matchCount - a.matchCount);

    if (finalPrograms.length < 5 && selectedFields.length > 0) {
      const leftovers = scoredPrograms
        .filter(prog => !finalPrograms.includes(prog)) 
        .sort((a, b) => b.matchCount - a.matchCount);

      const needed = 5 - finalPrograms.length;
      finalPrograms = [...finalPrograms, ...leftovers.slice(0, needed)];
    }

    return finalPrograms;
  };

  const handleRandomize = async () => {
    setAnimState('spinning');
    setCurrentProgram(null);

    try {
      const animationPromise = new Promise(resolve => setTimeout(resolve, 2000));

      let currentData = programs;

      if (currentData.length === 0) {
        const response = await fetch(GOOGLE_SHEET_URL);
        const csvText = await response.text();

        const results = Papa.parse(csvText, { header: true, skipEmptyLines: true });

        currentData = results.data.map(prog => ({
          ...prog,
          id: Number(prog.id),
          passScore: Number(prog.pass_score || 0),
          forms: prog.forms ? prog.forms.split(',').map(s => s.trim().toLowerCase()) : [],
          degree: prog.degree ? prog.degree.split(',').map(s => s.trim().toLowerCase()) : [],
          code: prog.code ? prog.code.trim().toUpperCase() : '',
          tags: prog.tags ? prog.tags.split(',').map(s => s.trim()) : [],
          coefficients: {
            ukr: Number(prog.k_ukr || 0),
            math: Number(prog.k_math || 0),
            hist: Number(prog.k_hist || 0),
            bio: Number(prog.k_bio || 0),
            phys: Number(prog.k_phys || 0),
            chem: Number(prog.k_chem || 0),
            ukrlit: Number(prog.k_ukrlit || 0),
            geo: Number(prog.k_geo || 0),
            language: Number(prog.k_language || 0),
            creative: Number(prog.k_creative || 0),
            industry: Number(prog.k_industry || 0),
          }
        }));

        setPrograms(currentData);
      }

      const filtered = getFilteredPrograms(currentData);

      await animationPromise;

      if (filtered.length > 0) {
        const randomIndex = Math.floor(Math.random() * filtered.length);
        setCurrentProgram(filtered[randomIndex]);
      } else {
        setCurrentProgram({ error: true, message: "Програм за такими фільтрами не знайдено. Спробуй розширити пошук!" });
      }

    } catch (err) {
      console.error("Помилка завантаження даних:", err);
      setCurrentProgram({ error: true, message: "Не вдалося з'єднатися з квантовою базою КПІ. Перевір інтернет." });
    } finally {
      setAnimState('finished');
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Рандомайзер освітніх програм КПІ</h1>
        <p>Не знаєш, яку освітню програму обрати? Покладися на теорію випадкових процесів!</p>
      </header>

      <main className="app-content">
        <section className="column-left">
          <Filters 
            selectedFields={selectedFields} 
            setSelectedFields={setSelectedFields}
            degree={degree}
            setDegree={setDegree}
            form={form}
            setForm={setForm}
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
            disabled={animState === 'spinning'}
          />
        </section>

        <section className="column-center">
          <MagicBall animState={animState} onSpin={handleRandomize} />
        </section>

        <section className="column-right">
          {animState === 'finished' && currentProgram && (
            <ResultCard program={currentProgram} onReset={handleRandomize} />
          )}
        </section>
      </main>
    </div>
  );
}

export default App;