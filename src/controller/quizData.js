const { User } = require("../models/auth");
const {QuizData,Result} = require("../models/quizData");





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


const addQuestion = async(req,res)=>{
    try{
        const {quizId}  = req.params ;
        const {question, points ,options} = req.body;
        let  getQuiz = await QuizData.findById(quizId);
        await getQuiz.quiz.push({question,points,options})
        await getQuiz.save((err,docs)=>{
            if(err) throw err
            return res.status(200).json({success : true, msg : "Question upload",docs})
        })
    }catch(err){
     res.status(400).json({success: false , msg : err.message})
 
    }
 }

 const saveUserQuizData = async(req,res)=>{
     try{

        const {result} = req.body;
        const {quizId} = req.params;
        const admin = req.admin
        const  quiz = await QuizData.findById(quizId);

        let  user = await User.findById(admin._id);
        if(!quiz){
            return res.status(400).json({success: false , msg : "Invalid quiz"})
        }
        let newResult = new Result({author : admin._id,quizId,result});
        await newResult.save();
        user.quizResults.push(newResult._id);
        await user.save();
        res.status(400).json({success: true , msg : "Result saved", data : newResult})

     }catch(err){
        res.status(400).json({success: false , msg : err.message})
     }

 }


module.exports = {addQuiz,addQuestion,saveUserQuizData}