import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GetWord from './GetWord';

const RANDOM_INT_URL = "http://localhost:9700/";
const WORD_COUNT = 3;

function BeginGame() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch a random integer from the microservice.
  const getMicroserviceRandomInt = async () => {
    try {
      const response = await fetch(RANDOM_INT_URL, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ request: "getRandomInt" })
      });
      const { int } = await response.json();
      return int;
    } catch (error) {
      console.error("Error fetching random int:", error);
      throw error;
    }
  };

  // Handle the game start process.
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      // Fetch WORD_COUNT number of random integers.
      const randomIntPromises = Array.from({ length: WORD_COUNT }, getMicroserviceRandomInt);
      const randomInts = await Promise.all(randomIntPromises);

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
      navigate("/game/0", { state: { wordData }});
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

export default BeginGame;