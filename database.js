const mongoose = require('mongoose');

// DB connect
mongoose.connect(process.env.MONGOURL, {useNewUrlParser: true, useUnifiedTopology: true}) //option 넣는
    .then(() => console.log('MongoDB Connected ... '))
    .catch(err => console.log(err));