const express = require('express')
const app = express()
const userCtrl = require('../controllers/user.controller')

app.get('',userCtrl.getListAllUser)
app.get('/:id',userCtrl.getUserByCode)
app.post('', userCtrl.addUser)
app.post('/login',userCtrl.verifyUserLogin)
app.put('/changepassword/:id',userCtrl.changePassword)
app.put('/:id', userCtrl.updateUser)
app.delete('/:id', userCtrl.deleteUser)
module.exports = app