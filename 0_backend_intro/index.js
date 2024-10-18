require('dotenv').config()

const express = require('express')
// import express from 'express'

// creates instances of express application
const app = express()

// definigg a port on which server will listen
const port = 3000

// app listens on home route, if request comes we send hello world.
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/twitter', (req, res)=>{
    res.send('sarthakgautm')
})

app.get('/login', (req, res)=>{
    console.log('Login Page');
    res.send('<h1> login </h1>')
})

// application listens at port 3000 (maybe available)
app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
  })
  
/*
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })
*/