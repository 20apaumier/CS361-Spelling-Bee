import './App.css';
import React, { useState, useContext }from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage';
import ResultPage from './pages/ResultPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import axios from 'axios';
import NavBar from './components/NavBar';
import { Toaster } from 'react-hot-toast';
import { UserContextProvider, UserContext } from './context/userContext';
import ProfilePage from './pages/ProfilePage';

axios.defaults.baseURL = 'https://spelling-bee-aj-2657ad9a4e22.herokuapp.com/';
axios.defaults.withCredentials = true;

function ProtectedRoute({ children }) {
  const { user } = useContext(UserContext);
  return user ? children : <Navigate to="/CS361-Spelling-Bee/login" />;
}

function App() {

  const [gameState, setGameState] = useState([]);

  const updateGameState = async (word, definition, sentence, part_of_speech, language_of_origin, correct, guesses) => {
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
                    <NavBar resetGameState = {resetGameState} />
                    <Toaster position='bottom-right' toastOptions={{duration: 2000}} />
                    <Routes>
                        <Route path="/CS361-Spelling-Bee/login" element={<LoginPage />} />
                        <Route path="/CS361-Spelling-Bee/register" element={<RegisterPage />} />
                        <Route path="/CS361-Spelling-Bee/" element={
                          <ProtectedRoute>
                            <HomePage />
                          </ProtectedRoute>
                        } />
                        <Route path="/CS361-Spelling-Bee/profile" element={
                          <ProtectedRoute>
                            <ProfilePage />
                          </ProtectedRoute>
                        } />
                        <Route path="/CS361-Spelling-Bee/game/:wordId" element={
                          <ProtectedRoute>
                            <GamePage updateGameState={updateGameState} />
                          </ProtectedRoute>
                        } />
                        <Route path="/CS361-Spelling-Bee/results" element={
                          <ProtectedRoute>
                            <ResultPage gameState={gameState} resetGameState={resetGameState} />
                          </ProtectedRoute>
                        } />
                    </Routes>
                </UserContextProvider>
            </Router>
        </header>
    </div>
  );
}

export default App;
