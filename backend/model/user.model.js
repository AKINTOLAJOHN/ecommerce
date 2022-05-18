const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
let userSchema = mongoose.Schema({
    email:String,
    password2:String
})

let saltRound = 10;
userSchema.pre('save', function(next){
    const document = this;
    bcrypt.hash(document.password2, saltRound, (err, hashedPassword)=>{
        if(!err){
            document.password2 = hashedPassword;
            next();
        }else{
            console.log(err)
        }
    })
})



let userModel = mongoose.model('users_tb',userSchema)
module.exports = userModel;