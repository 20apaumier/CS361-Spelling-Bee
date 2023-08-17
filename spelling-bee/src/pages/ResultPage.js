import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ResultPage.css'

function ResultPage({ gameState, resetGameState }) {

    const navigate = useNavigate();
    const [showInfoIndex, setShowInfoIndex] = useState(null);

     // Handle the click event to navigate back to the main menu and reset the game.
    const handleSubmit = (event) => {
        event.preventDefault();
        resetGameState();
        navigate(`/`);
    };

    // Handle the click event to show or hide additional word information.
    const handleClick = (index) => {
        if (showInfoIndex === index) {
            setShowInfoIndex(null); 
        } else {
            setShowInfoIndex(index);
        }
    };

    return (
        <div className="container">
            <h1>Game Results</h1>
            {gameState.map((result, index) => (
                <div className="result" key={index}>
                    <h2>Word #{index + 1}: {result.word}</h2>
                    <p>You guessed this word {result.guesses + 1 === 3 ? 'incorrectly' : 'correctly'}.</p>
                    <p>Guesses taken: {result.guesses + 1}</p>
                    <button onClick={() => handleClick(index)}>Show More Info</button>
                    {showInfoIndex === index && <div>
                        <p>Definition: {result.definition}</p>
                        <p>Sentence: {result.sentence}</p>
                    </div>}
                </div>
            ))}
            <form onSubmit={handleSubmit}>
                <button type="submit" className="button">Main Menu</button>
            </form>
        </div>
    );
}

export default ResultPage;