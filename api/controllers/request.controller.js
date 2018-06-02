const Request = require('../models/request.model')

const addRequest = ( request , response , nextFunction ) => {
    const body = request.body
    
    if(!body.identity || !body.title || !body.user){
        return response.status(400).json({
            ok:false,
            message:'Todos los campos son obligatorios'
        })
    }

    Request.addRequest(body.identity,body.title,body.details,body.user)
    .then(res=>{
        if(res){
            return response.status(200).json({
                ok:true,
                message:'Se ha insertado correctamente el Requerimiento.',
                id:res,
                body
            })
        }
    })
    .catch(err=>{
        if(err){
            return response.status(500).json({
                ok:false,
                message:'Error al procesar, verificar',
                error:err
            })
        }
    })

}

const updateRequest = ( request , response , nextFunction ) => {
    const body = request.body
    const id = request.params.id || 0
    
    if(!body.identity || !body.title || !body.user || id==0){
        return response.status(400).json({
            ok:false,
            message:'Todos los campos son obligatorios'
        })
    }

    Request.updateRequest(id,body.identity,body.title,body.details,body.user)
    .then(res=>{
        if(res){
            return response.status(200).json({
                ok:false,
                message:'Se ha actualizado correctmanete',
                body
            })
        }
    })
    .catch(err=>{
        if(err){
            return response.status(500).json({
                ok:false,
                message:'Error al procesar, verificar',
                error:err
            })
        }
    })

}

const deleteRequest = ( request , response , nextFunction ) => {
    const id = request.params.id || 0
    if(id==0 || isNaN(id)){
        return response.status(400).json({
            ok:false,
            message:'El ID del Requerimiento es obligaotorio'
        })
    }

    Request.deleteRequest(id).then(res=>{
        if(res){
            return response.status(200).json({
                ok:true,
                message:'Se ha eliminado correctamente',
                id: id
            })
        }
    })
    .catch(err=>{
        if(err){
            return response.status(500).json({
                ok:false,
                message:'Error al procesar, verificar',
                error:err
            })
        }
    })

}

const listAllRequest = ( request , response , nextFunction ) => {
    Request.listAllRequest()
    .then(res=>{
        if(res){
            return response.status(200).json({
                ok:true,
                message:'Se ha listado correctamente',
                body: res
            })
        }
    })
    .catch(err=>{
        if(err){
            return response.status(500).json({
                ok:false,
                message:'Error al procesar, verificar',
                error:err
            })
        }
    })
}


module.exports = {
    addRequest,
    updateRequest,
    deleteRequest,
    listAllRequest
}