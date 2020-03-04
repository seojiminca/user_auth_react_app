const express = require('express');
const router = express.Router();
const userModel = require('../model/user');

//api마다 설명
//@route POST http://localhost:5000/user/signup
//@desc signup user route
//@access Public - 이 api로 누구나 접근가

router.post('/signup', (req,res) => {
    const {username, email, password } = req.body; //avatar, id 자동생성.

    userModel
        .findOne({email})
        .exec()
        .then(user => {
            if(user){
                return res.json({
                    email: "email already exists"
                });
            }
            //else 삭제
            const newUser = new userModel({
               username, email, password
            });

            newUser
                .save()
                .then(user => {
                    res.json({
                       msg: "Successful newuser",
                       userInfo: user
                    });
                })
                .catch(err => {
                   res.json({
                      error: err
                   });
                });

        })
        .catch(err => {
           res.json({
              error: err
           });
        });
});

//@route POST http://localhost:5000/user/login
//@desc login user route
//@access Public

router.post('/login', (req, res) => {
   res.json({
      msg: 'user login'
   });
});



//현재접속 유저 정보
//@route GET http://localhost:5000/user/current
//@desc current user info
//@Access Private

router.get('/current', (req, res) => {
   res.json({
      msg: 'current user'
   });
});



module.exports = router;