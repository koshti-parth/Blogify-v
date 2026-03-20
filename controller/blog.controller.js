let { blogModel} = require("../models/blog.model");
const mongoose = require("mongoose");

function handleError(fName,res,error){
        console.error(`${fName} Error : `,error);
        return res.status(500).send({
            status:false,
            message:error.message
        })
}

async function createBlog(req,res){
    let {title,content,coverImage} =  req.body;

    if(!title || !content  || !coverImage){
        return res.status(400).send({
            status:false,
            message:"Field is missing"
        })
    }

    try {
        let result = await blogModel.create({
            title,content,userId:req.user.id,coverImage
        });
        return res.status(201).send({
            status:true,
            message:"Blog created",
            data:result
        })
    } catch (error) {
        return handleError("createBlog",res,error);
    }
}

async function getBlog(req,res){
    let {id} =  req.params;
    if(!id || !mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).send({
            status:false,
            message:"Invalid or missing Id"
        })
    }
    try {
        let result = await blogModel.findOne({_id:id,userId:req.user.id});

        if (!result) {
          return res.status(404).send({
            status: false,
            message: "Blog not found",
          });
        }

        return res.status(200).send({
            status:true,
            message:"Blog fetched",
            data:result
        })
    } catch (error) {
        return handleError("getBlog",res,error);
    }
}

async function getAllBlog(req,res){
    try {
        let result = await blogModel.find({userId:req.user.id});
        return res.status(200).send({
            status:true,
            message:"All Blog fetched",
            data:result
        })
    } catch (error) {
        return handleError("getAllBlog",res,error);
    }
}

async function updateBlog(req,res){
    let {id} =  req.params;
    let {title,content,author,coverImage} =  req.body;
    if(!id || !mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).send({
            status:false,
            message:"Invalid or missing Id"
        })
    }
    try {
        let result = await blogModel.updateOne(
            {_id:id,userId:req.user.id},
            {$set:{
                title,content,author,coverImage
            }}
        );

        if (result.matchedCount === 0) {
          return res.status(404).send({
            status: false,
            message: "Blog not found",
          });
        }

        return res.status(200).send({
            status:true,
            message:"Blog updated",
            data:result
        })
    } catch (error) {
        return handleError("updateBlog",res,error);
    }
}

async function deleteBlog(req,res){
    let {id} =  req.params;
    if(!id || !mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).send({
            status:false,
            message:"Invalid or missing Id"
        })
    }
    try {
        let result = await blogModel.deleteOne({_id:id,userId:req.user.id});

        if (result.deletedCount === 0) {
          return res.status(404).send({
            status: false,
            message: "Blog not found",
          });
        }

        return res.status(200).send({
            status:true,
            message:"Blog deleted",
            data:result
        })
    } catch (error) {
        return handleError("deleteBlog",res,error);
    }
}

async function deleteAllBlog(req,res){
    try {
        let result = await blogModel.deleteMany({userId:req.user.id});
        return res.status(200).send({
            status:true,
            message:"All Blog deleted",
            data:result
        })
    } catch (error) {
        return handleError("deleteAllBlog",res,error);
    }
}

module.exports = {
    createBlog,getBlog,getAllBlog,updateBlog,deleteBlog,deleteAllBlog
}