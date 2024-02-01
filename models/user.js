const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//create user schema
const UserSchema = mongoose.Schema({
    name:{
        type: String
    },
    email:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback){
    const query = {username:username}
    User.findOne(query, callback);
}
/* 
module.exports.addUser = function(newUser, callback){    
    console.log('adding user')
    console.log(newUser);
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {  
            if (err) throw err;
    
            newUser.password = hash;
            newUser.save()
                .then(savedUser => {
                    // Handle the saved user or whatever logic you need
                    console.log(savedUser);
                })
                .catch(saveErr => {
                    // Handle the save error
                    console.error(saveErr);
                });
        });
    });
}

*/
module.exports.addUser = function(newUser, callback) {    
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return callback(err, null);
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) return callback(err, null);            
            newUser.password = hash;
            newUser.save()
                .then(savedUser => {                    
                    callback(null, savedUser);
                })
                .catch(saveErr => {
                    callback(saveErr, null);
                });
        });
    });
};