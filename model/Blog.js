const mongoose = require("mongoose")
const Schema = mongoose.Schema

const slugify = require("slugify")

const Blog = new Schema({
    baslik:{
        required:[true,"Nickname Girilmedi"],
        type:String,
        minLength:6
    },
    slugify:{
        type:String,
        default:function(){
            return slugify(this.baslik,{replacement:"-",lower:true})
        }
    },
    aciklama:{
        type:String,
        required:[true,"Email Alanı Doldurulmak Zorunda"],
        unique:[true,"Email Alanı Benzersiz Olmak Zorunda"]
    },
    like:{
        type:String,
        required:[true,"İsim Alanı Doldurulmak Zorunda"]
    }
})

Blog.statics.createBlog = async (blog)=>{
    const newBlog = new this(blog)
    try{
        return await newBlog.save()
    }catch(err){
        return err
    }
}

Blog.statics.deleteBlog = async (blogId)=>{
    try{
        return await this.findOneAndRemove(blogId)
    }catch(err){
        return err
    }
}

Blog.statics.updateBlog = async (blog)=>{
    try{
        const { _id , baslik  , aciklama } = blog
        return await this.findByIdAndUpdate(_id,{
            $set:{
                baslik,ackilama,slugify:slugify(aciklama,{replacement:"-",lower:true})
            }
        })
    }catch(err){
        return err
    }
}

module.exports = mongoose.model("Blog",Blog)