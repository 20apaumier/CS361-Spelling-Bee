import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GetWord from './GetWord';

const RANDOM_INT_URL = "http://localhost:9700/";
const WORD_COUNT = 3;

function BeginGame() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const randomIntPromises = Array.from({ length: WORD_COUNT }, getMicroserviceRandomInt);
      const randomInts = await Promise.all(randomIntPromises);

      const wordPromises = randomInts.map(GetWord);
      const words = await Promise.all(wordPromises);

      const wordData = words.map(({ Word, Definition, Sentence }) => ({
        word: Word,
        definition: Definition,
        sentence: Sentence
      }));

      navigate("/game/0", { state: { wordData }});
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    } 
  };

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