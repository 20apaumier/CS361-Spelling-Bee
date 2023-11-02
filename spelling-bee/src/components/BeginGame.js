import React, { useState } from 'react';
import { GetWord } from './GetWord';

// Constant to represent the number of words to fetch for the game
const WORD_COUNT = 3;

function BeginGame({ difficulty, navigate }) {
  const [isLoading, setIsLoading] = useState(false);

  // Utility function to generate a random integer between 0 and 99
  const getLocalRandomInt = () => {
    return getRandomInt(0, 99);
  };

  // Event handler for starting the game
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate if difficulty is selected
    if (!difficulty) {
      alert("Please select a difficulty level first!");
      return;
    }

    // Start loading state
    setIsLoading(true);

    try {
      // Generate an array of random integers
      const randomInts = Array.from({ length: WORD_COUNT }, getLocalRandomInt);

      // Fetch words based on difficulty and the random integers
      const wordPromises = randomInts.map(index => GetWord(index, difficulty));
      const words = await Promise.all(wordPromises);
      const wordData = words;

      // Navigate to the game page with the fetched words and difficulty of the game
      navigate("/CS361-Spelling-Bee/game/0", { state: { wordData, difficulty }});
    } catch (error) {
      // Handle any errors during the fetch operation
      console.error(error);
    } finally {
      // End loading state
      setIsLoading(false);
    }
  };

  return (
    <nav className="App-nav">
        {isLoading ? (
            // Display loading indicator while fetching words
            <div>Loading...</div>
        ) : (
            // Display the game start button if not loading
            <form onSubmit={handleSubmit}>
                <button type="submit" className="button">
                    Begin Game!
                </button>
            </form>
        )}
    </nav>
);
}

// Utility function to generate a random integer between min and max (inclusive)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default BeginGame;