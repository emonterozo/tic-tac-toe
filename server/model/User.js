const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    player: String,
    token: String,
    score: Number
}, { collection: 'users' })

const User = mongoose.model('User', UserSchema)

module.exports = User;