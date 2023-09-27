import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BeginGame from '../components/BeginGame';
import DifficultySelection from '../components/DifficultySelection';
import '../styles/homepage.css'

function HomePage() {
    // Hook to facilitate navigation between routes
    const navigate = useNavigate();
    
    // Local state to store the selected difficulty level
    const [selectedDifficulty, setSelectedDifficulty] = useState(null);

    // Handler function to set the difficulty level when selected
    const handleDifficultySelect = (difficulty) => {
        setSelectedDifficulty(difficulty);
    };

    return (
        <div className="home-container">
            <h1>Welcome to the Spelling Bee!</h1>
            <div className="difficulty-selection">
                {/* Prompt user to select a difficulty level */}
                <h2>Select your difficulty:</h2>
                {/* Component to allow user to select a difficulty level */}
                <DifficultySelection onDifficultySelect={handleDifficultySelect} />
            </div>
            {/* Instructional text */}
            <h2>Press the button below to begin your game!</h2>
            {/* Button to start the game with the selected difficulty */}
            <BeginGame difficulty={selectedDifficulty} navigate={navigate} />
        </div>
    );
}

export default HomePage;