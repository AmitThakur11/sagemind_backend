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
    quizResults : [{
        type : Schema.Types.ObjectId,
        ref : "Result"
        
    }
]},{
    timestamps: true
})


const User =  model("User", userSchema);





module.exports = {User}