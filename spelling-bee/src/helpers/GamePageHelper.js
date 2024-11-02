function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Asynchronous function to update word statistics in the database
async function updateDatabaseWithWords (user_id, difficulty, word) {
    await fetch('cs-361-spelling-ku55cwei3-ajs-projects-178b9a17.vercel.app/updateWordStats', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: user_id,
            difficulty: difficulty,
            word: word,
        })
    })
    .then(response => response.json()) // Convert response to JSON
    .then(data => console.log(data)) // Log the data received
    .catch(error => console.error('Error updating correct word in db:', error));

    return "database updated";
}

// Asynchronous function to update game statistics in the database
async function updateDatabaseWithGames (user_id, difficulty, did_win) {
    await fetch('cs-361-spelling-ku55cwei3-ajs-projects-178b9a17.vercel.app/updateGameStats', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: user_id,
            difficulty: difficulty,
            did_win: did_win,
        })
    })
    .then(response => response.json()) // Convert response to JSON
    .then(data => console.log(data)) // Log the data received
    .catch(error => console.error('Error updating game in db:', error));

    return "database updated";
}

export { delay, updateDatabaseWithGames, updateDatabaseWithWords };