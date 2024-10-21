const { json } = require('express')
const express= require('express');
const fs = require('fs');
const fsm = require('fs').promises;

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.set("view engine", "ejs")

/*
app.get('/',(req,res)=>{
    console.log("request has been sent")
    fs.readdir(`./files`,(err, files)=>{
        console.log(files);
        res.render('index', {files: files})

    })
    
})
*/
app.get('/', async (req, res) => {
    try {
        console.log("Request has been sent");

        // Read the file names
        const files = await fsm.readdir('./files');
        console.log(files);

        // Use Promise.all to read all files asynchronously
        const filedata = await Promise.all(
            //content is sent to map and then accumulated to array
            files.map(async (file) => {
                const content = await fsm.readFile(`./files/${file}`, 'utf-8');
                return content;
            })
        );

        // Render the template once all file reading is done
        res.render('index', { files: files, filedata: filedata });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error reading files');
    }
});

app.get('/file/:filename',(req,res)=>{
    console.log("View in file:")
    console.log(req.params);

    fs.readFile(`./files/${req.params.filename}`, 'utf-8', (err, filedata)=>{
        res.render('viewfile', {filename:req.params.filename, fileContent:filedata})
    })


    
})


app.get('/edit/:filename',(req,res)=>{
    console.log("edit in file:")
    


    //access previous data, 
    fs.readFile(`./files/${req.params.filename}`, 'utf-8', (err, filedata)=>{
        console.log("file read")
        console.log(req.params.filename, filedata)
        res.render('edit', {filename:req.params.filename, fileContent:filedata})
    })
    
    //retrive the edited value

    // rename the file
    // update the contents
    //redirect to main page
    
    
})


app.post('/edit',(req,res)=>{
    console.log("inside edit.post")
    console.log(req.body)
   

    fs.rename(`./files/${req.body.old_title}`,`./files/${req.body.new_title.split(' ').join('_')}.txt`, (error)=>{})
    //console.log(req.body.content)

    fs.writeFile(`./files/${req.body.new_title.split(' ').join('_')}.txt`, req.body.content ,(error)=>{})


    res.redirect('/')
})

app.get('/delete/:filename', (req, res) => {
    console.log('delete')
    const filename = req.params.filename;
    console.log(filename)

    // Delete the file
    fs.unlink(`./files/${filename}`, (err) => {
        if (err) {
            console.error("Error deleting file:", err);
            return res.status(500).send('Error deleting file');
        }

        // Redirect or respond once the file is deleted
        res.redirect('/');
    });
});











app.post('/create', (req, res)=>{
    console.log(req.body)
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.content, (error)=>{})
     res.redirect('/')
})

const port=3000

app.listen(port,() => {
    console.log('Server listening on port', port);
  });

  //on submit : extract title and create file
    // trim spaces and add .txt
    // as soon as you create file return to /
    //new sticky note will be added

 // for new sticky note: extract name --> title






