import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import WordInput from '../components/WordInput';
import AudioButton from '../components/AudioButton';
import WordTimer from '../components/WordTimer';
import { updateDatabaseWithGames, updateDatabaseWithWords } from '../helpers/GamePageHelper'
import '../styles/GamePage.css'

// GamePage component represents the main gameplay interface.
function GamePage({ updateGameState, resetGameState }) {
    // Navigation and routing hooks to get parameters and navigate between pages.
    const navigate = useNavigate();
    const location = useLocation();
    const { wordId } = useParams();

    // Get current user so we can upate the db
    const {user} = useContext(UserContext);
    
    // Fetch word data and difficulty from route state.
    const wordData = location.state.wordData;
    const numericId = Number(wordId);  // Convert word ID to a number.
    const difficulty = location.state.difficulty;

    // State variables for game logic.
    const [timeLeft, setTimeLeft] = useState(60);         // Remaining time for the current word.
    const [guessesLeft, setGuessesLeft] = useState(3);    // Number of guesses left for the player.
    const [guessState, setGuessState] = useState('none'); // Track state of the user's guess.
    const [correctWords, setCorrectWords] = useState(0);  // Track number of correct words

    // This function determines the next step after a guess or a timeout.
    const proceedToNextOrEnd = async () => {
        // If it's the last word, navigate to results. Otherwise, go to the next word.
        if (numericId >= wordData.length - 1) {
            if (correctWords === 2) {
                await updateDatabaseWithGames(user._id, difficulty, true)
            } else {
                await updateDatabaseWithGames(user._id, difficulty, false)
            }
            navigate(`/CS361-Spelling-Bee/results`, { state: { wordData, difficulty }});
        } else {
            setTimeLeft(60);
            setGuessesLeft(3);
            navigate(`/CS361-Spelling-Bee/game/${numericId + 1}`, { state: { wordData, difficulty }});
        }
    };

    // Update useEffect to handle end of game conditions based on time or guesses.
    useEffect(() => {
        // Check if time has run out or no guesses are left.
        if (timeLeft <= 0 || guessesLeft <= 0) {
            updateGameState(wordData[numericId]['word'], false, 3 - guessesLeft);
            proceedToNextOrEnd();
        }
    }, [timeLeft, guessesLeft, numericId, navigate, wordData, difficulty, updateGameState, correctWords, user._id]);

    // function to handle user guesses
    const handleGuess = async (guess) => {
        // if the guess is correct
        if (guess === wordData[numericId]['word']) {
            let newCorrectWords = correctWords + 1;
            setCorrectWords(newCorrectWords);
            await updateDatabaseWithWords(user._id, difficulty, wordData[numericId]['word']);
            setGuessState('');
            setTimeout(async () => {
                updateGameState(wordData[numericId]['word'], wordData[numericId]['definition'], wordData[numericId]['sentence'], wordData[numericId]['part_of_speech'], wordData[numericId]['language_of_origin'], true, 3 - guessesLeft);
                setGuessState('correct');
                await proceedToNextOrEnd();
            }, 100);
        // if the guess is not correct
        } else {
            setGuessesLeft(prevGuessesLeft => prevGuessesLeft - 1);
            setGuessState('');
            setTimeout(() => {
                setGuessState('incorrect');
            }, 100);
        }
    };

    // Render the game interface.
    return (
      <div className = 'game-container'>
        {/* Button to navigate back to the main menu */}
        <button onClick={() => {
            // Reset the game state here
            setTimeLeft(60);
            setGuessesLeft(3);
            setGuessState('none');
            setCorrectWords(0);

            resetGameState();

            // Navigate back to the main menu
            navigate(`/CS361-Spelling-Bee/`);
        }} className="small-button"> Main Menu</button>
        {/* Display the current word number */}
        <h1>Word #{numericId + 1}</h1>
        {/* Timer component */}
        <WordTimer timeLeft={timeLeft} setTimeLeft={setTimeLeft} />
        {/* Word input component for user to submit their guesses */}
        <WordInput onSubmit={handleGuess} onGuess={handleGuess} guessState={guessState}/>
        {/* Display the number of guesses left and the word definition */}
        <p>Guesses left: {guessesLeft}</p>
        <p className='definition'>Definition: {wordData[numericId]['definition']}</p>
        {/* Audio buttons to provide hints to the user */}
        <div className="button-container">
            <AudioButton text={wordData[numericId]['language_of_origin']} label="Language of Origin" />
            <AudioButton text={wordData[numericId]['part_of_speech']} label="Part of Speech" />
            <AudioButton text={wordData[numericId]['word']} label="Pronunciation" />
            <AudioButton text={wordData[numericId]['sentence']} label="Sentence" />
        </div>
      </div>
    );
}

export default GamePage;