const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        avatar: {
            type: String //이미지여도 String. front영역
        },
        password: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true //데이터가 생성될때마다 날짜, 시간이 찍힌다.
    }
);

module.exports = mongoose.model("user", userSchema);