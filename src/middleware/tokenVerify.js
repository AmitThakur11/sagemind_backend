const jwt = require('jsonwebtoken')
const {User} = require("../models/auth")

const verifyUser = async(req,res,next)=>{

    try{
    const token = req.headers.authorization;
    const verify = await jwt.verify(token,process.env.JWT_SECRET_KEY);
    const admin = await User.findById(verify._id);
    if(!admin){
        return res.status(400).json({
            success :false ,
            msg : "User not found"
        })
    }
    req.admin = admin
    next()

    }catch(err){
        res.status(400).json({
            success :false ,
            msg : err.message
        })

    }
}

module.exports = verifyUser