const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email : {
        type : String,
        required : true,
    },
});

userSchema.plugin(passportLocalMongoose);  // we use this as a plugin because it automatically username, hashing, salting and hased password ko implement kr deta hai 

module.exports = mongoose.model('User', userSchema);