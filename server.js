//module 로드
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const passport = require('passport');
const path = require('path');

const userRouter = require("./router/users");
const profileRouter = require("./router/profiles");
const adminRouter = require("./router/admin");
const postRouter = require("./router/posts");

require("./database.js");

//middleware 설정 파트
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(passport.initialize());
app.use('/uploads/', express.static('uploads'));

require('./config/passport')(passport);

// route
app.use('/users', userRouter);
app.use('/profiles', profileRouter);
app.use('/admin', adminRouter);
app.use('/posts', postRouter);

if(process.env.NODE_ENV || "production" === 'production'){
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    })
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`)); // ``로 자바스크립트 불러오기