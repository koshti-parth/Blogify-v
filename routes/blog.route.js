let express = require("express");
let blogRouter  = express.Router();
let {createBlog,getBlog,getAllBlog,updateBlog,deleteBlog,deleteAllBlog} = require("../controller/blog.controller")

blogRouter.post("/",createBlog);
blogRouter.get("/:id",getBlog);
blogRouter.get("/",getAllBlog);
blogRouter.patch("/:id",updateBlog);
blogRouter.delete("/:id",deleteBlog);
blogRouter.delete("/",deleteAllBlog);

module.exports = {
    blogRouter
}