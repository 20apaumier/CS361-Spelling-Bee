const User = require('../models/user');

// This endpoint will update the number of words correctly guessed in the db
// it will also keep track of the count of individual words guessed
const updateWordStats = async (req, res) => {
    const { userId, difficulty, word } = req.body;

    try {
        // Find the user by ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        // Increment the number of words guessed correctly based on difficulty
        user.stats.numberOfWordsGuessedCorrectly[difficulty] += 1;

        // Update or add the word in dictionaryOfCorrectlyGuessedWords
        const wordIndex = user.stats.dictionaryOfCorrectlyGuessedWords.findIndex(item => item.word === word);

        if (wordIndex > -1) {
            // Word exists, increment count
            user.stats.dictionaryOfCorrectlyGuessedWords[wordIndex].count += 1;
        } else {
            // Word doesn't exist, add to the array
            user.stats.dictionaryOfCorrectlyGuessedWords.push({ word, count: 1 });
        }

        await user.save();
        res.send({ message: 'Word stats updated successfully' });
    } catch (error) {
        res.status(500).send({ error: 'Error updating word stats' });
    }
};

// This endpoint will increment the count of games played based on difficulty
// then if the game was won (3/3 words correct) it will increment that count as well
const updateGameStats = async (req, res) => {
    const { userId, difficulty, did_win } = req.body;

    try {
        // Find the user by ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        // Increment the games played count based on difficulty
        user.stats.gamesPlayed[difficulty] += 1;

        // If the game was won, increment the games won count based on difficulty
        if (did_win) {
            user.stats.gamesWon[difficulty] += 1;
        }

        await user.save();
        res.send({ message: 'Game stats updated successfully' });
    } catch (error) {
        res.status(500).send({ error: 'Error updating game stats' });
    }
};

// This endpoint will return the stats information of the user passed in
const getUserStats = async (req, res) => {
    const user = await User.findById(req.params.userId);
    if (!user) {
        return res.status(404).send({ error: 'User not found' });
    }
    res.send(user.stats);
}

// This endpoint will calculate the top users based on adding all games won together
const getTopUsers = async(req, res) => {
    // this will add all the games won together then sort the users
    try {
        const users = await User.aggregate([
            {
                $addFields: {
                    totalGamesWon: {
                        $add: [
                            "$stats.gamesWon.easy",
                            "$stats.gamesWon.medium",
                            "$stats.gamesWon.hard"
                        ]
                    }
                }
            },
            {
                $sort: { totalGamesWon: -1 } 
            },
            {
                // limit is how many users we want to display in the leaderboard
                $limit: 3
            }
        ]).exec();
        res.json(users);
    } catch (error) {
        res.status(500).send("Error fetching top user's leaderboard data: ", error);
    }
}

module.exports = {
    updateWordStats,
    updateGameStats,
    getUserStats,
    getTopUsers
}