import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import WordTracker from '../components/WordTracker';
import Leaderboard from '../components/Leaderboard';
import '../styles/ResultPage.css';

function ResultPage({ gameState, resetGameState }) {

    const navigate = useNavigate();
    const {user} = useContext(UserContext);
    const [userStats, setUserStats] = useState(null);

    // Effect hook to fetch user statistics.
    useEffect(() => {
        const fetchUserStats = async () => {
            // try to fetch user stats from server with the user's id
            try {
               const response = await fetch(`cs-361-spelling-ku55cwei3-ajs-projects-178b9a17.vercel.app/getUserStats/${user._id}`, {
                   method: 'GET',
                   credentials: 'include',
                   headers: {
                       'Content-Type': 'application/json',
                   }
               });
               if (!response.ok) {
                   throw new Error('netword response was not ok')
               }
               // if success, set the userStats to the json response
               const data = await response.json();
               setUserStats(data);
            } catch (error) {
               console.log('Error with fetch operations: ', error)
            }
       };
        // if there is an active user, fetch their stats
        if (user) {
            fetchUserStats();
        }
    }, [user]);

    // func to handle the pressing of the main menu button
    const handleSubmit = (event) => {
        event.preventDefault();
        resetGameState();
        navigate(`/CS361-Spelling-Bee/`);
    };

    return (
        <div className="container">
            {user && (<h1>{user.name}'s Game Results!</h1>)}
            
            {/* Display game results for each word */}
            <div className="recent-words">
                {gameState.map((result, index) => (
                    <div className="word-result" key={index}>
                        <h3>Word #{index + 1}: {result.word}</h3>
                        {!result.correct ? (
                            <>
                                <p><small>You guessed this word incorrectly after {result.guesses + 1 === 1 ? '1 guess' : `${result.guesses + 1} guesses`}.</small></p>
                                <p style={{ color: 'red' }}>X</p>
                            </> 
                        ) : (
                            <>
                                <p><small>You guessed this word correctly after {result.guesses + 1 === 1 ? '1 guess' : `${result.guesses + 1} guesses`}.</small></p>
                                <p style={{ color: 'green' }}>✓</p>
                            </>
                        )}
                        <div>
                            <p><small>Definition: {result.definition}</small></p>
                            <p><small>Sentence: {result.sentence}</small></p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Display user statistics and leaderboards */}
            <div className="stats-container">
                {userStats && (
                    <Leaderboard/>
                )}

                {userStats && (
                    <WordTracker 
                        username={user.name}
                        easyCount={userStats.numberOfWordsGuessedCorrectly.easy}
                        mediumCount={userStats.numberOfWordsGuessedCorrectly.medium}
                        hardCount={userStats.numberOfWordsGuessedCorrectly.hard}/>
                )}
            </div>

            {/* Button to return to the main menu */}
            <form onSubmit={handleSubmit}>
                <button type="submit" className="button" aria-label="Navigate to main menu">Main Menu</button>
            </form>
        </div>
    );
}

export default ResultPage;