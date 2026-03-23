let { userModel} = require("../models/user.model");
let {makeToken, blacklistToken} = require("../services/jwt");
let bcrypt = require("bcrypt")

function handleError(fName,res,error){
        console.error(`${fName} Error : `,error);
        return res.status(500).send({
            status:false,
            message:error.message
        })
}

async function createUser(req,res){

    let {userName,email,password} = req.body;

    if(!userName || !email || !password){
        return res.status(500).send({
            status:false,
            message:"Field is Missing"
        });
    }

    let hashPassword = await bcrypt.hash(password,8)
    

    try {
        let result = await userModel.create({
            userName,
            email,
            password:hashPassword
        });


        return res.status(201).send({
            status:true,
            message:"User created",
            data:{
                id:result._id,
                userName:result.userName,
                email:result.email
            }
        })
    } catch (error) {
        handleError("createUser",res,error);
    }
}

async function getUser(req,res){
    let {id} = req.params;
    if(!id){
         return res.status(500).send({
            status:false,
            message:"Id is Missing"
        });
    }
    try {
        let result = await userModel.findOne({
            _id:id
        });

        if (!result) {
          return res.status(404).send({
            status: false,
            message: "User not found",
          });
        }

        return res.status(200).send({
            status:true,
            message:"User fetched",
            data:{
                "userName": result.userName,
                "email": result.email
            }
        })
    } catch (error) {
        handleError("getUser",res,error);
    }
}

async function getAllUser(req,res){
    try {
        let result = await userModel.find({});

        return res.status(200).send({
            status:true,
            message:"All User fetched",
            data:result
        })
    } catch (error) {
        handleError("getAllUser",res,error);
    }
}

async function updateUser(req,res){
    let {id,userName,email,password} = req.body;

    if(!id){
         return res.status(500).send({
            status:false,
            message:"Id is Missing"
        });
    }

    try {
        let result = await userModel.updateOne({
            _id:req.id,
            $set:{
                userName,
                email,
                password
            }
        });

        if (result.matchedCount === 0) {
          return res.status(404).send({
            status: false,
            message: "User not found",
          });
        }

        return res.status(200).send({
            status:true,
            message:"User updated",
            data:result
        })
    } catch (error) {
        handleError("updateUser",res,error);
    }
}

async function deleteUser(req,res){
    let {id} = req.body;
    if(!id){
         return res.status(500).send({
            status:false,
            message:"Id is Missing"
        });
    }

    try {
        let result = await userModel.deleteOne({
            _id:id
        });

        if (result.deletedCount === 0) {
          return res.status(404).send({
            status: false,
            message: "User not found",
          });
        }

        return res.status(200).send({
            status:true,
            message:"User deleted",
            data:result
        })
    } catch (error) {
        handleError("deleteUser",res,error);
    }
}

async function login(req,res){
    let {email,password} = req.body;

    if(!email || !password){
        return res.status(500).send({
            status:false,
            message:"Field is Missing"
        });
    }

    try {
        let user = await userModel.findOne({
            email:email
        });
        
        if(!user){
            return res.send({
                status:false,
                message:"User not Found"
            })
        }

        let isMatch = await bcrypt.compare(password,user?.password);
        if(!isMatch){
            return res.send({
                status:false,
                message:"Password is incorrect"
            })
        }

        //Make Token
        let token = makeToken(user)

        //Token Set inside Cookie / Header
        // res.cookie("Token",token)
        res.setHeader("Authorization", `Bearer ${token}`);

        return res.status(201).send({
            status:true,
            message:"User Login",
            data:token
        })
    } catch (error) {
        handleError("createUser",res,error);
    }
}

async function logout(req,res){
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(400).send({
                status:false,
                message:"Authorization header missing"
            });
        }

        const [type, token] = authHeader.split(" ");
        if (type !== "Bearer" || !token) {
            return res.status(400).send({
                status:false,
                message:"Invalid authorization format"
            });
        }

        blacklistToken(token);

        // If you had cookies: res.clearCookie("Token");

        return res.status(200).send({
            status:true,
            message:"User logged out successfully"
        });
    } catch (error) {
        handleError("logout",res,error);
    }
}

module.exports = {
    createUser,getUser,getAllUser,updateUser,deleteUser,login,logout
}