const express = require("express")
const Router = express.Router()


Router.get("blogs",(req,res)=>{
    res.end("blogs")
})


module.exports = Router