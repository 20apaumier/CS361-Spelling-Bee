import './App.css';
import React, { useState }from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage';
import ResultPage from './pages/ResultPage';

function App() {

  const [gameState, setGameState] = useState([]);

  const updateGameState = (word, definition, sentence, correct, guesses) => {
      setGameState(prevState => [...prevState, {word, definition, sentence, correct, guesses}]);
  };

  const resetGameState = () => {
      setGameState([]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/game/:wordId" element={<GamePage updateGameState={updateGameState}/>} />
            <Route path="/results" element={<ResultPage gameState={gameState} resetGameState={resetGameState} />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
