const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

// Register
router.post('/register', async (req, res) => {
    try {
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
        });
        const savedUser = await User.addUser(newUser);
        res.status(201).json({ success: true, msg: 'User registered', user: savedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, msg: 'Failed to register user' });
    }
});

// Authenticate
router.post('/authenticate', async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        const user = await User.getUserByUsername(username);

        if (!user) {
            return res.status(404).json({ success: false, msg: 'User not found' });
        }

        const isMatch = await User.comparePassword(password, user.password);

        if (isMatch) {
            const token = generateJwtToken(user);
            return res.json({
                success: true,
                token: 'Bearer ' + token,
                user: {
                    id: user._id,
                    name: user.name,
                    username: user.username,
                    email: user.email,
                },
            });
        } else {
            return res.json({ success: false, msg: 'User or password incorrect' });
        }
    } catch (error) {        
        return res.status(500).json({ success: false, msg: 'Error during authentication' });
    }
});

// Profile
router.get('/profile',passport.authenticate('jwt', {session:false}), (req, res, next) => {    
    res.json({user:req.user});    
});

module.exports = router;

function generateJwtToken(user) {
    return jwt.sign({ user }, config.secret, {
        expiresIn: 604800, // 1 week
    });
}
