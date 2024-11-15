# Backend Notes

## Initial Setup

1. Initialize a new project:
   ```bash
   npm init
   npm install express
   ```

2. Install Nodemon as a dev dependency:
   ```bash
   npm i --save-dev nodemon
   ```
   > **Note:** DevDependencies are npm packages required only during development, such as for testing, building, or local development.

3. Create scripts in `package.json`:
   ```json
   "scripts": {
     "devStart": "nodemon server.js",
     "start": "node server.js"
   }
   ```

---

## Rendering HTML

- Rendering files using `res.render('file')` requires setting up a view engine.
- **Setup EJS:**
  ```bash
  npm i ejs
  ```
  ```javascript
  app.set('view engine', 'ejs');
  ```
- Rename files from `.html` to `.ejs` (e.g., `index.html` → `index.ejs`).
- Create a `views` directory to store EJS files like `views/index.ejs`.

---

## Key Express.js Concepts

### 1. Routing

- **Basic Routing:**
  ```javascript
  app.get('/', (req, res) => res.send('Home Page'));
  app.get('/users', (req, res) => res.send('Users Page'));
  ```
  Use `app.put`, `app.post`, or `app.delete` for other HTTP request types.

- **Advanced Routing:**
  - **Nested Routing:**
    Use a `Router` object for modular route handling:
    ```javascript
    const userRouter = require('./routes/users');
    app.use('/users', userRouter);
    ```
  - **Route Parameters:**
    Capture dynamic segments using `:id`:
    ```javascript
    app.get('/users/:id', (req, res) => {
      const userId = req.params.id;
      res.send(`User ID: ${userId}`);
    });
    ```

---

### 2. Middlewares

- Middlewares execute between a request and response, useful for logging, parsing, or authentication.
- **Examples:**
  - Custom logger middleware:
    ```javascript
    app.use((req, res, next) => {
      console.log(`${req.method} ${req.url}`);
      next();
    });
    ```
  - `.param` Middleware:
    ```javascript
    app.param('id', (req, res, next, id) => {
      req.user = { id, name: 'John Doe' };
      next();
    });
    ```

---

### 3. Static Files

Serve static files like CSS, JS, or images:
```javascript
app.use(express.static('public'));
```

---

### 4. Parsing Data

- Parse URL-encoded form data:
  ```javascript
  app.use(express.urlencoded({ extended: true }));
  ```
- Parse incoming JSON data:
  ```javascript
  app.use(express.json());
  ```

---

### 5. EJS Templating Engine

- Set EJS as the view engine:
  ```javascript
  app.set('view engine', 'ejs');
  ```
- Render EJS templates:
  ```javascript
  res.render('users/new', { username: 'Sarthak' });
  ```

---

## JWT Implementation

### 1. Create a JWT
```javascript
const jwt = require('jsonwebtoken');

const payload = { userId: 123, username: 'john.doe' };
const secretKey = 'your-secret-key';

const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
console.log('Generated Token:', token);
```

### 2. Verify a JWT
```javascript
jwt.verify(token, secretKey, (err, decoded) => {
  if (err) {
    console.error('Invalid token:', err);
  } else {
    console.log('Decoded token:', decoded);
  }
});
```
> **Note:** If valid, the decoded object contains payload data for user authentication.


### 3. Logout
Clear the JWT token (e.g., from cookies) to end the session.

--- 

## MongoDb
[MongoDB Operation Notes](https://github.com/imSarthakGautam/Backend/blob/main/mongodb_be/README.md)

## Server Side Rendering
[Server Side Rendering](https://github.com/imSarthakGautam/Backend/tree/main/mongodb_datahandling_ssr)

## Connecting Frontend and Backend
[CORS handling](https://github.com/imSarthakGautam/Backend/tree/main/connect_FE_BE)

## File Handling Backend
[Sticky Notes MiniProject](https://github.com/imSarthakGautam/Backend/tree/main/sticky_notes_miniproject)

## User-Post-Auth Mini Project 
[Project Link](https://github.com/imSarthakGautam/Backend/tree/main/user_post_auth_miniproject)
