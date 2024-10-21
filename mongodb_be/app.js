const express = require('express')
const app = express()

//importing exported model 
const userModel = require('./usermodel');
//aba yo model ko basis ma create read update delete garna sakinxa

app.get('/',(req,res)=>{
    res.send('hey')
})


//creating user
app.get('/create', async (req,res)=>{
    // yo route ma aayepaxi create garni
    let createduser = await userModel.create({
        name: "Sarthak",
        email: "sarthak@gmail.com",
        username: "sarthak17",
    })

    res.send(createduser)

    //NOTE: EVERY MONGODB CODE IS ASYNCHRONOUS
})


//update user
app.get('/update', async (req,res)=>{
    
    //userModel.findOneAndUpdate(find, update, {new:true})
    let updatedUser= await userModel.findOneAndUpdate(    
        {name: "Sarthak"}, //find user by name
        {name: 'sarthakgtm'}, // update username
        {new: true} // return updated document
    )
    res.send(updatedUser)

    //NOTE: EVERY MONGODB CODE IS ASYNCHRONOUS
})

//read user
app.get('/read', async (req,res)=>{
    
    //to find all users
    let users = await userModel.find();
    // it gives array


    //to find one user
    //const user = await userModel.find({name:'Samriddhi'})
    // it gives object, and first find.

    res.send(users)
})

//delete user
app.get('/delete', async (req,res)=>{
    
    //to delete
    let deleteduser = await userModel.findOneAndDelete({name: 'sarthakgtm'});
    
    
    res.send(deleteduser)
})


app.listen(3000);
