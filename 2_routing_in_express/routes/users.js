const express= require('express')

const router = express.Router()


router.get('/', (req, res)=>{
    console.log('User List')
    res.send('User List')
})

router.get('/new', (req, res)=>{
    console.log(' New User Form')
    res.send(' New User Form')
})

module.exports = router