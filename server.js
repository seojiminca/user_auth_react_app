//module 로드
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const passport = require('passport');

const userRouter = require("./router/user");
const profileRouter = require("./router/profile");
const adminRouter = require("./router/admin");

require("./database.js");

//middleware 설정 파트
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(passport.initialize());

require('./config/passport')(passport);

// route
app.use('/user', userRouter);
app.use('/profile', profileRouter);
app.use('/admin', adminRouter);

const port = process.env.PORT;

app.listen(port, () => console.log(`Server running on port ${port}`)); // ``로 자바스크립트 불러오기