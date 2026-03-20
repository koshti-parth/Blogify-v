let { verifyToken } = require("../services/jwt");

function userMiddleware(req, res, next) {
  try {
    // console.log("Req headers  :" ,req.headers)
    const authHeader = req.headers.authorization;

    // 1. check header
    if (!authHeader) {
      return res.status(401).json({
        status: false,
        message: "Authorization header missing"
      });
    }

    // 2. validate format
    // console.log("Authheader : ",authHeader)
    const [type, token] = authHeader.split(" ");

    if (type !== "Bearer" || !token) {
      return res.status(401).json({
        status: false,
        message: "Invalid token format"
      });
    }

    // 3. verify token
    let decoded = verifyToken(token);
    // console.log("Decode User : ",decoded);

    // 4. attach minimal user info
    req.user = {
      id: decoded.id,
      email: decoded.email
    };

    // console.log("User Middleware");
    next();
    
  } catch (error) {
    console.log("User Middleware Error : ", error);
    return res.send({
      status: false,
      message: "Token is missing",
    });
  }
}

module.exports = { userMiddleware };
