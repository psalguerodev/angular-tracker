//	Arrancador de la Aplicacion
const express = require('express')
const bodyParser = require('body-parser')
const config = require('./api/config/configuration')
const app_routes = require('./api/routes/app.route')
const app_component = require('./api/routes/componet.route')
const app_user = require('./api/routes/user.route')

// Variables estaticas
const PORT = config.PORT

//Inicializar variables
const app =  express()

//	Middleware - CORS de la Api Restfull
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.header("Access-Control-Allow-Methods" , "POST, GET, PUT, DELETE, OPTIONS")
    next()
})

//Middlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use( bodyParser.json() )

//	Rutas
app.use('/user', app_user)
app.use('/component', app_component)
app.use('/', app_routes)

//Iniciando Servidor
try{
    app.listen(PORT, () => {
        console.log('Servidor online!!')
        console.log('PORT :: \x1b[43m%s\x1b[0m' , PORT )
    })
}catch( ex ){
    console.log( "Err >> " + ex )
}