const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const passport = require('passport');

const userRouter = require("./router/user");

// DB connect

mongoose.connect(process.env.MONGOURL, {useNewUrlParser: true, useUnifiedTopology: true}) //option 넣는
    .then(() => console.log('MongoDB Connected ... '))
    .catch(err => console.log(err));


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(passport.initialize());

require('./config/passport')(passport);

// route
app.use('/user', userRouter);

const port = process.env.PORT;

app.listen(port, () => console.log(`Server running on port ${port}`)); // ``로 자바스크립트 불러오