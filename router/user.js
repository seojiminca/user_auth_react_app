const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const userModel = require('../model/user');
const jwt = require('jsonwebtoken');
const passport = require('passport');

//config/passport 함수를 사용해서 JWT을 검증한다.
const checkAuth = passport.authenticate('jwt', {session: false});


//api마다 설명
//@route POST http://localhost:5000/user/signup
//@desc signup user route
//@access Public - 이 api로 누구나 접근가

router.post('/signup', (req,res) => {
    const {username, email, password } = req.body; //avatar, id 자동생성.

    userModel
        .findOne({"local.email": email})
        .exec()
        .then(user => {
            if(user){
                return res.json({
                    email: "email already exists"
                });
            }
            //else 삭제
            const newUser = new userModel({
                method: 'local',
                local: {
                    username: username,
                    email: email,
                    password: password
                }
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
   const {email, password} = req.body;

   //email유무체크, password 매칭, 화면리턴 - jwt
   userModel
       .findOne({email})
       .exec()
       .then(user => {
           if(!user){
               return res.json({
                  msg: "email doesnt exist"
               });
           }
           // user 존재.
           console.log(user);
           bcrypt.compare(password, user.password, (err, result) => {
               console.log(result);
               if(err){
                   return res.json({
                       msg: "password is not matched"
                   });
               }else{
                   const payload = { id: user._id, name: user.username, avatar: user.avatar };

                   jwt.sign(
                       payload,
                       process.env.SECRET,
                       { expiresIn: 36000 },
                       (err, token) => {
                           res.json({
                              success: true,
                              tokenInfo: "Bearer " + token
                           });
                       }
                   );
               }
           })
       })
       .catch(err => {
          res.json({
             error: err
          });
       });

});

//@route GET http://localhost:5000/user/google
//@desc Google signup and login
//@Access Public
router.get('/google', passport.authenticate('googleToken', {session: false}),(req,res) => {
    console.log(req.user);

    //토큰에 담길 유저정보는 로컬, 소셜로그인 전부 통일.
    const payload = {id: req.user._id, name: req.user.google.name, avatar: req.user.google.avatar  }

    jwt.sign(
        payload, //payload바탕으로 생성.
        process.env.SECRET,
        {expiresIn: 36000},
        (err, token) => {
            res.json({
                success: true,
                token: "Bearer " + token
            });
        }
    )

});

//@route GET http://localhost:5000/user/facebook
//@desc Facebook signup and login
//@Access Public
router.get('/facebook', passport.authenticate('facebookToken', {session: false}),(req,res) => {
    //db에 들어가는 user 내용.
    console.log(req.user)

    const payload = { id: req.user._id, name: req.user.facebook.name, avatar: req.user.facebook.avatar };

    //위 정보 바탕으로 리턴토큰생성
    jwt.sign(
        payload,
        process.env.SECRET,
        {expiresIn: 36000},
        (err, token) => {
            res.json({
                success: true,
                token: "Bearer " + token
            });
        }
    )

});

//현재접속 유저 정보
//@route GET http://localhost:5000/user/current
//@desc current user info
//@Access Private

router.get('/current', checkAuth, (req, res) => {
   res.json({
        id: req.user._id,
       username: req.user.username,
       email: req.user.email
   });
});



module.exports = router;