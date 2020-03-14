//passport를 이용해서 json web token인증해주는 함수
const passport = require('passport');
const {Strategy,ExtractJwt} = require('passport-jwt'); //JWT를 생성하고 푸는 두개의 함수.
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const FacebookTokenStrategy = require('passport-facebook-token');
const userModel = require('../model/user');


const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET;

module.exports = passport => {
    passport.use(
        new Strategy(opts, (payload, done) => {
            userModel
                .findById(payload.id)
                .then(user => {
                    if(user){
                        return done(null, user);
                    }
                    return done(null, false);
                })
                .catch(err => {
                    console.log(err)
                });
        })
    )
}

passport.use('googleToken', new GooglePlusTokenStrategy({
    clientID: process.env.GOOGLE_CLIENTID,
    clientSecret: process.env.GOOGLE_CLIENTSECRET
}, async (accessToken, refreshToken, profile, cb) => {
    console.log("accessToken", accessToken)
    console.log("refreshToken", refreshToken)
    console.log("profile", profile)
}));

passport.use('facebookToken', new FacebookTokenStrategy({
    clientID: process.env.FACEBOOK_CLIENTID,
    clientSecret: process.env.FACEBOOK_CLIENTSECRET
}, async (accessToken, refreshToken, profile, cb) => {
    // console.log("accessToken", accessToken)
    // console.log("refreshToken", refreshToken)
    // console.log("profile", profile)
    try{

        const existingUser = await userModel.findOne({"facebook.id": profile.id});

        //facebook으로 가입한 유저가 있으면.
        if(existingUser){
            return cb(null, existingUser);
        }
        const newUser = new userModel({
            method: 'facebook',
            facebook: {
                //log를 찍어서 나온 결과(profile)를 바탕으로 생성.
                id: profile.id,
                name: profile.name.givenName,
                email: profile.emails[0].value, //배열로 나오니까 []
                avatar: profile.photos[0].value
            }
        });

        await newUser.save();
        cb(null, newUser);

    }catch(err){
        cb(err, false, err.message);
    }
}));


