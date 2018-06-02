const express = require('express')
const app = express()
const requestCtrl = require('../controllers/request.controller')

app.get('',requestCtrl.listAllRequest)
app.post('',requestCtrl.addRequest)
app.put('/:id',requestCtrl.updateRequest)
app.delete('/:id',requestCtrl.deleteRequest)

module.exports = app