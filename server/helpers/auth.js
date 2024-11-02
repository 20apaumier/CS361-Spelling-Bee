const bcrypt = require('bcryptjs');

// function to hash a password
const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        // generate a salt with 12 rounds for hashing
        bcrypt.genSalt(12, (err, salt) => {
            if (err) {
                reject(err)
            }
            // use the generated salt to hash the password
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    reject(err)
                }
                // if successful resolve the Promise with the given hash
                resolve(hash)
            })
        })
    })
}

// function to compare a given password to the hashed version
const comparePasswords = (password, hashed) => {
    return bcrypt.compare(password, hashed)
}

module.exports = {
    hashPassword,
    comparePasswords
}