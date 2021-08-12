const mongoose = require("mongoose")
const Schema = mongoose.Schema

const User = new Schema({
    nickname:{
        required:[true,"Nickname Girilmedi"],
        type:String,
        minLength:6,
        maxLength:10,
        unique:[true,"Nickname Benzersiz Olmak Zorunda"]
    },
    email:{
        type:String,
        required:[true,"Email Alanı Doldurulmak Zorunda"],
        unique:[true,"Email Alanı Benzersiz Olmak Zorunda"]
    },
    name:{
        type:String,
        required:[true,"İsim Alanı Doldurulmak Zorunda"]
    }
})


User.statics.createUser = async (user)=>{
    const newUser = new this(user)
    try{
        return await newUser.save()
    }catch(err){
        return err
    }
}

User.statics.deleteUser = async (userId)=>{
    try{
        return await this.findByIdAndRemove(userId)
    }catch(err){
        return err
    }
}

User.statics.updateUser = async (user) => {
    try{
        const { _id , nickname , email , name } = user
        return await this.findByIdAndUpdate(_id,{
            $set:{
                nickname,email,name
            }
        })
    }catch(err){
        return err
    }
}

module.exports = mongoose.model("User",User)