const Compdetail = require('../models/compdetail.model')

const addDetail = ( request , response , nextFunction ) => {
    const body = request.body

    if(!body.title || !body.request || !body.component || !body.user ) {
        return response.status(400).json({
            ok:false,
            message: 'Todos los campos son obligatorios'
        })
    }
    
    Compdetail.addDetail(body.title,body.details,body.request,body.component,body.user)
    .then(res=>{
        if(res){
            return response.status(200).json({
                ok:true,
                message:'Se ha registrado correctamente',
                id: res,
                body
            })
        }
    })
    .catch(err=>{
        if(err){
            return response.status(500).json({
                ok:false,
                message:'Ha ocurrido un error al procesar.',
                error: err
            })
        }
    })
    
}

const updateDetail = ( request , response , nextFunction ) => {
    const body = request.body
    const id = request.params.id || 0 
    if(!body.title || !body.request || !body.component || !body.user  || id == 0 || isNaN(id) ) {
        return response.status(400).json({
            ok:false,
            message: 'Todos los campos son obligatorios'
        })
    }
    
    Compdetail.updateDetail(id,body.title,body.details,body.request,body.component,body.user)
    .then(res=>{
        if(res){
            return response.status(200).json({
                ok:true,
                message:'Se ha actualizado correctamente',
                id: res,
                body
            })
        }
    })
    .catch(err=>{
        if(err){
            return response.status(500).json({
                ok:false,
                message:'Ha ocurrido un error al procesar.',
                error: err
            })
        }
    })
}

const delateDetail = ( request , response , nextFunction ) => {
    const id = request.params.id || 0
    if( !id || isNaN(id) ) {
        return response.status(400).json({
            ok:false,
            message: 'El ID es totalmente obligatorio.'
        })
    }

    Compdetail.deleteDetail(id).then(res=>{
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
                message:'Ha ocurrido un error al procesar.',
                error: err
            })
        }
    })

}


module.exports = {
    addDetail,
    updateDetail,
    delateDetail
}