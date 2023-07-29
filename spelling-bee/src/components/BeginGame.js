import React, { useState} from 'react';
import { useNavigate} from 'react-router-dom';
import GetWord from './GetWord';

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function BeginGame() {

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
  
    try {
      let wordData = [];
      
      // Generate 3 random integers and get corresponding word data
      for (let i = 0; i < 3; i++) {
        const randomInt = getRandomInt(1000);
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