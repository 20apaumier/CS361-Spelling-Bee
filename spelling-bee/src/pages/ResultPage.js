import React from 'react';
import { useNavigate } from 'react-router-dom';

function ResultPage({ gameState, resetGameState }) {

    console.log(gameState);

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        resetGameState();
        navigate(`/`);
    };

    return (
        <div>
            <h1>Game Results</h1>
            {gameState.map((result, index) => (
                <div key={index}>
                    <h2>Word #{index + 1}: {result.word}</h2>
                    <p>You guessed this word {result.guesses + 1 === 3 ? 'incorrectly' : 'correctly'}.</p>
                    <p>Guesses taken: {result.guesses + 1}</p>
                </div>
            ))}
            <form onSubmit={handleSubmit}>
                <button type="submit" class = "button">Main Menu</button>
            </form>
        </div>
    );
}

export default ResultPage;