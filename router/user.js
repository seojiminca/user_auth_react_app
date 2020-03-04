const express = require('express');
const router = express.Router();

//api마다 설명
//@route POST http://localhost:5000/user/signup
//@desc signup user route
//@access Public - 이 api로 누구나 접근가

router.post('/signup', (req,res) => {
    res.json({
       msg: 'User works'
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