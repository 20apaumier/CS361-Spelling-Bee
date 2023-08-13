import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GetWord from './GetWord';

function BeginGame() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const getMicroserviceRandomInt = async () => {
    try {
      const response = await fetch("http://localhost:9700/", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ request: "getRandomInt" })
      });

      const data = await response.json();

      return data.int;

    } catch (error) {
      console.error("Error fetching random int:", error);
      throw error;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      let wordData = [];

      // Generate 3 random integers from microservice and get corresponding word data
      for (let i = 0; i < 3; i++) {
        const randomInt = await getMicroserviceRandomInt();
        const data = await GetWord(randomInt);

        const wordObject = {
          word: data['Word'],
          definition: data['Definition'],
          sentence: data['Sentence']
        };
        wordData.push(wordObject);
      }

      navigate("/game/0", { state: { wordData }});

    } catch (error) {
      console.log(error);
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