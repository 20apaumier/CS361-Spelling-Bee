import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import WordInput from '../components/WordInput';
import PronunciationButton from '../components/PronunciationButton';
import WordTimer from '../components/WordTimer';
import SentenceButton from '../components/SentenceButton';

function GamePage({ updateGameState }) {
    const navigate = useNavigate();
    const location = useLocation();
    const { wordId } = useParams();

    const wordData = location.state.wordData;
    const numericId = Number(wordId);
    const [timeLeft, setTimeLeft] = useState(60);
    const [guessesLeft, setGuessesLeft] = useState(3);

    useEffect(() => {
        if (timeLeft <= 0 || guessesLeft <= 0) {
            updateGameState(wordData[numericId].word, false, 3 - guessesLeft);
            if (numericId >= wordData.length - 1) {   
                navigate(`/results`);
            } else {
                setTimeLeft(60);
                setGuessesLeft(3);
                navigate(`/game/${numericId + 1}`, { state: { wordData }});
            }
        }
    }, [timeLeft, guessesLeft, numericId, navigate, wordData.length, updateGameState, wordData]);

    const handleGuess = (guess) => {
        if (guess === wordData[numericId].word) {
            updateGameState(wordData[numericId].word, true, 3 - guessesLeft);
            if (numericId >= wordData.length - 1) {
                navigate(`/results`);
            } else {
                setTimeLeft(60);
                setGuessesLeft(3);
                navigate(`/game/${numericId + 1}`, { state: { wordData }});
            }
        } else {
            setGuessesLeft(prevGuessesLeft => prevGuessesLeft - 1);
            if(guessesLeft === 1) {
                if (numericId >= wordData.length - 1) {
                    updateGameState(wordData[numericId].word, false, 3 - guessesLeft);
                    navigate(`/results`);
                } else {
                    setTimeLeft(60);
                    setGuessesLeft(3);
                    navigate(`/game/${numericId + 1}`, { state: { wordData }});
                }
            }
        }
    };

    const data = wordData[numericId];

    return (
      <div>
        <h1>Word #{numericId + 1}</h1>
        <WordTimer timeLeft={timeLeft} setTimeLeft={setTimeLeft} />
        <WordInput onSubmit={handleGuess} onGuess={handleGuess}/>
        <p>Guesses left: {guessesLeft}</p>
        <p>{data.definition}</p>
        <PronunciationButton word={data.word} />
        <SentenceButton sentence={data.sentence} />
      </div>
    );
}

export default GamePage;