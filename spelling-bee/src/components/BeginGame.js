import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GetWord from './GetWord';

const WORD_COUNT = 3;

function BeginGame() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Generate a random integer from 0-999.
  const getLocalRandomInt = () => {
    return getRandomInt(0, 999);
  };

  // Handle the game start process.
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      // Fetch WORD_COUNT number of random integers locally.
      const randomInts = Array.from({ length: WORD_COUNT }, getLocalRandomInt);

      // Retrieve word data for each random integer.
      const wordPromises = randomInts.map(GetWord);
      const words = await Promise.all(wordPromises);

      // Structure word data.
      const wordData = words.map(({ Word, Definition, Sentence }) => ({
        word: Word,
        definition: Definition,
        sentence: Sentence
      }));

      // Navigate to the game page with the word data.
      navigate("/CS361-Spelling-Bee/game/0", { state: { wordData }});
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    } 
  };

  // Render the start game button or a loading indicator.
  return (
    <nav className="App-nav">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <button type="submit" className="button">Begin Game!</button>
        </form>
      )}
    </nav>
  );
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default BeginGame;