const jwt=require('jsonwebtoken');
const User=require('../models/User');
const ErrorResponse=require('../utils/errorResponse');

exports.protect=async(req,res,next)=>{
    let token;
    if(req.headers.authorization && req.header.authorization.startWith("Bearer")){
        token=req.headers.authorization.split(" ")[1]
    };
    if(!token){
        return next(new ErrorResponse("Not authorizd to access this route",401));
    };

    try {
        const decoded=jwt.verify(token, process.env.JWT_SECRET);

        const user=await User.findById(decoded.id);

        if(!user){
            return next(new ErrorResponse("NO user found with thsi id",404));
        }

        req.user=user;

        next();
    } catch (error) {
        return next(new ErrorResponse("Not authorized to access this route",401));
    }
};