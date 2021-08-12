const express = require("express")
const app = express()
const dotenv = require('dotenv').config()
const mongoose = require("mongoose")

const userRoute = require("./routes/user.js")
const blogRoute = require("./routes/blog.js")

mongoose.connect("mongodb+srv://vututu:123321@cluster0.hwkl2.mongodb.net/vutututu?retryWrites=true&w=majority", { useNewUrlParser: true })
    .then(data=>{
        console.log("Db Connect Success")
    }).catch(err=>{
        console.log(err)
    })

app.use(express.json())

app.use("/api/user/",userRoute)
app.use("/api/blog/",blogRoute)


app.listen(process.env.PORT,()=>console.log("Server Started"))