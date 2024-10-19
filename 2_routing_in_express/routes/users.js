const express= require('express')

const router = express.Router()

// NOTE: to add middleware before this route
// route.use(middleware_function)

router.get('/', (req, res)=>{
    console.log('User List')
    res.send('User List')
})

router.get('/new', (req, res)=>{
    console.log(' New User Form')
    res.send(' New User Form')
})

router.post('/', (req, res)=>{
    res.send('Create New user')
})

//CAUTION: /new should be above this.
router.get('/:id', (req, res)=>{
    console.log(req.user)
    req.params.id
    res.send(`Get user with id :${req.params.id}`)
})

router.put('/:id', (req, res)=>{
    //express attempts to match url pattern with request and stores it in req.params object
    const userId= req.params.id
    res.send(`update user with id :${userId}`)
})

router.delete('/:id', (req, res)=>{
    req.params.id
    res.send(`delete user with id :${req.params.id}`)
})

/* can also be done as---

router.route('/:id')
.get((req, res)=>{})
.put(()=>{})
.delete(()=>{})
*/

const users = [
    { name: "Alice", age: 30, city: "New York" },
    { name: "Bob", age: 25, city: "Los Angeles" },
    { name: "Charlie", age: 35, city: "Chicago" },
    { name: "David", age: 40, city: "Houston" },
    { name: "Eve", age: 28, city: "Phoenix" }
  ];
// defining custom middleware .param,
// whenever a sp. parameter is present in request url, some code is run before route handler
router.param('id', (req, res, next, id)=>{
    console.log('insid_middleware',id)

    //amytime we have id, get particular user for that id.
    req.user= users[id]
    next()
})

//middleware_function


module.exports = router