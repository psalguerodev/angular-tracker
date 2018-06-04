const express = require('express')
const app = express()
const compDetailCtrl = require('../controllers/compdetail.controller')

app.post('/',compDetailCtrl.addDetail)
app.put('/:id',compDetailCtrl.updateDetail)
app.delete('/:id',compDetailCtrl.delateDetail)

module.exports = app