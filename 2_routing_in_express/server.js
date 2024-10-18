const express= require('express')
const app = express()

app.set('view engine', 'ejs')

app.get('/', (req, res)=>{
    console.log('Home Page Here')
    res.send('Home Page')
})

/* ---------------for users section routing generally :


app.get('/users', (req, res)=>{
    console.log('User List')
})

app.get('/users/new', (req, res)=>{
    console.log(' New User Form')
})

----------------------------------- */

const userRouter = require('./routes/users')
app.use('/users', userRouter)

app.listen(3000)