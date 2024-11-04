import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import WordTracker from '../components/WordTracker';
import Leaderboard from '../components/Leaderboard';
import '../styles/ProfilePage.css';

function ProfilePage() {
    const navigate = useNavigate();
    const {user} = useContext(UserContext);

    const [userStats, setUserStats] = useState(null);

    // Handler for navigating back to the main menu
    const handleSubmit = (event) => {
        event.preventDefault();
        navigate(`/CS361-Spelling-Bee/`);
    };

    useEffect(() => {
        const fetchUserStats = async () => {
            // fetch user stats from the server
            try {
                const response = await fetch(`https://spelling-bee-aj-2657ad9a4e22.herokuapp.com/getUserStats/${user._id}`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                if (!response.ok) {
                    throw new Error('netword response was not ok')
                }
                const data = await response.json();
                // update user statistics
                setUserStats(data);
            } catch (error) {
                console.log('Error with fetch operations: ', error)
            }
            
        };

        // fetch the user stats if they exist
        if(user) fetchUserStats();
    }, [user]);

    return (
        <div className="container">
            {user && (<h1>{user.name}'s User Profile!</h1>)}

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

            <form onSubmit={handleSubmit}>
                <button type="submit" className="button" aria-label="Navigate to main menu">Main Menu</button>
            </form>
        </div>
    );
}

export default ProfilePage;