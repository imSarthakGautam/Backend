Multer is a Node.js middleware for handling file uploads, particularly in applications built with Express and Node.js.

- used for handling multipart/form-data, which is a __format specifically designed for file uploads in HTML forms__.

- Multer adds a `body` object (text-feilds) or `file/files` object (actual file selected) to req.

## Features :

- eases file storage and upload, by letting user decide how and where to store on server (memory or disk)
- allows single-file or multiple-files upload
- allows file type filter(i.e image only)

## Use :
###

### 1. Install multer 
```js
npm install --save multer
```

### 2. Using enctype="multipart/form-data" in form
```
<form action="/profile" method="post" enctype="multipart/form-data">
  <input type="file" name="avatar" />
</form>
```

### 3. Initialize multer and Creating a multer middleware instance
- for handling file uploads and saving uploaded files to specific directory(i.e, uploads/)

```js
const multer = require('multer')

//instance
const upload = multer({ dest: 'uploads/' });
```
`dest: 'uploads/'` __specifies files will be stored temporarily in uploads directory as randomly named unmanaged files.__


#### Optional Configurations
However while creating a upload middleware with multer we can configure various properties for file handling, validation and storage location.

```js
//for memory storage
const storage= multer.memoryStorage();

//for disc storage
const storage= multer.memoryStorage({

    destination: //specifies directory where file should be saved
    filename : // determine name to store file
});
```

```js
//Detailed
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // cb is placeholder for callback function that will handle results.
        cb(null, 'uploads/'); // Path where files will be saved
    },
    filename: (req, file, cb) => {
         // Unique filename: tells multer to save the file with a unique timestamp-based name.
        cb(null, Date.now() + '-' + file.originalname); 
    }
});

```
- Then Initailize multer with storage option.
```js
//initialize multer with storage option
const upload = multer({storage :storage});
```
__can add filters to limit file types, limit numbers__

### 4. Routes to handle file uploads
```js
app.post('/upload', upload.single('file'), (req, res) => {
    res.send('File uploaded successfully');
});
```

**Methods that define how files should be uploaded**
- `upload.single(fieldname)`: Accepts a single file with the specified field name.
- `upload.array(fieldname, maxCount)`: Accepts an array of files with a maximum file count.
- `upload.fields([{ name: 'file1', maxCount: 1 }, { name: 'file2', maxCount: 2 }])`: Accepts multiple fields, each with a specific maximum count of files.


