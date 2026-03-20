let { productModel} = require("../models/product.model");
const mongoose = require("mongoose");

function handleError(fName,res,error){
        console.error(`${fName} Error : `,error);
        return res.status(500).send({
            status:false,
            message:error.message
        })
}

async function createProduct(req,res){
    let {} =  req.body;
    try {
        let result = await productModel.create({

        });
        return res.status(201).send({
            status:true,
            message:"Product created",
            data:result
        })
    } catch (error) {
        return handleError("createProduct",res,error);
    }
}

async function getProduct(req,res){
    let {id} =  req.body;
    if(!id || !mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).send({
            status:false,
            message:"Invalid or missing Id"
        })
    }
    try {
        let result = await productModel.findOne({_id:id});

        if (!result) {
          return res.status(404).send({
            status: false,
            message: "Product not found",
          });
        }

        return res.status(200).send({
            status:true,
            message:"Product fetched",
            data:result
        })
    } catch (error) {
        return handleError("getProduct",res,error);
    }
}

async function getAllProduct(req,res){
    try {
        let result = await productModel.find({});
        return res.status(200).send({
            status:true,
            message:"All Product fetched",
            data:result
        })
    } catch (error) {
        return handleError("getAllProduct",res,error);
    }
}

async function updateProduct(req,res){
    let {id,data} =  req.body;
    if(!id || !mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).send({
            status:false,
            message:"Invalid or missing Id"
        })
    }
    try {
        let result = await productModel.updateOne(
            {_id:id},
            {$set:data}
        );

        if (result.matchedCount === 0) {
          return res.status(404).send({
            status: false,
            message: "Product not found",
          });
        }

        return res.status(200).send({
            status:true,
            message:"Product updated",
            data:result
        })
    } catch (error) {
        return handleError("updateProduct",res,error);
    }
}

async function deleteProduct(req,res){
    let {id} =  req.body;
    if(!id || !mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).send({
            status:false,
            message:"Invalid or missing Id"
        })
    }
    try {
        let result = await productModel.deleteOne({_id:id});

        if (result.deletedCount === 0) {
          return res.status(404).send({
            status: false,
            message: "Product not found",
          });
        }

        return res.status(200).send({
            status:true,
            message:"Product deleted",
            data:result
        })
    } catch (error) {
        return handleError("deleteProduct",res,error);
    }
}

async function deleteAllProduct(req,res){
    try {
        let result = await productModel.deleteMany({});
        return res.status(200).send({
            status:true,
            message:"All Product deleted",
            data:result
        })
    } catch (error) {
        return handleError("deleteAllProduct",res,error);
    }
}