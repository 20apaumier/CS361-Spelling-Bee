const User = require('../models/user');
const { hashPassword, comparePasswords } = require('../helpers/auth');
const jwt = require('jsonwebtoken');

// Register endpoint
const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        // Check if name was entered
        if (!name) {
            return res.json({
                error: 'Name is required'
            })
        };
        // Check if password was entered and consists of six or more characters
        if (!password || password.length < 6) {
            return res.json({
                error: 'Password is required and should be at least 6 characters long'
            })
        };
        // Check that email is unique
        const exist = await User.findOne({email})
        if (exist) {
            return res.json({
                error: 'Email is already taken'
            })
        }

        const hashedPassword = await hashPassword(password)

        // Create user in database
        const user = await User.create({
            name, 
            email, 
            password: hashedPassword
        })

        return res.json(user)
    } catch (error) {
        console.log(error)
    }
}

// Login endpoint
const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        // Check if user exists
        const user = await User.findOne({email});
        if (!user) {
            return res.json({
                error: "No user found"
            })
        }

        // Check if passwords match
        const match = await comparePasswords(password, user.password);
        if (match) {
            // assign a json web token (cookie)
            jwt.sign({email: user.email, id: user._id, name: user.name}, process.env.JWT_SECRET, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json(user)
            })
        }
        if (!match) {
            res.json({
                error: "Password is incorrect."
            })
        }
    } catch (error) {
        console.log(error)
    }
}

// Get user endpoint
const getProfile = (req, res) => {
    const { token } = req.cookies
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if (err) throw err;
            res.json(user)
        })
    } else {
        res.json(null)
    }
}

// Log out user endpoint
const logoutUser = (req, res) => {
    res.clearCookie('token');
    res.json({message: 'Logged out successfully'});
}

module.exports = {
    registerUser,
    loginUser,
    getProfile,
    logoutUser
}