const mongoose = require('mongoose')
mongoose.connect(`mongodb://127.0.0.1:27017/db_name`);
//mongoose.connect(`mongodb://localhost:27017`)

const userSchema = mongoose.Schema({
    name:String,
    username:String,
    email:String
})


//model creation
module.exports = mongoose.model('user', userSchema);
// model will be created plural of user--> users