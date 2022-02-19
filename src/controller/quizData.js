const QuizData = require("../models/quizData");





const addQuiz = async(req,res)=>{
   try{
    const {quizName ,quizCover} = req.body;
    const isDuplicate = await QuizData.findOne({quizName : quizName})
    if(isDuplicate){
        return res.status(400).json({success: false , msg : "Quiz already there"})
    }
    const newQuiz = await QuizData({ quizName , quizCover});
    console.log(newQuiz)
    await newQuiz.save((err,docs)=>{
        if(err) throw err
        res.send({success : false , msg  : "new Quiz created" , data : docs})

    })

   }catch(err){
    res.status(400).json({success: false , msg : err.message})

   }
}


module.exports = {addQuiz}