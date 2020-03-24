const {Strategy,ExtractJwt} = require('passport-jwt'); //JWT를 생성하고 푸는 두개의 함수.
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const FacebookTokenStrategy = require('passport-facebook-token');
const NaverTokenStrategy = require('passport-naver-token');
const KakaoTokenStrategy = require('passport-kakao-token');
const userModel = require('../model/user');

//passport를 이용해서 json web token 인증해주는 함수
const opts = {};
// header에 bearer스키마에 담겨온 토큰 해석할 것
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// 해당 복호화 방법사용
opts.secretOrKey = process.env.SECRET;

module.exports = passport => {
    //passport를 사용한다
    passport.use(
                            //복호화성공시 불러올 함수
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
    );


    //Facebook
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

    //Google
    passport.use('googleToken', new GooglePlusTokenStrategy({
        clientID: process.env.GOOGLE_CLIENTID,
        clientSecret: process.env.GOOGLE_CLIENTSECRET
    }, async (accessToken, refreshToken, profile, cb) => {
        // console.log("accessToken", accessToken)
        // console.log("refreshToken", refreshToken)
        console.log("profile", profile);

        try{
            //google사용자 확인
            const existingUser = await userModel.findOne({"google.id": profile.id});

            if(existingUser){
                return cb(null, existingUser);
            }

            const newUser = new userModel({
                method: 'google',
                google: {
                    id: profile.id,
                    name: profile.name.givenName,
                    email: profile.emails[0].value,
                    avatar: profile.photos[0].value
                }
            });

            await newUser.save();
            cb(null, newUser);

        }catch(err){
            cb(err, false, err.message);
        }
    }));

//Facebook
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

//Naver
    passport.use('naverToken', new NaverTokenStrategy({
        clientID: process.env.NAVER_CLIENTID,
        clientSecret: process.env.NAVER_CLIENTSECRET
    }, async (accessToken, refreshToken, profile, cb) => {
        //console.log("accessToken", accessToken)
        // console.log("refreshToken", refreshToken)
        // console.log("profile", profile)
        try{

            const existingUser = await userModel.findOne({"naver.id": profile.id});

            //naver로 가입한 유저가 있으면.
            if(existingUser){
                return cb(null, existingUser);
            }
            const newUser = new userModel({
                method: 'naver',
                naver: {
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

//Kakao
    passport.use('kakaoToken', new KakaoTokenStrategy({
        clientID: process.env.KAKAO_CLIENTID,
        clientSecret: process.env.KAKAO_CLIENTSECRET
    }, async (accessToken, refreshToken, profile, cb) => {
        //console.log("accessToken", accessToken)
        // console.log("refreshToken", refreshToken)
        // console.log("profile", profile)
        try{

            const existingUser = await userModel.findOne({"kakao.id": profile.id});

            //kakao로 가입한 유저가 있으면.
            if(existingUser){
                return cb(null, existingUser);
            }
            const newUser = new userModel({
                method: 'kakao',
                kakao: {
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
};




