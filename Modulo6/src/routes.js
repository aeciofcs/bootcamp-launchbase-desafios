const expres = require('express')
const routes = expres.Router()

router.get('/', (request, response) => {
    return response.send('Vamos Criar a LaunchStore')
})



module.exports = routes