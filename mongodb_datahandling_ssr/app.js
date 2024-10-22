const express = require('express')
const app = express();

// for form data and json handling

app.use(express.json())
app.use(express.urlencoded({extended:true}))
//view engine setup
app.set('view engine', 'ejs')

const userModel= require('./models/user')

app.get('/', (req,res)=>{
    res.render('index')
})

app.get('/profiles', async (req,res)=>{
    //find all users in db
    
    let all_users= await userModel.find()
    //console.log(all_users);
    res.render('view_profile', {all_users})
})

app.post('/save', async (req, res)=>{
    // console.log(req.body)
    const {name, email, image_url }= req.body

    //database create action
    let createdUser = await userModel.create({
        name:name,
        email:email,
        image_url:image_url
    })
     //res.send(createdUser)

    res.redirect('/profiles')
})

app.get('/delete/:id', async (req,res)=>{
    let users = await userModel.findOneAndDelete({_id: req.params.id})
    res.redirect('/profiles')
})

app.get('/edit/:id', async (req,res)=>{
    let user = await userModel.findOne({_id: req.params.id})
    //asking update values from user
    res.render("edit", {user})
    //res.redirect('/profiles')
})

app.post('/update/:id', async (req,res)=>{
    let {name, email, image_url}= req.body;
    let user = await userModel.findOneAndUpdate({_id: req.params.id}, {name, email, image_url})
    res.redirect('/profiles')
})


const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`serve application at http://localhost:${PORT}`)
})

