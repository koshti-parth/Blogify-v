let express = require("express");
let app     = express();
let PORT    = 8003;
let mongoose = require("mongoose");
let {userRouter}       = require("./routes/user.route");
let {blogRouter}   = require("./routes/blog.route");
let {userMiddleware} = require("./middlewares/user.middleware");
let cors = require("cors");

app.use(cors())
//Mongodb Connection
mongoose.connect("mongodb://localhost:27017/Blogify")
.then((val) => console.log("Db connected"))
.catch(err => console.error("DB connection Error"));


//Middleware
app.use(express.json());


//Routes
app.use("/api/user"    ,userRouter);
app.use("/api/blogs",userMiddleware,blogRouter)


app.listen(PORT,()=> console.log(`Server is running on PORT ${PORT}`));