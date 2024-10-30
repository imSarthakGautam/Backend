const express = require('express');
const app = express();


app.set('view engine', 'ejs');
const bodyParser = require('body-parser');
// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));

const crypto= require('crypto')

//----------------------setup multer----------
const multer  = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images/uploads')
    },

    filename: function (req, file, cb) {
        crypto.randomBytes(12, function(err, bytes){

            const fname = bytes.toString('hex') + path.extname(file.originalname)
            cb(null, fname)

        })
    
      
    }
  })
  
  const upload = multer({ storage: storage })



// Route for the form page
app.get('/', (req, res) => {
    res.render('test')
});

// Route to handle form submissions
// 'file' is name of form element
app.post('/upload', upload.single('file'), (req, res) => {
   
});


const port = 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});