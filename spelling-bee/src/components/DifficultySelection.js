import { React, useState } from 'react';

function DifficultySelection({ onDifficultySelect }) {
    // State to track the currently active difficulty
    const [activeDifficulty, setActiveDifficulty] = useState(null);

    // Event handler for selecting a difficulty
    const handleClick = (difficulty) => {
        // Set the clicked difficulty as active
        setActiveDifficulty(difficulty);
        // Notify the parent component of the selected difficulty
        onDifficultySelect(difficulty);
    };

    return (
        <div>
            {/* Render the Easy difficulty button, highlighting it if it's the active selection */}
            <button 
                className={`difficulty-button easy ${activeDifficulty === 'easy' ? 'active-difficulty' : ''}`} 
                onClick={() => handleClick('easy')}>
                Easy
            </button>
            
            {/* Render the Medium difficulty button, highlighting it if it's the active selection */}
            <button 
                className={`difficulty-button medium ${activeDifficulty === 'medium' ? 'active-difficulty' : ''}`} 
                onClick={() => handleClick('medium')}>
                Medium
            </button>

            {/* Render the Hard difficulty button, highlighting it if it's the active selection */}
            <button 
                className={`difficulty-button hard ${activeDifficulty === 'hard' ? 'active-difficulty' : ''}`} 
                onClick={() => handleClick('hard')}>
                Hard
            </button>
        </div>
    );
}

export default DifficultySelection;