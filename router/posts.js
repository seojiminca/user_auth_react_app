const express = require('express');
const router = express.Router();
const postModel = require('../model/posts');
const profileModel = require('../model/profiles');
const passport = require('passport');
const multer = require('multer');

const checkAuth = passport.authenticate('jwt', {session: false});

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, './uploads/');
//     },
//     filename: function (req, file, cb) {
//         cb(null, new Date().toISOString() + file.originalname);
//     }
// });
//
// const fileFilter = (req, file, cb) => {
//     if(file.mimeType === 'image/jpeg' || file.mimeType === 'image/png'){
//         cb(null, true);
//     }else {         //reject a file
//         cb(null, false);
//     }
// }
//
// const upload = multer({
//     storage: storage,
//     limits: {
//         fileSize: 1024 * 1024 * 5
//     },
//     fileFilter: fileFilter
// });


//@route POST http://localhost:5000/posts
//@desc post등록
//@Access private
router.post('/', checkAuth, upload.single('photo'), (req, res) => {
    //user 는 checkAuth로 가지고온다.
    //const{startDate, endDate, startTime, endTime} = req.body;


    profileModel
        //.findById(req.user.id) - Profile Id
        .findOne({user: req.user.id}) //token으로 체크해야되니까 user Id 를 검사.
        .exec()
        .then(profile => {

            console.log(user)

            // if(!profile){
            //     return res.json({
            //         post: "profile is needed"
            //     });
            // }

            const newPost = new postModel({
                profile: profile._id, //검색된 프로필에서 id
                user: req.user.id, //Token에서 받아오는 user id
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                startTime: req.body.startTime,
                endTime: req.body.endTime,
                photo: req.file.path
            });

           console.log(newPost)

            newPost
                .save()
                .then(post => {

                    res.json({
                        msg: "new post added",
                        postInfo: post
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
})

//@route GET http://localhost:5000/posts
//@desc 전체post 조회
//@Access public



//@route GET http://localhost:5000/posts
//@desc 특정post 조회
//@Access public


//@route PATCH http://localhost:5000/posts
//@desc post 수정
//@Access private



//post삭제
//@Access private









module.exports = router;