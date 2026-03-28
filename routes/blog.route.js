let express = require("express");
let blogRouter  = express.Router();
let {createBlog,getBlog,getAllBlog,updateBlog,deleteBlog,deleteAllBlog} = require("../controller/blog.controller")

blogRouter.post("/",createBlog);
blogRouter.get("/getAllBlog",getAllBlog);
blogRouter.get("/:id",getBlog);
blogRouter.patch("/:id",updateBlog);
blogRouter.delete("/deleteAllBlog",deleteAllBlog);
blogRouter.delete("/:id",deleteBlog);

module.exports = {
    blogRouter
}