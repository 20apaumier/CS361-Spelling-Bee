import React from 'react';
import { useNavigate } from 'react-router-dom';


function BeginGame({ wordData }) {

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (wordData) {
        navigate(`/game/0`);
    }
  };

  return (
    <nav className="App-nav">
      <form onSubmit={handleSubmit}>
        <button type="submit" class = "button">Begin Game!</button>
      </form>
    </nav>
  );
}

export default BeginGame;