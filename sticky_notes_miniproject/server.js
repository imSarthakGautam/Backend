const { json } = require('express')
const express= require('express');
const fs= require('fs')

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.set("view engine", "ejs")

app.get('/',(req,res)=>{
    console.log("request has been sent")
    fs.readdir(`./files`,(err, files)=>{
        console.log(files);
        res.render('index', {files: files})

    })
    
})

app.post('/create', (req, res)=>{
    console.log(req.body)
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.content, (error)=>{})
    res.redirect('/')
})

const port =3000

app.listen(port,() => {
    console.log('Server listening on port', port);
  });

  //on submit : extract title and create file
    // trim spaces and add .txt
    // as soon as you create file return to /
    //new sticky note will be added

 // for new sticky note: extract name --> title






