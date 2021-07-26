const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const saltRounds = 10;

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
});

// 화살표함수 쓰면 안 된다. 
userSchema.pre('save', function(next){
    let user = this;

    if(user.isModified('password')){
        // encrypt password
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if(err) return next(err);
            bcrypt.hash(user.password, salt, (err, hash) => {
                if(err) return next(err);
                user.password = hash;
                next();
            });
        });
    }
    else next();
})

// method를 할당하는 경우 화살표함수 쓰면 this가 undefined임: 화살표함수의 this는 언제나 상위 scope의 this를 가리킴
userSchema.methods.comparePassword = function(plainPassword, callback){
    bcrypt.compare(plainPassword, this.password, (err, isMatch) => { // compare user input & DB data
        if(err) return callback(err);
        callback(null, isMatch);
    })
};
// 화살표함수 쓰면 this가 undefined임
userSchema.methods.generateToken = function(callback) { // (err, user)
    let user = this;

    // create token using jsonwebtoken
    let token = jwt.sign(user._id.toHexString(), 'secretToken')

    user.token = token;
    user.save((err, doc) => {
        if(err) return callback(err);
        callback(null, user);
    })
    
}

const User = mongoose.model('User', userSchema);

module.exports = {User};