const express = require('express');
const router = express.Router();
const profileModel = require('../model/profile');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const checkAuth = passport.authenticate('jwt', {session: false});

// profile CRUD

//@route POST http://localhost:5000/profile
//@desc add user profile
//@Access Private
router.post('/', checkAuth, (req, res) => {
    const{language, nationality, gender, age, introduction} = req.body;

    profileModel
        .findById(req.user.id)
        .exec()
        .then(user => {
            if(user){
                return res.json({
                    user: "user already exists"
                });
            }

            const newProfile = new profileModel({
               //language: language,
                user: req.user.id,
                language,
                nationality,
                gender,
                age,
                introduction
            });

            newProfile
                .save()
                .then(user => {
                    res.json({
                        msg: "user profile added",
                        profileInfo: user
                    });
                })
                .catch(err => {
                    res.json({
                        error: err
                    })
                });
        })
        .catch(err => {
           res.json({
               error: err
           })
        });
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