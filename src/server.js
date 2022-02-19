const express = require('express');
const cors = require('cors')
const {quizes}= require("./quizData")
const dbConnect = require("./dbConnect")
const verifyUser = require("./middleware/tokenVerify")
const authRoute = require("./routes/auth")
const app = express();


app.use(cors());
app.use(express.json())

require("dotenv").config({
    path : "./data.env"
})

dbConnect();
app.get("/",(req,res)=>{
    res.status(200).send("working")
})
const port = process.env.PORT || 3002
app.get("/quiz",(req,res)=>{
    try{
        res.status(200).json({success : true , quizes : quizes})
    }catch{
        res.status(500).json({success : false})
    }
})

app.use("/auth", authRoute)
app.use(verifyUser)


app.listen(port,()=>console.log("server running"))