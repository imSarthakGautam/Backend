// importing necessary packages and dependencies for use.
const express = require('express');
const path =require('path')
const cookieParser = require('cookie-parser')
const userModel = require('./models/user')
const bcrypt= require('bcrypt')
const jwt= require('jsonwebtoken')

//main app 
const app = express();
//setup view engine
app.set("view engine", 'ejs')

// Middlewares
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

//secret key
let secret_key='shhhhhh'

//middleware function to verify token
function verifyToken(req, res, next) {
  //access token from cookies.
  const token = req.cookies.token;

  //if token doesn't exist
  if (!token) {
    return res.status(403).send("Access denied. No token provided.");
  }

  jwt.verify(token, secret_key, (err, decoded) => {
    if (err) {
      return res.status(401).send("Invalid token.");
    }
    //jwt contains a decoded payload, now that info is attached to request object
    //i.e req object now has a user property 
    req.user = decoded; // Attach decoded user info to request
    next();
  });
}


// ----------------------------------Routes--------------
//Home index page: Input form
app.get('/', (req, res) => {
  res.render('index');
});

// Creating user, hashing password,
// generating jwt token, storing token as cookie.
app.post('/create', (req, res) => {
  const {username, age, email, password} = req.body;

  bcrypt.genSalt(10, (err, salt)=>{
    
    bcrypt.hash(password, salt, async (err, hash)=>{
      console.log(hash)

      //create user based on form data
      let createdUser= await userModel.create({
        username,
        age,
        email,
        password:hash,
      })

      //const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
      let token = jwt.sign({email},secret_key);
      res.cookie('token', token );
      res.send(createdUser)
    })
  }) 
});

//removing token on logout(route)
app.get('/logout',(req,res)=>{
  res.cookie('token', "");
  res.redirect('/')
})

// login page : form 
app.get('/login',(req,res)=>{
  res.render('login')
})

// Authemtication of login via form data
app.post('/login',async (req,res)=>{
  let user = await userModel.findOne({email : req.body.email})
  console.log(user);
  if(!user) return res.send('email or password is incorrect')
  console.log('Original Password', user.password)

  bcrypt.compare(req.body.password, user.password, (err, result)=>{
    console.log(result)
    if (result){
      let token = jwt.sign({email : user.email},secret_key);
      res.cookie('token', token );
      res.send('Welcome')
    } else {
      res.send('email or password is incorrect')
    }
  })

})

//protected route
app.get('/profile', verifyToken, (req,res)=>{
  res.send(`Welcome, ${req.user.email}! This is your profile.`);
})



//-------------------------------port---------------------
const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});