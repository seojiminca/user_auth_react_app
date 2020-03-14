const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');

const userSchema = new mongoose.Schema(
    {
        method: {
            type: String,
            enum: ['local', 'google', 'facebook'],
            required: true
        },

        local: {
            name: {
                type: String,
                required: true
            },
            email: {
                type: String,
                lowercase: true,
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
        //없는 경우를 대비해서 required 사용안한다.
        google: {
            id: {
                type: String
            },
            name: {
                type: String
            },
            email: {
                type: String,
                lowercase: true
            },
            avatar: {
                type: String
            }
        },
        facebook:{
            id: {
                type: String
            },
            name: {
                type: String
            },
            email: {
                type: String,
                lowercase: true
            },
            avatar: {
                type: String
            }
        }
    },
    {
        timestamps: true //데이터가 생성될때마다 날짜, 시간이 찍힌다.
    }
);
        //pre: save를 하기 전 실행되는 함수
userSchema.pre("save", async function (next) { //async, await 같이 사용.
   try{
       // avatar이미지 생성,
       console.log('entered');

       //소셜로그인은 아바타나 비번 암호화에서 제외시킨다.
       if(this.method !== 'local'){
           next();
       }

       const avatar = await gravatar.url(this.email, { //아바타를 username 기반으로 생성
           s: '200',
           r: 'pg',
           d: 'mm'
       });

       this.avatar = avatar;

       //password암호화.
       const salt = await bcrypt.genSalt(10);
       const passwordHash = await bcrypt.hash(this.password, salt);

       this.password = passwordHash;
       console.log('exited');
       next(); // 그 다음 동작을 위해

   }
   catch(error){ //save전 try에서 에러가 발생하면 next에 error를 담아서 내보낸다.
       next(error);
   }
});




module.exports = mongoose.model("user", userSchema);