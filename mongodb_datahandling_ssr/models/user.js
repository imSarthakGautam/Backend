const mongoose = require('mongoose')
mongoose.connect(`mongodb://127.0.0.1:27017/profiles`);

//schema cration
const userSchema= mongoose.Schema({
    name: String,
    email: String,
    image_url: String
})
//model creation and export
module.exports= mongoose.model('user', userSchema)