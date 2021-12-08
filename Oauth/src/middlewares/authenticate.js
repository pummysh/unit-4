const jwt=require("jsonwebtoken");
require("dotenv").config()
const verifyToken =(token) => {
    return jwt.verify(token,process.env.JWT_ACCESS_KEY);
}
module.exports =(req, res, next) => {
   try{
    const bearerToken=req?.headers?.authorization

    if(!bearerToken || !bearerToken.startsWith('Bearer ')){
        return res.status(400).json({ message: "Please provide a valid bearer token", status: "Failed" })
    }

    const token =bearerToken.split(' ')[1];

    const user=verifyToken(token);

    if(!user){
        return res.status(400).json({ message: "Please provide a valid bearer token", status: "Failed" });
    }

    req.user=user;

    return next();
   }catch(e){
    return res.status(500).json({ message: e.message, status: "Failed" });
   }

}