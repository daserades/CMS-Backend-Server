const mongoose = require("mongoose")
const Schema = mongoose.Schema

const bcrypt = require("bcrypt")

const Password = new Schema({
    kullaniciId:mongoose.Types.ObjectId,
    password:String
})

Password.pre("save",async function(next){
    if(!this.password.isModified){
        next()
    }
    this.password = await bcrypt.hashSync(this.password, await bcrypt.genSaltSync(process.env.salt))
})

module.exports = mongoose.model("Password",Password)