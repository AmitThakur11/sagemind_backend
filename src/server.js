const express = require('express');
const cors = require('cors')
const {quizes}= require("./quizData")
const dbConnect = require("./dbConnect")
const verifyUser = require("./middleware/tokenVerify")
const authRoute = require("./routes/auth")
const quizDataRoute = require("./routes/quizData");
const { getQuiz } = require('./controller/quizData');
const app = express();


const corsOptions ={
    origin:'*', 
    credentials:true,        
    optionSuccessStatus:200,
 }

app.use(cors(corsOptions));
app.use(express.json())

require("dotenv").config({
    path : "./data.env"
})

dbConnect();
app.get("/",(req,res)=>{
    res.status(200).send("working")
})
const port = process.env.PORT || 5000

app.get("/quiz",getQuiz)

app.use("/auth", authRoute);
app.use(verifyUser)
app.use("/quiz",quizDataRoute)
app.use(verifyUser)



app.listen(port,()=>console.log("server running"))