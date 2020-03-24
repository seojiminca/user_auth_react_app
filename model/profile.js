const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema(
    {
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true
        },
        language: {
            type: String,
            required: true
        },
        nationality: {
            type: String,
            required: true
        },
        gender: {
            type: Boolean
        },
        age: {
            type: Number
        },
        introduce:{
            type: String
        }
    },
    {
        timestamps: true
    }

);

module.exports = mongoose.model("profile", profileSchema);