let express     = require("express");
let userRouter  =  express.Router();
let {createUser,getUser,getAllUser,updateUser,deleteUser,login} = require("../controller/user.controller");
let {userMiddleware} = require("../middlewares/user.middleware");


// userRouter.post("/createUser",createUser);
userRouter.get("/user/:id",userMiddleware,getUser);
userRouter.get("/users",userMiddleware,getAllUser);
userRouter.patch("/user",userMiddleware,updateUser);
userRouter.delete("/user",userMiddleware,deleteUser);

//Auth
userRouter.post("/signup",createUser);
userRouter.post("/login",login);

module.exports = {
    userRouter
}