const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
    {
        profile:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'profile',
            //required: true
        },
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true
        },
        startDate: {
            type: String
        },
        endDate: {
            type: String
        },
        startTime: {
            type: String
        },
        endTime: {
            type: String
        },
        photo: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("post", postSchema);