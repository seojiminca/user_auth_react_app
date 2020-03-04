const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

// DB connect
const db = 'mongodb+srv://jimin:1111@cluster0-tdr02.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true}) //option 넣는
    .then(() => console.log('MongoDB Connected ... '))
    .catch(err => console.log(err));


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


const port = 5000;

app.listen(port, () => console.log(`Server running on port ${port}`)); // ``로 자바스크립트 불러오