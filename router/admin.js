const express = require('express');
const router = express.Router();
const userModel = require('../model/user');
const passport = require('passport');

const checkAuth = passport.authenticate('jwt', {session: false});

//@route GET http://localhost:5000/admin/user
//@desc get all users
//@access Private - admin만 접근가능
router.get('/user', checkAuth, (req, res) => {
   userModel
       .findById(req.user.id)
       .exec()
       .then(user => {
           if(user.role !== 'admin'){
               res.json({
                   error: 'It is not permitted'
               })
           }
           userModel
               .find()
               .then(docs => {
                   res.json({
                       count: docs.length,
                       userList: docs
                   })
               })
       })
       .catch(err => {
          res.json({
             error: err
          });
       });
});

module.exports = router;
