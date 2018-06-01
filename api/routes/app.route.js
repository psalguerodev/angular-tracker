//Rutass
const express = require('express')
const app = express()
const database = require('../config/connection-sqlite')

app.get("/", (request,response, nextFunct ) => {

    database.getListComponents().then(data => {
        response.status(200).json({
            ok: true,
            message:'Petición realizada correctamente.' ,
            components : data
        })
    })    
})

module.exports = app