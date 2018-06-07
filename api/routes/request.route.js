const express = require('express')
const fileUpload = require('express-fileupload')
const app = express()
const requestCtrl = require('../controllers/request.controller')

app.use( fileUpload({ limits: { fileSize: 50 * 1024 * 1024 }, }) )

app.get('',requestCtrl.listAllRequest)
app.get('/:id',requestCtrl.getRequestByCode)
app.post('',requestCtrl.addRequest)
app.put('/:id',requestCtrl.updateRequest)
app.put('/:id/:ambient/:identity',requestCtrl.uploadFileRequest)
app.delete('/:id',requestCtrl.deleteRequest)

module.exports = app