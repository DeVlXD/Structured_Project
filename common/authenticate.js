const jwt = require("jsonwebtoken");

//Get auth token from jwt.
module.exports.getToken = (data) =>
  jwt.sign(data, process.env.SECRET_KEY, {
    expiresIn: "30 days"
  });

//Get temp auth token valid for 2hrs.
module.exports.getVerifyToken = (data) =>
  jwt.sign(data, process.env.SECRET_KEY, {
    expiresIn: "2h"
  });

//Verify auth token using jwt.
module.exports.verifyToken = (token) =>
  jwt.verify(token, process.env.SECRET_KEY);

//Verify auth using jti and _id using jwt.
module.exports.verify = () => async (req, res, next) => {
  try {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if(err){
                res.status(401);
                throw new Error("User is not authorized.");
            }
            req.user = decoded.user;
            next();
        });

        if(!token){
            res.status(401);
            throw new Error("User is not authorized or token is missing!");
        }
    }
  } catch (error) {
    console.error(error);
    const message =
      String(error.name).toLowerCase() == "error" ?
        error.message :
        "UNAUTHORIZED ACCESS";
    return res.error(401, message);
  }
};