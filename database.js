const mongoose = require('mongoose');

// DB connect
mongoose.connect(process.env.MONGOURL || "mongodb+srv://jimin:1111@cluster0-tdr02.mongodb.net/test?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}) //option 넣는
    .then(() => console.log('MongoDB Connected ... '))
    .catch(err => console.log(err));