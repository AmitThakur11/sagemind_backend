const {Schema , model} = require('mongoose')

const userSchema = new Schema({
    username : {
        type : String,
        required: true
    },
    email : {
        type : String,
        required : true,
        unique:true
    },
    password : {
        type : String,
        required :true,
        length :{
            min: 6
        }

    },
    quizData : {
        type : Schema.Types.ObjectId,
        ref : "QuizData",
        default : []
        
    }

},{
    timestamps: true
})


const User =  model("User", userSchema);





module.exports = {User}