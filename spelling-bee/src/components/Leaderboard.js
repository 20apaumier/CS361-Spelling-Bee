import React, { useState, useEffect } from 'react';
import '../styles/Leaderboard.css';

const Leaderboard = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch top users overall from the server
        async function fetchTopUsersOverall() {
            try {
                const response = await fetch('http://localhost:8000/getTopUsers');
                const topUsers = await response.json();
                setUsers(topUsers);
            } catch (error) {
                console.error("Failed to fetch overall leaderboard data:", error);
            }
        }
    
        fetchTopUsersOverall();
    }, []);

    // return a div showing the leaderboard based on the styling in leaderboard.css
    // and the data from the users retrieved from the server fetch
    return (
        <div className="leaderboard-container">
            <h2>Top Player Leaderboard</h2>
            <ol>
                {users.map((user, index) => (
                    <li key={user._id}>
                        <span>{user.name}</span>
                        <span>{user.totalGamesWon} wins</span>
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default Leaderboard;