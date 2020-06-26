const express = require('express')
const router  = express.Router()

router.get('/', (request, response) => {
    return response.render('index')
})

module.exports = router