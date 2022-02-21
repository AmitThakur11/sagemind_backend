const { Router } = require("express");
const {addQuiz, addQuestion, saveUserQuizData,getUserQuizData,getUserResponse} = require("../controller/quizData")
const route = require('express').Router()


route.post("/add",addQuiz);
route.post("/:quizId/question/add",addQuestion);
route.post("/:quizId/result/save",saveUserQuizData)
route.post("/result/all",getUserQuizData)
route.get("/results",getUserResponse)

module.exports = route