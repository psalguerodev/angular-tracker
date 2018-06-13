const User = require('../models/user.model')
const bcrypt = require('bcrypt')

const addUser = ( request , response , nextFunction ) => {
    const body = request.body || null

    if(!body.name ||  !body.email || !body.nickname || !body.password ) {
        return response.status(400).json({
            ok:false,
            message:'Todos los campos son obligatorios'
        })
    }

    //	Encriptar clave de usuario
    let password = bcrypt.hashSync(body.password, 10)

    User.addUser(body.name,body.lastname,body.email,body.nickname,password).then(res => {
        if( res ) {
            return response.status(200).json({
                ok : true ,
                message : 'Se ha registrado correctamente el usuario.',
                id: res,
                body:body
            })
        }
    })
    .catch(err => {
        if(err) {
            return response.status(500).json({
                ok:false,
                message: 'Ha ocurrido un error al procesar.',
                error: err
            })
        }
    })

}

const updateUser = ( request , response , nextFunction ) => {
    const body = request.body
    const id = parseInt(request.params.id) || 0

    console.log(body)
    if(!body.name || !body.email || !body.nickname || id == 0 || !body.active) {
        console.log(body)
        return response.status(400).json({
            ok:false,
            message:'Todos los campos son obligatorios'
        })
    }

    User.updateUser(id,body.name,body.lastname,body.email,body.nickname,body.password,body.active)
    .then(res => {
        if(res){
            return response.status(200).json({
                ok:true,
                message:'Se ha actualizado correctmente el usuario',
                id: id,
                body:body
            })
        }

    })
    .catch(err => {
        if(err){
            return response.status(500).json({
                ok:false,
                message:'Ha ocurrido un error al actualizar usuario.'
            })
        }
    })

}

const changePassword = ( request , response , nextFunction ) => {
    const body = request.body
    const id = request.params.id || 0

    if( !id || isNaN(id) || !body.password ){
        return response.status(400).json({
            ok:false,
            message:'El ID del usuario es obligatorio'
        })
    }

    //	Encriptando clave
    let password = bcrypt.hashSync(body.password,10)

    User.changePassword(id,password).then(res=>{
        if(res){
            return response.status(200).json({
                ok : true ,
                message: 'Se actualizado la clave correctamente del usuario',
                id : id 
            })
        }
    })
    .catch(err=>{
        if(err) {
            return response.status(500).json({
                ok:false,
                message:'Ha ocurrido un error al procesar',
                error:err
            })
        }
    })

}

const deleteUser = ( request , response , nextFunction ) => {
    const id = request.params.id
    
    if(!id || isNaN(id)) {
        return response.status(400).json({
            ok:false,
            message:'El ID es totalmente obligatorio.'
        })
    }
    
    User.deleteUser(id).then(res=> {
        if (res) {
            return response.status(200).json({
                ok : true ,
                message: 'Se eliminado correctamente el usuario',
                id : id 
            })
        }

    })
    .catch(err => {
        if(err) {
            return response.status(500).json({
                ok:false,
                message:'Ha ocurrido un error al procesar',
                error:err
            })
        }
    })
    
}

const getListAllUser = ( request , response , nextFunction ) => {
    User.getListAllUser().then(users=>{
        if(users){
            return response.status(200).json({
                ok:true,
                total: users.length,
                message:'Se ha listado correctmente los usuarios',
                body:users
            })
        }
    },err=> {
        if(err) {
            return response.status(500).json({
                ok:false,
                message: 'Ha ocurrido un error al procesar.',
                error: err
            })
        }
    })
}

const getUserByCode = ( request , response , nextFunction ) => {
    const id = request.params.id || 0

    if( id == 0 || isNaN(id) ){
        return response.status(400).json({
            ok:false,
            message:'El ID es totalmente obligatorio'
        })
    }
    
    User.getUserByCode(id).then(res=>{
        if(res){
            return response.status(200).json({
                ok:true,
                message:'Se ha encontrado correctamente',
                body:res
            })
        }
    }).catch(err=>{
        if(err){
            return response.status(500).json({
                ok:false,
                message:'Ha ocurrido un error al procesar',
                error: err
            })  
        }
    })

}

const verifyUserLogin = ( request , response , nextFunction ) => {
    const body = request.body

    if(!body.register || !body.password){
        return response.status(400).json({
            ok:false,
            login:false,
            message:'El usuario y clave son obligatorios'
        })
    }

    User.verifyUserLogin(body.register).then(res=>{
        if(res){
            console.log('Password: ' + res['password'])
            let compare = bcrypt.compareSync(body.password, res['password'])
            console.log(compare)
            if(compare){
                res['password'] = undefined
                res['role'] = (body.register == 'ADMIN') ? 'ADMIN' : 'USER'
                return response.status(200).json({
                    ok :true,
                    message:'Acceso correcto',
                    body : res
                })
            }else{
                return response.status(400).json({
                    ok:false,
                    message:'Acceso incorrecto, registro o clave incorrectos '
                })
            }
        }
    },err => {
        if(err){
            if(!err['login']){
               return response.status(500).json(err)
            }
            return response.status(500).json({
                ok:false,
                message:'Ha ocurrido un error al realizar login',
                error:err
            })
        }
    })

}

module.exports = {
    addUser,
    updateUser,
    deleteUser,
    getListAllUser,
    getUserByCode,
    changePassword,
    verifyUserLogin
}