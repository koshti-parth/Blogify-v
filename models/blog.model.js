let mongoose = require("mongoose");

let blogSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    
    title:{
        type:String,
        required:true
    },

    content:{
        type:String,
        required:true
    },

    coverImage:{
        type:String,
        required:true
    }

},{timestamps:true});

let blogModel = mongoose.model("blog",blogSchema);

module.exports = {
    blogModel
}