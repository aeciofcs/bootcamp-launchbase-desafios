const data = require('../data.json')
const fs   = require('fs')

exports.index = (request, response) => {
    return response.render('Admin/index')
}