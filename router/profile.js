const express = require('express');
const router = express.Router();
const profileModel = require('../model/profile');
const userModel = require('../model/user');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const checkAuth = passport.authenticate('jwt', {session: false});

// profile CRUD

//@route POST http://localhost:5000/profile
//@desc add user profile
//@Access Private
router.post('/', checkAuth, (req, res) => {
    const{language, nationality, gender, age, location, travelStyle, introduction, travelHistory} = req.body;

    profileModel
        //findOne 보다 convenience
        .findById(req.user.id)
        .exec()
        .then(user => {
            if(user){
                return res.json({
                    user: "user already exists"
                });
            }

            const newProfile = new profileModel({
               //language: language 이름이 같으니 생략
                user: req.user.id,
                language,
                nationality,
                gender,
                age,
                location,
                travelStyle,
                introduction,
                travelHistory
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

//@route GET http://localhost:5000/profile
//@desc read user profile
//@Access Private
router.get('/', checkAuth, (req, res) => {
    profileModel
        .findOne({user:req.user.id})
        .then(profile => {
            if(!profile){
                res.json({
                    msg: "user profile does not exist"
                })
            }
            res.json(profile);
        })
        .catch(err => {
            res.json({
                error: err
            })
        });

});

//@route PATCH http://localhost:5000/profile
//@desc update user profile
//@Access Private
router.patch('/', checkAuth, (req, res) => {

   //  const updateOpt = {};
   //
   // // console.log("body is", req.body)
   //
   //  for(const opt of req.body){
   //      updateOpt[opt.propName] = opt.value;
   //      console.log(updateOpt)
   //      //console.log("opt is ", opt)
   //  }

    //1. 틀만들기
    const profileFields = {};

    //
    profileFields.user = req.user.id;
    //입력값을 넣기. model에서 데이터 트리확인하고 넣기. user 랑 profile 랑 다름.
    if(req.body.language) profileFields.language = req.body.language;
    if(req.body.nationality) profileFields.nationality = req.body.nationality;

    console.log(req.user.id)
    console.log(profileFields)
        profileModel

            .findOneAndUpdate(
                {user: req.user.id}, //대상자 필터링
                {$set: profileFields},
                { new: true}
                )
            .then(doc => {
                res.json({
                    updatedInfo: doc
                })
            })
            .catch(err => {
                res.json({
                    error: err
                });
            });
});

//@route DELETE http://localhost:5000/profile
//@desc delete user profile
//@Access Private
router.delete('/', checkAuth, (req, res) => {
    profileModel
        .findOneAndRemove({user: req.user.id})
        .then(() => {
            userModel
                .findOneAndRemove({_id: req.user.id})
                .then(() => {
                    res.json({success: true})
                });
        });
});

module.exports = router;