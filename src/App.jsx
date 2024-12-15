import './styles/App.css'
import { fetchImage } from './api';

import Scoreboard from './Scoreboard'
import { useEffect, useState } from 'react';

function App() {
  const NUM_IMAGES = 12;

  // initialize empty urls and indices
  const [imgUrls, setUrls] = useState([]);
  const [indices, setIndices] = useState([]);
  const [clickedIndices, setClickedIndices] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    // get promises
    (async () => {
      const urls = await Promise.all(
        Array.from({length: NUM_IMAGES}, () => fetchImage(false))
      );

      // remove duplicates
      const uniqueUrls = [...new Set(urls)];
      setUrls(uniqueUrls);

      // set indices
      setIndices(shuffleArray(Array.from({length: uniqueUrls.length}, (_, i) => i)));
    })();
  }, []);

  function shuffleArray(array) {
    for (let i = array.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const handleClick = (e) => {
    setIndices(shuffleArray(indices));
    if (clickedIndices.includes(e.target.dataset.id)) {
      setScore(0);
      setClickedIndices([]);
    } else {
      setClickedIndices([...clickedIndices, e.target.dataset.id]);
      const newScore = score + 1;

      // update scoring
      setScore(newScore);
      if (newScore > highScore) {
        setHighScore(newScore);
      }
    }
  }

  return (
    <>
      <div className="header">
        <div className="header-left">
          <h1>Memory game</h1>
          <h3>Get points by clicking on an image, but don&apos;t click on the same one twice!</h3>
        </div>
        <Scoreboard 
          score={score}
          highScore={highScore}
        />
      </div>
      <div className="card-grid">
        {indices.map(i => 
        <img src={imgUrls[i]} 
        key={i} 
        data-id={i}
        onClick={handleClick}/>)
        }
      </div>
    </>
  )
}

export default App
