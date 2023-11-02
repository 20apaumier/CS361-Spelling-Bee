const mongoose = require('mongoose');
const { Schema } = mongoose

// Schema to keep track of the count of each word
// this is used as essentially the key-value pair of the db
const wordGuessedSchema = new Schema({
    word: String,
    count: { type: Number, default: 1 }
}, { _id: false });

// Schema used to keep track of the user's name, email, password, and game stats
const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    stats: {
        numberOfWordsGuessedCorrectly: {
            easy: { type: Number, default: 0 },
            medium: { type: Number, default: 0 },
            hard: { type: Number, default: 0 },
        },
        gamesWon: {
            easy: { type: Number, default: 0 },
            medium: { type: Number, default: 0 },
            hard: { type: Number, default: 0 },
        },
        gamesPlayed: {
            easy: { type: Number, default: 0 },
            medium: { type: Number, default: 0 },
            hard: { type: Number, default: 0 },
        },
        dictionaryOfCorrectlyGuessedWords: [wordGuessedSchema]
    }
});

// exported user model to be used throughout the application
const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;