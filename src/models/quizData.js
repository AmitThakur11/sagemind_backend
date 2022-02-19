const {Schema , model} = require('mongoose');


const quizDataSchema = new Schema({
     quizName: String,
     quizCover : String,
     quiz: [
          {
            _id: Schema.Types.ObjectId ,
            question: String,
            points: Number,
            options: [
              {
                  _id : Schema.Types.ObjectId,
                  option: String,
                  isRight: Boolean
            }
            ]
          }
        ]
   
    }
)

const  QuizData = model('QuizData', quizDataSchema);

module.exports = QuizData