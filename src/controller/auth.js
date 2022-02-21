const {User}  = require("../models/auth");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

const register = async(req,res)=>{

   try{

    let {username ,email, password} = req.body;
    

    const alreadyExist = await User.findOne({email});
    if(alreadyExist){
        return res.status(400).json({success : false , msg  : "Account already exist"})
    }

    const salt = bcrypt.genSaltSync(10);
    password = bcrypt.hashSync(password, salt);

    const newUser = new User({username,email,password});
    newUser.save((err,docs)=>{
        if(err) throw err;
        const dataToSend = {username : docs.username , email : docs.email , displayPic : docs.displayPic}
        res.status(200).json({success : true ,  msg : "Registeration successfull" , data : dataToSend})

    })

   }catch(err){
       res.status(500).json({success : false , msg : err.message})
   }

   
   
   

}


const login = async(req,res)=>{
    var {email,password} = req.body;
    try{
        let isExist = await User.findOne({email});
        if(!isExist){
           return  res.status(400).json({success : false,msg : "User not found"})
        }

        const matchPassword = await bcrypt.compareSync(password,isExist.password);
        if(!matchPassword){
            return res.status(400).json({success : false,msg : "Incorrect password"})
        }

        const token = jwt.sign({_id : isExist._id}, process.env.JWT_SECRET_KEY);
        
        let userValue = {
            _id : isExist._id,
            username : isExist.username,
            email : isExist.email,
            
        }
        
        res.status(200).json({success : true, msg : "Login success", value : {user : userValue, token : token}})




    }catch(err){
        res.status(500).json({success : false,msg : err.message})
    }

}

module.exports = {register , login}