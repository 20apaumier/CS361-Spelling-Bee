import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import WordInput from '../components/WordInput';
import AudioButton from '../components/AudioButton';
import WordTimer from '../components/WordTimer';

// GamePage component represents the main gameplay interface.
function GamePage({ updateGameState }) {
    // Navigation and routing hooks to get parameters and navigate between pages.
    const navigate = useNavigate();
    const location = useLocation();
    const { wordId } = useParams();
    
    // Fetch word data and difficulty from route state.
    const wordData = location.state.wordData;
    const numericId = Number(wordId);  // Convert word ID to a number.
    const { difficulty } = location.state;

    // State variables for game logic.
    const [timeLeft, setTimeLeft] = useState(60);        // Remaining time for the current word.
    const [guessesLeft, setGuessesLeft] = useState(3);   // Number of guesses left for the player.
    const [guessState, setGuessState] = useState('none');// Track state of the user's guess.

    // Effect to handle end of game conditions based on time or guesses.
    useEffect(() => {
        // Check if time has run out or no guesses are left.
        if (timeLeft <= 0 || guessesLeft <= 0) {
            updateGameState(wordData[numericId]['word'], false, 3 - guessesLeft);
            // Check if it's the last word. If so, navigate to results page.
            if (numericId >= wordData.length - 1) {   
                navigate(`/CS361-Spelling-Bee/results`);
            } else {
                // Reset time and guesses and navigate to the next word.
                setTimeLeft(60);
                setGuessesLeft(3);
                navigate(`/CS361-Spelling-Bee/game/${numericId + 1}`, { state: { wordData }});
            }
        }
    }, [timeLeft, guessesLeft, numericId, navigate, wordData, difficulty, updateGameState]);

    // Function to handle the user's word guess.
    const handleGuess = (guess) => {
        // Check if the guess matches the current word.
        if (guess === wordData[numericId]['word']) {
            // User guessed correctly.
            setGuessState('');
            setTimeout(() => {
                updateGameState(wordData[numericId]['word'], wordData[numericId]['definition'], wordData[numericId]['sentence'], wordData[numericId]['part_of_speech'], wordData[numericId]['language_of_origin'], true, 3 - guessesLeft);
                setGuessState('correct');
                // If it's the last word, navigate to results. Otherwise, go to the next word.
                if (numericId >= wordData.length - 1) {
                    navigate(`/CS361-Spelling-Bee/results`);
                } else {
                    setTimeLeft(60);
                    setGuessesLeft(3);
                    navigate(`/CS361-Spelling-Bee/game/${numericId + 1}`, { state: { wordData }});
                }
            }, 100);
        } else {
            // User guessed incorrectly.
            setGuessesLeft(prevGuessesLeft => prevGuessesLeft - 1);
            setGuessState('');
            setTimeout(() => {
                setGuessState('incorrect');
            }, 100);

            // If it's the user's last guess, handle navigation accordingly.
            if(guessesLeft === 1) {
                updateGameState(wordData[numericId]['word'], wordData[numericId]['definition'], wordData[numericId]['sentence'], wordData[numericId]['part_of_speech'], wordData[numericId]['language_of_origin'], false, 3 - guessesLeft);
                if (numericId >= wordData.length - 1) {
                    navigate(`/CS361-Spelling-Bee/results`);
                } else {
                    setTimeLeft(60);
                    setGuessesLeft(3);
                    navigate(`/CS361-Spelling-Bee/game/${numericId + 1}`, { state: { wordData }});
                }
            }
        }
    };

    // Render the game interface.
    return (
      <div>
        {/* Button to navigate back to the main menu */}
        <button onClick={() => navigate(`/CS361-Spelling-Bee/`)} className="small-button"> Main Menu</button>
        {/* Display the current word number */}
        <h1>Word #{numericId + 1}</h1>
        {/* Timer component */}
        <WordTimer timeLeft={timeLeft} setTimeLeft={setTimeLeft} />
        {/* Word input component for user to submit their guesses */}
        <WordInput onSubmit={handleGuess} onGuess={handleGuess} guessState={guessState}/>
        {/* Display the number of guesses left and the word definition */}
        <p>Guesses left: {guessesLeft}</p>
        <p>Definition: {wordData[numericId]['definition']}</p>
        {/* Audio buttons to provide hints to the user */}
        <AudioButton text={wordData[numericId]['language_of_origin']} label="Language of Origin" />
        <AudioButton text={wordData[numericId]['part_of_speech']} label="Part of Speech" />
        <AudioButton text={wordData[numericId]['word']} label="Pronunciation" />
        <AudioButton text={wordData[numericId]['sentence']} label="Sentence" />
        {/* Information button and tooltip for users */}
        <button id="infoButton">i</button>
        <span className="tooltip">Click any of these buttons to hear the corresponding hint. Must have audio turned on.</span>
      </div>
    );
}

export default GamePage;