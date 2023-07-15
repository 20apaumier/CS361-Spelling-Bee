import './App.css';
import React, { useState, useEffect }from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage';
import ResultPage from './pages/ResultPage';

function App() {

  const [wordData, setWordData] = useState();
  const [gameState, setGameState] = useState([]);

  useEffect(() => {
      setWordData([
        {
          word: "extravagant",
          definition: "lacking restraint in spending money or using resources",
          pronunciation: "ex·trav·a·gant"
        },
        {
          word: "joyful",
          definition: "feeling, expressing, or causing great pleasure and happiness",
          pronunciation: "joy·ful"
        },
        {
          word: "reign",
          definition: "hold royal office; rule as king or queen.",
          pronunciation: "reign"
        }
      ]);
    }, []);

  const updateGameState = (word, correct, guesses) => {
      setGameState(prevState => [...prevState, {word, correct, guesses}]);
  };

  const resetGameState = () => {
      setGameState([]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Routes>
            <Route path="/" element={<HomePage wordData={wordData} />} />
            <Route path="/game/:wordId" element={<GamePage wordData={wordData} updateGameState={updateGameState}/>} />
            <Route path="/results" element={<ResultPage gameState={gameState} resetGameState={resetGameState} />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
