const express = require('express')
const app = express()
const componentctrl = require('../controllers/component.controller')

app.get('/all', componentctrl.ListAllComponents)
app.get('/:page?/:items?', componentctrl.getListAllComponents )
app.get('/get/one/:id', componentctrl.getComponentByCode )
app.get('/free/comps/:request',componentctrl.updateComponentsByRequest)
app.get('/find/comp/:name',componentctrl.findComponentByName)
app.get('/history/comp/:code',componentctrl.getHistoryComponentByCode)
app.post('', componentctrl.addComponent )
app.post('/history/:request/:component', componentctrl.getHistoryByRequestAndComponent)
app.put('/:id' , componentctrl.updateComponent )
app.put('/active/:id', componentctrl.updateActivated)
app.delete('/:id', componentctrl.deleteComponent)

module.exports = app