const express= require('express')
const app = express()

app.set('view engine', 'ejs')


// to initialize middleware for everything below this
app.use(logger)

//home page, middleware: logger added later on
app.get('/', logger2, (req, res)=>{
    console.log('Home Page Here')
    res.send('Home Page')
})



const userRouter = require('./routes/users')

// middleware for routing
app.use('/users', userRouter)



//---- MIDDLEWARE function---
function logger(req, res, next){
    console.log('middleware 1 running',req.originalUrl)
    //runs function next afterwards
    next()
}

function logger2(req, res, next){
    console.log("middleware 2",req.originalUrl)
    next()
}


app.listen(3000)