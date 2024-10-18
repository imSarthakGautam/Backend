```
npm init
npm install express
```

Install Nodemon as dev dependency, so that we don't have to restart server again and again.

```
npm i --save-dev nodemon
```

__[Note: DevDependencies are a special category of npm packages that are only needed during the development phase of your project. Unlike regular dependencies required to run your application in production, devDependencies are used for tasks like testing, building, and local development]__

Create scripts 'devStart' and 'start' in package.json

### Rendering HTML 

```javascript
res.render('file')
```
But we need to specify view engine for this.
- Create views :
views > index.html

we can also use server codes to pass down to views.

we use engine `ejs`
```
npm i ejs
```

telling application to use it via :

```javascript
app.set('view engine', 'ejs')
// .set (setting: str, value)
```

then rename file to ejs extension
`index.html--> index.ejs`