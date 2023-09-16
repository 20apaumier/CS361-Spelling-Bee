import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ResultPage.css'

function ResultPage({ gameState, resetGameState }) {

    const navigate = useNavigate();

    // Local state to keep track of which word's additional information is being displayed
    const [showInfoIndex, setShowInfoIndex] = useState(null);

    // Handle the click event to navigate back to the main menu and reset the game state
    const handleSubmit = (event) => {
        event.preventDefault();
        resetGameState();
        navigate(`/CS361-Spelling-Bee/`);
    };

    // Handle the click event to toggle the display of additional word information
    const handleClick = (index) => {
        if (showInfoIndex === index) {
            setShowInfoIndex(null); 
        } else {
            setShowInfoIndex(index);
        }
    };

    // Render the game results and controls to navigate back to the main menu
    return (
        <div className="container">
            <h1>Game Results</h1>
            {/* Loop through the game state to display each word's result */}
            {gameState.map((result, index) => (
                <div className="result" key={index}>
                    <h3>Word #{index + 1}: {result.word}</h3>
                    <p><small>You guessed this word {result.guesses + 1 === 3 ? 'incorrectly' : 'correctly'}.</small></p>
                    <p><small>Guesses taken: {result.guesses + 1}</small></p>
                    <button type="button" onClick={() => handleClick(index)} aria-label={`Show more info for ${result.word}`}>Show More Info</button>
                    {/* Conditionally render additional word information */}
                    {showInfoIndex === index && <div>
                        <p><small>Definition: {result.definition}</small></p>
                        <p><small>Sentence: {result.sentence}</small></p>
                    </div>}
                </div>
            ))}
            {/* Form containing a button that navigates the user back to the main menu */}
            <form onSubmit={handleSubmit}>
                <button type="submit" className="button" aria-label="Navigate to main menu">Main Menu</button>
            </form>
        </div>
    );
}

export default ResultPage;