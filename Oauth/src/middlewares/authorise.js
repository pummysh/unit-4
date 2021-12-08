// const user = require("../model/user");

module.exports=function(permittedRoles) {
    return function(req, res, next) {
        //get the user from the req
        user = req.user.user;

        //check permittedRoles
        isAllowed=false;
        user.roles.map((role)=> {
            if(permittedRoles.includes(role)){
                isAllowed=true;
            }});
        
        if(!isAllowed){
            return res.status(401).json({
                status: 'failed',
                message: 'You are not allowed to access this',
            })
        }
        
        next();
    }
}