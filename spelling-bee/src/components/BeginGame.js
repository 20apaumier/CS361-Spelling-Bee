import React from 'react';
import { useNavigate } from 'react-router-dom';


function BeginGame() {

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        // Then redirect to the next page
        navigate("/game");
    };

    return (
        <nav className="App-nav">
            <form onSubmit={handleSubmit}>
                <button type="submit" id = "begin_game">Begin Game!</button>
            </form>
        </nav>
    );
  }

export default BeginGame;