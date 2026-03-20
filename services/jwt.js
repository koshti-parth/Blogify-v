let jwt = require("jsonwebtoken");
let SECRET_KEY = "parth6359717897";

function makeToken(user){
    return jwt.sign({
        id:user._id,
        email:user.email
    },SECRET_KEY);
}

function verifyToken(token){
    let user = jwt.verify(token,SECRET_KEY);
    if(!user){
        return null;
    }
    return user;
}
module.exports = {makeToken,verifyToken}