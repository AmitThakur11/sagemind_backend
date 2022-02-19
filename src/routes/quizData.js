const {addQuiz} = require("../controller/quizData")
const route = require('express').Router()


route.post("/add",addQuiz)


module.exports = route