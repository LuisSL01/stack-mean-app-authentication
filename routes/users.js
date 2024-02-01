const express = require('express');
const router = express.Router();
const passport = require('passport-jwt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

//Register
/*
router.post('/register',(req, res, next)=>{
    console.log('hi');
    console.log('print req');
    console.log(req.body);
    let newUser = new User({
        name : req.body.name,
        email : req.body.email,
        username : req.body.username,
        password : req.body.password
    });
    User.addUser(newUser, (err, usr)=>{
        console.log('saliendo del callback')        
        if(err){
            res.json({success:false, msg:'Failed to register user'});
        }else{
            res.json({success:true, msg:'User registered'});
        }        
        console.log('terminando')
    });
});
*/
router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });
    User.addUser(newUser, (err, savedUser) => {    
        if (err) {
            res.status(500).json({ success: false, msg: 'Failed to register user' });
        } else {
            res.status(201).json({ success: true, msg: 'User registered', user: savedUser });
        }
    });
});
//Authenticate
router.post('/authenticate',(req, res, next)=>{
    console.log(req.body);
    console.log(req);
    res.send('AUTHENTICATE');
});

//Profile
router.get('/profile',(req, res, next)=>{
    res.send('PROFILE');
});



module.exports = router;