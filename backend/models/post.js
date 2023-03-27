// title ==> String
// body ==> String
// device ==> String
// no_of_comments ==> Number

// ==> Where device is the one from which the post has been made, it can be "Laptop", "Tablet", "Mobile"

const mongoose = require("mongoose")

const postScehma = mongoose.Schema({
title:{type:String,required:true},
body:{type:String,required:true},
device:{type:String,required:true,enum:["mobile","laptop","tablet"]},
no_of_comments:{type:Number,required:true},
user:{type:String,required:true}
})


const PostModel =  mongoose.model("post",postScehma)

module.exports={
    PostModel
}