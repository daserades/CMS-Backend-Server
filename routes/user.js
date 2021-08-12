const express = require("express")
const Router = express.Router()
const User = require("../model/User")
const Password = require("../model/Password")
const jwt = require("jsonwebtoken")


Router.get("users",async (req,res)=>{
    try{
        const response = await User.find({ })
        res.json(response)
    }catch(err){
        res.status(500).json(err)
    }
    
})

Router.get("user/:userId",async (req,res)=>{
    const userId = req.params.userId
    try{
        const response = await User.findById(userId)
        res.json(response)
    }catch(err){
        res.status(500).json(err)
    }
})

Router.post("register",async (req,res)=>{
    const { name , nickname , email , password } = req.body

    if(!name && !nickname && !email && !password){
        return {status:false,message:"Eksik Bilgi Girdiniz"}
    }
    const response = await User.createUser(req.body)
    const pass = new Password({kullaniciId:response._id,password})
    await pass.save()
    if(!response){
        return {status:false,message:"Bir Hata Meydana Geldi Daha Sonra Tekrar Deneyiniz"}
    }
    const accessToken = jwt.sign({name,nickname,email},process.env.accessTokenSecretKey)

    res.json({status:true,message:"Kayıt Başarılı",token:accessToken})
})


Router.post("login",async (req,res)=>{
    const { email , password } = req.body

    if( !email && !password ){
        return {status:false,message:"Eksik Bilgi Girdiniz"}
    }
    const user = await User.findOne({email})
    if(!user){
        return {status:false,message:"Mail Adresi Bulunamadı"}
    }
    
    const hashedPassword = await Password.findOne({kullaniciId:user._id})

    const match = await bcrypt.compare(password, hashedPassword.password)
    if(!match){
        return res.status(500).json({status:false,message:"Şifre Hatalı"})
    }

    const accessToken = jwt.sign({name:user.name,nickname:user.nickname,email:user.email},process.env.accessTokenSecretKey)

    res.json({status:true,message:"Giriş Başarılı",token:accessToken})
})


module.exports = Router