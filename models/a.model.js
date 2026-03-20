let mongoose = require("mongoose");

let Schema = new mongoose.Schema({

},{timestamps:true})

let Model = mongoose.model("a",Schema);

module.exports = {
    Model
}