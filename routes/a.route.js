let express = require("express");
let Router  =  express.Router();

Router.post("/");
Router.get("/:id");
Router.get("/");
Router.patch("/");
Router.delete("/");

module.exports = {
    Router
}