const mongoose =require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/userpost_db')

const userSchema=mongoose.Schema({
    username: String,
    name : String,
    age: Number,
    email : String,
    password: String,
    profile_pic : {
        type: String,
        default: 'defaultpp.png'
    },
    post : [
        {
            type: mongoose.Schema.Types.ObjectId, ref: "post"
        }
    ]
})

module.exports= mongoose.model('user', userSchema)