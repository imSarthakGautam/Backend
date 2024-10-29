const express = require('express');
const path =require('path')
const cookieParser = require('cookie-parser')
const userModel = require('./models/user')
const postModel = require('./models/post')
const bcrypt= require('bcrypt')
const jwt= require('jsonwebtoken')

//main app 
const app = express();
//setup view engine
app.set("view engine", 'ejs')
let secretkey='shhhhh'

// Middlewares
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

// Routes:
// create user/signup page
app.get('/', (req,res)=>{
    res.render('index')
})

// user creation
app.post('/register',async (req,res)=>{
    const { username,name, email, age, password}= req.body
   let user = await userModel.findOne({email})
   if (user) return res.status(500).send('User already registered')

   // encrypt password
   bcrypt.genSalt(10, (err, salt)=>{
    console.log(salt, 'salt')
    bcrypt.hash(password, salt, async (err, hash)=>{
        console.log('hash', hash)
        let createdUser = await userModel.create({
            username,
            name,
            age,
            email,
            password: hash
        })

        let token = jwt.sign({
                    email : createdUser.email,
                    userid: createdUser._id
                    },
                    secretkey
                );

        res.cookie('token', token);
        console.log('cookie saved of', createdUser.username)
        res.send(`${createdUser.username} registered`)
        //res.redirect


    })
   })



})

//login
app.get('/login', (req,res)=>{
    res.render('login')
})

app.post('/login',async (req,res)=>{
    const { email, password}= req.body
   let user = await userModel.findOne({email})
   if (!user) return res.status(500).send('email or password is incorrect')

   // encrypt password
   bcrypt.compare(password, user.password , (err, result)=>{
    if (result) {
        let token = jwt.sign({
            email : user.email,
            userid: user._id
            },
            secretkey
        );

        res.cookie('token', token);
        res.status(200).send('you can login');
    } else {
        res.redirect('/login');
    }   
   })
})

//logout
app.get('/logout', (req,res)=>{
    res.cookie('token', '')
    console.log('cookie deleted')
    res.redirect('/login')
})

//protected route that requires login.
app.get('/profile', isLoggedIn, (req,res)=>{
    console.log(req.user);
    res.send('logged in so you can aceesss');
})

//middleware for protected routes
function isLoggedIn(req, res, next){
    if (req.cookies.token==='') res.send('you must be logged in')
    else {
        let data = jwt.verify(req.cookies.token, secretkey)
        req.user=data
        //attaching user data to request,
        //this middleware will then pass the user data to requested route.
    }
        // console.log(req.cookies);
    next()

}



const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});