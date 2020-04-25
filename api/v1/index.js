const express = require('express');

// router
const router = express.Router();

// ping service
router.get('/api/v1/ping', (req, res) => {
	res.status(200).json({
		status: 'Up',
		date: new Date()
	});
});

// User methods and services
// Create a user
const UserSchema = require('../models/user.schema');
router.post('/api/v1/users', (req, result) => {
	console.log(`post to create user ${JSON.stringify(req.body)}`);
	const user = new UserSchema(req.body);
	user.save((err, createdUser) => {
		if (err) {
			return result.status(500).json(err);
		} else {
			return result.status(201).json(createdUser);
		}
	});
});
// Get user by id
router.get('/api/v1/users/:userId', (req, res) => {
	const userId = req.params.userId;
	console.log('userId ', userId);
	UserSchema.find({'userId': userId}).exec()
		.then(users => {
			res.status(200).json(users);
		}).catch(err => {
			res.status(500).json({
				message: `can not find user with id ${userId}`,
				err
			});
		});
});
// Get All users
router.get('/api/v1/users', (req, res) => {
	UserSchema.find().exec()
		.then(users => {
			res.status(200).json(users);
		}).catch(err => {
			res.status(500).json({
				message: 'can not find users',
				err
			});
		});
});
// Remove a user
router.delete('/api/v1/users/:userId', (req, res) => {
	const userId = req.params.userId;
	console.log('userId ', userId);
	UserSchema.remove({'userId': userId}).exec()
		.then(() => {
			res.status(200).json({msg: `user with userId ${userId} has been removed`});
		}).catch(err => {
			res.status(500).json({
				message: `can not find user with id ${userId}`,
				err
			});
		});
});

// export the module
module.exports = router;
