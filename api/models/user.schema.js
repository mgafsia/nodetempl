const mongoose = require('mongoose');

// create schema
const userSchema = new mongoose.Schema({
	userId: Number,
	firstName: String,
	lastName: String
});

module.exports = mongoose.model('UserSchema', userSchema);
