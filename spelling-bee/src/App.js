import './App.css';
import React, { useState }from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage';
import ResultPage from './pages/ResultPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import axios from 'axios';
import NavBar from './components/NavBar';
import { Toaster } from 'react-hot-toast';
import { UserContextProvider } from './context/userContext';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

function App() {

  const [gameState, setGameState] = useState([]);

  const updateGameState = (word, definition, sentence, part_of_speech, language_of_origin, correct, guesses) => {
      setGameState(prevState => [...prevState, {word, definition, sentence, part_of_speech, language_of_origin, correct, guesses}]);
  };

  const resetGameState = () => {
      setGameState([]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Router>
        <UserContextProvider>
        <NavBar />
        <Toaster position = 'bottom-right' toastOptions={{duration: 2000}} />
          <Routes>
            <Route path="/CS361-Spelling-Bee/" element={<HomePage/>} />
            <Route path="/CS361-Spelling-Bee/register" element={<RegisterPage/>} />
            <Route path="/CS361-Spelling-Bee/login" element={<LoginPage/>} />
            <Route path="/CS361-Spelling-Bee/game/:wordId" element={<GamePage updateGameState={updateGameState}/>} />
            <Route path="/CS361-Spelling-Bee/results" element={<ResultPage gameState={gameState} resetGameState={resetGameState} />} />
          </Routes>
        </UserContextProvider>
        </Router>
      </header>
    </div>
  );
}

export default App;
