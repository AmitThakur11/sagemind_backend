const express = require('express');
const cors = require('cors')
const {quizes}= require("./quizData")
const app = express();

app.use(cors());

app.get("/",(req,res)=>{
    res.status(200).send("working")
})
const port = process.env.PORT || 5000
app.get("/quiz",(req,res)=>{
    try{
        res.status(200).json({success : true , quizes : quizes})
    }catch{
        res.status(500).json({success : false})
    }
})

app.listen(port,()=>console.log("server running"))