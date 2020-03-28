const express = require('express');
const router = express.Router();
const userModel = require('../model/user');
const jwt = require('jsonwebtoken');
const passport = require('passport');

//config/passport 함수를 사용해서 JWT을 검증한다.
const checkAuth = passport.authenticate('jwt', {session: false});

function tokenGenerator(payload){ //token에 담길 내용만 보내기.
    const token = jwt.sign(
        payload,
        process.env.SECRET,
        {expiresIn: 36000});

    return "Bearer " + token
};


//@route POST http://localhost:5000/user/signup
//@desc signup user route
//@access Public - 이 api로 누구나 접근가능
router.post('/signup', (req,res) => {
    const {name, email, password } = req.body; //avatar, id 자동생성.

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
                    name: name,
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
       .findOne({"local.email": email})
       .exec()
       .then(user => {
           if(!user){
               return res.json({
                  msg: "email doesnt exist"
               });
           }
           // user 존재.
           console.log(user);

           user.comparePassword(password, (err, isMatch) => { //isMatch 는 true/false 라서 따로 true명시 안해도됨.
               //console.log("isMatch is ",isMatch)
               if(err) throw err;

               // JWT생성
              const payload = { id: user._id, name: user.local.name, avatar: user.local.avatar };

              res.status(200).json({
                  success: isMatch,
                  token: tokenGenerator(payload)
              });

               // jwt.sign(
               //     payload,
               //     process.env.SECRET,
               //     { expiresIn: 36000 },
               //     (err, token) => {
               //         res.json({
               //            success: true,
               //            tokenInfo: "Bearer " + token
               //         });
               //     }
               // );
           })
           // bcrypt.compare(password, user.local.password, (err, result) => {
           //     console.log(result);
           //     if(err){
           //         return res.json({
           //             msg: "password is not matched"
           //         });
           //     }else{
           //
           //         // JWT생성
           //        const payload = { id: user._id, name: user.name, avatar: user.avatar };
           //
           //         jwt.sign(
           //             payload,
           //             process.env.SECRET,
           //             { expiresIn: 36000 },
           //             (err, token) => {
           //                 res.json({
           //                    success: true,
           //                    tokenInfo: "Bearer " + token
           //                 });
           //             }
           //         );
           //     }
           // })
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

    res.status(200).json({
       success: true,
       token: tokenGenerator(payload)
    });

    // jwt.sign(
    //     payload, //payload바탕으로 생성.
    //     process.env.SECRET,
    //     {expiresIn: 36000},
    //     (err, token) => {
    //         res.json({
    //             success: true,
    //             token: "Bearer " + token
    //         });
    //     }
    // )

});

//@route GET http://localhost:5000/user/facebook
//@desc Facebook signup and login
//@Access Public
router.get('/facebook', passport.authenticate('facebookToken', {session: false}),(req,res) => {
    //db에 들어가는 user 내용.
    console.log(req.user)

    const payload = { id: req.user._id, name: req.user.facebook.name, avatar: req.user.facebook.avatar };

    //위 정보 바탕으로 리턴토큰생성

    res.status(200).json({
       success:  true,
        token: tokenGenerator(payload)
    });

    // jwt.sign(
    //     payload,
    //     process.env.SECRET,
    //     {expiresIn: 36000},
    //     (err, token) => {
    //         res.json({
    //             success: true,
    //             token: "Bearer " + token
    //         });
    //     }
   // )

});

//@route GET http://localhost:5000/user/naver
//@desc NAVER signup and login
//@Access Public
router.get('/naver', passport.authenticate('naverToken', {session: false}),(req,res) => {
    //db에 들어가는 user 내용.
    console.log(req.user)

    const payload = { id: req.user._id, name: req.user.naver.name, avatar: req.user.naver.avatar };

    //위 정보 바탕으로 리턴토큰생성
    res.status(200).json({
       success: true,
       token: tokenGenerator(payload)
    });

    // jwt.sign(
    //     payload,
    //     process.env.SECRET,
    //     {expiresIn: 36000},
    //     (err, token) => {
    //         res.json({
    //             success: true,
    //             token: "Bearer " + token
    //         });
    //     }
    // )
});

//@route GET http://localhost:5000/user/kakao
//@desc Kakao signup and login
//@Access Public
router.get('/kakao', passport.authenticate('kakaoToken', {session: false}),(req,res) => {
    //db에 들어가는 user 내용.
    console.log(req.user)

    const payload = { id: req.user._id, name: req.user.kakao.name, avatar: req.user.kakao.avatar };

    //위 정보 바탕으로 리턴토큰생성
    res.status(200).json({
       success: true,
       token: tokenGenerator(payload)
    });

    // jwt.sign(
    //     payload,
    //     process.env.SECRET,
    //     {expiresIn: 36000},
    //     (err, token) => {
    //         res.json({
    //             success: true,
    //             token: "Bearer " + token
    //         });
    //     }
    //)
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