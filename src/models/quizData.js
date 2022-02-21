const { Schema, model } = require("mongoose");

const quizDataSchema = new Schema({
  quizName: String,
  quizCover: String,
  quiz: [
    {
      id: String,
      question: String,
      points: Number,
      options: [
        {
          id: String,
          option: String,
          isRight: Boolean,
        },
      ],
    },
  ],
});

const QuizData = model("QuizData", quizDataSchema);

const resultSchema = new Schema({
  author :{
    type: Schema.Types.ObjectId,
    ref: "User"

  },
  quiz: {
    type: Schema.Types.ObjectId,
    ref: "QuizData"
  },
  result: [{
    _id : Schema.Types.ObjectId,
    question: String,
    chosenValue: String,
    rightValue : String,
  }],
});

const Result =  model("Result" , resultSchema)
module.exports = {QuizData,Result};
