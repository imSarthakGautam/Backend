This folder contains references and information about key Express.js concepts like routing, middleware usage, and data parsing:

## 1. Routing in Express
For Basic Routing: The `app.get` method defines a route handler for an **HTTP GET** request to a specific path.
In this example, `/` (home page) and `/users` (users section) are basic routes.
_app.put, app.post, app.delete_ can be used based on HTTP requests

## 2. Advanced Routing
**Nested Routing**: Using a separate router object `userRouter` defines routes specific to users (e.g., /users/new, /users/:id). This keeps code organized and modular.

**Route Parameters**: The /:id pattern in /users/:id captures a path segment as a parameter accessible in req.params.id.

## 3. Middlewares
- runs between start of request and it's response 
- These are functions that execute before a route handler, allowing for common tasks like logging or data parsing.

**Middleware Order:** Middlewares are applied in the order they are declared using app.use.

**Middleware Examples:**

- Logger Middleware: The logger and logger2 functions demonstrate simple logging functionality.

- Custom Middleware (.param): The router.param method defines a middleware specifically for the id parameter. It retrieves the corresponding user data from the users array and stores it in req.user.

## 4. Rendering Static Files:
```javascript
app.use(express.static('public'))
```
 configures Express.js to serve static files (like images, CSS, or JavaScript) from the **public directory.**

## 4. Parsing Form and JSON Data:
```javascript
express.urlencoded({extended:true})
```
 Parses URL-encoded form data submitted using HTML forms. The parsed data is accessible in req.body.
 
```javascript
express.json()
```
- Parses incoming JSON data, often used in API requests. The parsed data is accessible in req.body.

## 5. EJS Templating Engine:
```javascript
app.set('view engine', 'ejs')
```
sets EJS as the templating engine to render dynamic HTML pages.

`res.render` sends a rendered EJS template as a response, allowing you to include dynamic content based on data passed in the second argument 
```javascript
 res.render("users/new", {username : "Sarthak"})).
```