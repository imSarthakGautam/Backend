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

------------------  A L T E R N A T I V E L Y----------------- */

const userRouter = require('./routes/users')

//mounts userRouter object imported at /users path within express app 
app.use('/users', userRouter)
/*function :
 It essentially tells the application that whenever a request is made to the /users path or any subpaths,
 the routes defined within the userRouter should be used to handle the request.
 */



app.listen(3000)