//import/require express library we imported
const express = require('express')

// calling express as a function , we create an app
const app = express()

//app.methods : get, put, post, delete, patch
//defining routes for handling get requests
app.get('/', (req, res)=>{
    console.log("User has sent get request, so we give them: ")
    res.send("Hi, also check: /status /json /download") 
})

app.get('/status', (req, res)=>{
    console.log("Sending status code with msg")
    //usually we send status codes
    res.status(500).send('HI')
})

app.get('/json', (req, res)=>{
    console.log("sending status code with json")
    // send status codes with json
    res.status(500).json({ message : "Error"})
})

app.get('/download', (req, res)=>{
    console.log("downloading the file")
    res.download('README.md')
})

//run app : listen at port 3000
app.listen(3000)

/*
Listening = ability of server to wait for request and resoond.
The server is configured to listen on a specific port, which is like an address for incoming connections.os.
*/
