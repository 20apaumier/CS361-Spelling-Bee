import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import WordInput from '../components/WordInput';
import AudioButton from '../components/AudioButton';
import WordTimer from '../components/WordTimer';

function GamePage({ updateGameState }) {
    const navigate = useNavigate();
    const location = useLocation();
    const { wordId } = useParams();

    const wordData = location.state.wordData;
    const numericId = Number(wordId);

    const [timeLeft, setTimeLeft] = useState(60);
    const [guessesLeft, setGuessesLeft] = useState(3);
    const [guessState, setGuessState] = useState('none');

    // Check the game's state (either time's up or no guesses left) and update/navigate accordingly.
    useEffect(() => {
        if (timeLeft <= 0 || guessesLeft <= 0) {
            updateGameState(wordData[numericId].word, false, 3 - guessesLeft);
            if (numericId >= wordData.length - 1) {   
                navigate(`/CS361-Spelling-Bee/results`);
            } else {
                setTimeLeft(60);
                setGuessesLeft(3);
                navigate(`/CS361-Spelling-Bee/game/${numericId + 1}`, { state: { wordData }});
            }
        }
    }, [timeLeft, guessesLeft, numericId, navigate, wordData.length, updateGameState, wordData]);

    // Handle the user's word guess.
    const handleGuess = (guess) => {
        if (guess === wordData[numericId].word) {
            // Correct guess.
            setGuessState('');
            setTimeout(() => {
                updateGameState(wordData[numericId].word, wordData[numericId].definition, wordData[numericId].sentence, true, 3 - guessesLeft);;
                setGuessState('correct');
                // Navigate to results or next game.
                if (numericId >= wordData.length - 1) {
                    navigate(`/CS361-Spelling-Bee/results`);
                } else {
                    setTimeLeft(60);
                    setGuessesLeft(3);
                    navigate(`/CS361-Spelling-Bee/game/${numericId + 1}`, { state: { wordData }});
                }
            }, 100);
        } else {
            // Incorrect guess.
            setGuessesLeft(prevGuessesLeft => prevGuessesLeft - 1);
            setGuessState('');

            setTimeout(() => {
                setGuessState('incorrect');
            }, 100);

            // Last incorrect guess, navigate accordingly.
            if(guessesLeft === 1) {
                updateGameState(wordData[numericId].word, wordData[numericId].definition, wordData[numericId].sentence, false, 3 - guessesLeft);;
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

    // Retrieve data for the current word.
    const data = wordData[numericId];

    return (
      <div>
        <button onClick={() => navigate(`/CS361-Spelling-Bee/`)} className="small-button"> Main Menu</button>
        <h1>Word #{numericId + 1}</h1>
        <WordTimer timeLeft={timeLeft} setTimeLeft={setTimeLeft} />
        <WordInput onSubmit={handleGuess} onGuess={handleGuess} guessState={guessState}/>
        <p>Guesses left: {guessesLeft}</p>
        <p>{data.definition}</p>
        <AudioButton text={data.word} label="Pronunciation" />
        <AudioButton text={data.sentence} label="Sentence" />
        <button id="infoButton">i</button>
        <span className="tooltip">Click either of these buttons to hear the pronunciation of the word or it's use in a sentence. Must have audio turned on.</span>
      </div>
    );
}

export default GamePage;