const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const userModel = require('../model/user');
const jwt = require('jsonwebtoken');

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
                       "secret",
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