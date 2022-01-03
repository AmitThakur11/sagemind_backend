const express = require('express');
const cors = require('cors')
const quiz = require("./quizData")
const app = express();

app.use(cors());

app.get("/",(req,res)=>{
    res.status(200).send("working")
})

app.get("/quiz",(req,res)=>{
    try{
        res.status(200).json({success : true , data : quiz})
    }catch{
        res.status(500).json({success : false})
    }
})

app.listen(5000,()=>console.log("server running"))