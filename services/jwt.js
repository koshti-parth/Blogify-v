let jwt = require("jsonwebtoken");
let SECRET_KEY = "parth6359717897";

// In-memory blacklist for logout tokens (demo only).
// For production use Redis/DB with expiration for horizontal scaling.
let blacklistedTokens = new Set();

function makeToken(user){
    return jwt.sign({
        id:user._id,
        email:user.email
    },SECRET_KEY, { expiresIn: '12h' }); // optional expiry
}

function verifyToken(token){
    let user = jwt.verify(token,SECRET_KEY);
    if(!user){
        return null;
    }
    return user;
}

function blacklistToken(token){
    blacklistedTokens.add(token);
}

function isTokenBlacklisted(token){
    return blacklistedTokens.has(token);
}

module.exports = {makeToken,verifyToken,blacklistToken,isTokenBlacklisted}