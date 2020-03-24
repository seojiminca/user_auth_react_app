const express = require('express');
const router = express.Router();
const profileModel = require('../model/profile');

// profile CRUD

//@route POST http://localhost:5000/profile/add
//@desc add user profile
//@Access Private
router.post('/', (req, res) => {

});

//@route GET http://localhost:5000/profile/get
//@desc read user profile
//@Access Private
router.get('/', (req, res) => {

});

//@route PATCH http://localhost:5000/profile/patch
//@desc update user profile
//@Access Private
router.patch('/', (req, res) => {

});

//@route DELETE http://localhost:5000/profile/delete
//@desc delete user profile
//@Access Private
router.delete('/', (req, res) => {

});

module.exports = router;