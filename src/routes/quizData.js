const {addQuiz, addQuestion, saveUserQuizData} = require("../controller/quizData")
const route = require('express').Router()


route.post("/add",addQuiz);
route.post("/:quizId/question/add",addQuestion);
route.post("/:quizId/result/save",saveUserQuizData)

module.exports = route