const { User } = require("../models/auth");
const {QuizData,Result} = require("../models/quizData");
const {rules} = require("../quizData.js")


const getQuiz = async(req,res)=>{
    try{

        const quiz = await QuizData.find();
        res.json({success: true , msg : "Quiz fetched", quizes : {quizData : quiz , rules : rules}})

    }catch(err){
    res.status(500).json({success: false , msg : err.message})

    }

}

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
        res.send({success : true , msg  : "new Quiz created" , data : docs})

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

 const getUserQuizData = async (req,res)=>{
     try{
         const admin = req.admin;
         const results = await Result.find({author : admin._id});


     }catch(err){
        res.status(500).json({success: false , msg : err.message})


     }
 }

 const saveUserQuizData = async(req,res)=>{
     try{

        const {result} = req.body;
        const {quizId} = req.params;
        const admin = req.admin
        const  quiz = await QuizData.findById(quizId);
        
        console.log(admin)
        let  user = await User.findById(admin._id);
        
        if(!quiz){
            return res.status(400).json({success: false , msg : "Invalid quiz"})
        }
        console.log(quiz)
        let newResult = new Result({author : admin._id,quiz : quizId,result : result});
        await newResult.save();
        user.quizResults.push(newResult._id);
    
        await user.save();
        
        res.status(200).json({success: true , msg : "Result saved"})

     }catch(err){
        res.status(500).json({success: false , msg : err.message})
     }

 }


 const getUserResponse = async(req,res)=>{
     try{
     const admin = req.admin;
     const findUserResult = await Result.find({author : admin._id}).populate({
         path : "quiz" , select : "quizName quizCover"}).select("quiz result");
     
     res.status(200).json(findUserResult)
     }
     catch(err){
        res.status(500).json({success: false , msg : err.message})
     }
     
 }


module.exports = {getQuiz,addQuiz,addQuestion,saveUserQuizData,getUserQuizData,getUserResponse}