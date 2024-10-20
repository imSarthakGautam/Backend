const express= require('express')
const app = express()

app.set('view engine', 'ejs')


// Rendering the static files 
app.use(express.static('public'))
//can also be done as :
const path = require('path')
app.use(express.static(path.join(__dirname, '/public')))

//used to parse URL-encoded data, which is commonly used in HTML forms.
app.use(express.urlencoded({extended:true}))
//commonly used for API requests and responses. It extracts the JSON data from the req.body object,
app.use(express.json())



app.get('/', (req, res)=>{
    console.log('Home Page Here')
    res.send('Home Page')
})

// for view engine ejs
app.set('view engine', 'ejs')

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