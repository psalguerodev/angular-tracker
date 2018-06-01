const express = require('express')
const app = express()

const typefileCtrl = require('../controllers/typefile.controller')

app.get("/",typefileCtrl.listalltypefile)
app.post("/",typefileCtrl.addtypefile)
app.put("/:id",typefileCtrl.updatypefile)
app.delete("/:id",typefileCtrl.deletetypefile)

module.exports = app