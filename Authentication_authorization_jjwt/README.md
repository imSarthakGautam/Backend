

# User Authentication with JWT and Express

This is a basic user authentication system implemented using **Node.js**, **Express.js**, **Mongoose**, and **JWT (JSON Web Tokens)**. This project demonstrates how to create user accounts, hash passwords, and use JWTs for authentication, all without using sessions or databases. User information is stored in a MongoDB database, and JWT tokens are used to maintain user sessions via cookies.

---

## Features

- **User Registration**: Create user accounts with username, email, and password.
- **Password Hashing**: Uses `bcrypt` to hash passwords for security.
- **JWT Authentication**: On successful login, a JWT token is generated and stored in cookies.
- **Login**: Verify user credentials, generate a JWT token, and store it in the user's browser for session management.
- **Logout**: JWT token is cleared from the user's cookies to log them out.
  
---

## Technologies Used

- **Node.js**
- **Express.js** for server-side logic
- **MongoDB & Mongoose** for user data storage
- **bcrypt** for password hashing
- **jsonwebtoken (JWT)** for token-based authentication
- **EJS** as the templating engine for front-end rendering
- **Cookies** to store JWT tokens on the client-side

---

## Basic Workflow


### Project Setup / Installing dependencies
```
npm init -y
npm i express mongoose jsonwebtoken bcrypt cookie-parser ejs
npm i --save-dev nodemon
```

```js
const path =require('path')
const cookieParser = require('cookie-parser')
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
```

### Create User Account:

1. **Setup Mongoose**: Define a schema and model for user data.
2. **Create User**: Collect user data from a form (username, age, email, password).
3. **Password Hashing**: Hash the password using `bcrypt` before storing it in the database.
4. **JWT Token Creation**: Generate a JWT token when a user is successfully created and store it as a cookie for authentication purposes.

### Login:

1. **Receive Token**: The user logs in with email and password, and if valid, a JWT token is generated.
2. **Decrypt JWT Token**: The server decrypts the token to retrieve the email.
3. **Find User**: Based on the decrypted email, the system looks up the user in the database.

### JWT Implementation

#### Creating a JWT:

```js
const jwt = require('jsonwebtoken');

const payload = {
  userId: 123,
  username: 'john.doe'
};

const secretKey = 'your-secret-key';
const token = jwt.sign(payload, secretKey, { expiresIn: '1h' }); 
```

### verify jwt tokens:
```js
jwt.verify(token, secretKey, (err, decoded) => {
  if (err) {
    console.error('Invalid token:', err);
  } else {
    console.log('Decoded token:', decoded);
  }
});
```

If the token is valid, the decoded object will contain the payload data, which can be used for authenticating the user.

### Logout:
Clear Token: When the user logs out, the JWT token stored in the cookie is cleared, effectively ending the session.

## Routes
Routes
- `GET /`: Home page with a user registration form.
- `POST /create` : Handles user registration, password hashing, and token generation.
- `GET /login` : Login page with a form to authenticate the user.
- `POST /login` : Validates user credentials, generates a JWT token, and sets it in the cookies.
- `GET /logout` : Logs out the user by clearing the token from the cookie.
- `GET /profile` : Access only to verified users via jwt tokens.