const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function (id) {
    return User.findById(id);
};

module.exports.getUserByUsername = function (username) {
    const query = { username: username };
    return User.findOne(query);
};

module.exports.addUser = async function (newUser) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(newUser.password, salt);

        newUser.password = hash;
        const savedUser = await newUser.save();
        return savedUser;
    } catch (error) {
        throw error;
    }
};

module.exports.comparePassword = async function (candidatePassword, hash) {
    try {
        const isMatch = await bcrypt.compare(candidatePassword, hash);
        return isMatch;
    } catch (error) {
        throw error;
    }
};
