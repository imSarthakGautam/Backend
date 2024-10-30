const express = require('express');
const path =require('path')
const cookieParser = require('cookie-parser')
const userModel = require('./models/user')
const postModel = require('./models/post')
const bcrypt= require('bcrypt')
const jwt= require('jsonwebtoken')
//import multer
const upload= require('./config/multerconfig');

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
// --------------create user/signup page
app.get('/', (req,res)=>{
    res.render('index')
})

//-------------------- user creation
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
        console.log(`${createdUser.username} registered`)
        res.redirect('profile')
    })
   })
})

//-------------------------login
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
        res.status(200).redirect('/profile');
    } else {
        res.redirect('/login');
    }   
   })
})

//----------------------------logout
app.get('/logout', (req,res)=>{
    res.cookie('token', '')
    console.log('cookie deleted')
    res.redirect('/login')
})

//-------------------------protected route that requires login.
app.get('/profile', isLoggedIn, async (req,res)=>{
    let email=req.user.email
    console.log(email);
    let users= await userModel.findOne({email}).populate('post')
    //.populate('post') garepaxi user schema ma post id matra huna parni thau ma post ko entire schema as an object aauxa.

    console.log(users)
    res.render('profile', {users})
})

//----upload pp page
app.get('/profile/upload', isLoggedIn, async (req,res)=>{
    let email=req.user.email
    let users= await userModel.findOne({email}).populate('post')
    res.render('upload_profile', {users})
})

//----
app.post('/upload', isLoggedIn, upload.single('profilePic'),async (req,res)=>{
    let email=req.user.email
    let users= await userModel.findOne({email}).populate('post')
    console.log(req.file)
    users.profile_pic = req.file.filename
    await users.save()
    res.redirect('/profile')
})




//---------------------like functionality-------------------
app.get('/like/:id', isLoggedIn, async (req,res)=>{
    //console.log('like post')
    let posts= await postModel.findOne({_id : req.params.id}).populate('user')
    // console.log('posts', posts)
    // console.log('req.user', req.user)
    
    if (posts.likes.indexOf(req.user.userid) == -1){
        posts.likes.push(req.user.userid)
        await posts.save();
    } else {
        //removing like if like is already there
        posts.likes.splice(posts.likes.indexOf(req.user.userid), 1);
        await posts.save()
    }

    res.redirect('/profile')
    //res.send('logged in so you can aceesss');
})


//---------------------edit functionality-------------------
app.get('/edit/:id', isLoggedIn, async (req,res)=>{
    
    // console.log(req.user, req.params.id)
    let post = await postModel.findOne({_id:req.params.id}).populate('user')
    // console.log(post)
    res.render('edit', {post})
})

app.post('/edit-post/:id',isLoggedIn, async (req, res)=>{

    console.log(req.params.id, req.body, req.user)
    let _id= req.params.id;
    
    let post = await postModel.findByIdAndUpdate(_id, {
        content: req.body.postContent
    })
    await post.save()
    res.redirect ('/profile')


})




//--------------------post creation in db------------
app.post('/create-post',isLoggedIn, async (req, res)=>{
    console.log(req.body, req.user)
    //res.send('Users Post')
    //user, date, content, likes.
    let user= await userModel.findOne({email : req.user.email})
    let post = await postModel.create({
        user: user._id,
        content: req.body.postContent,
    })

    user.post.push(post._id)
    await user.save()
    res.redirect('/profile')

})


//------------------------middleware for protected routes
//you can also get info about user from here
function isLoggedIn(req, res, next){
    if (req.cookies.token==='') res.redirect('/login')
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