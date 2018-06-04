const Request = require('../models/request.model')
const fs = require('fs')

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

const uploadFileRequest = ( request , response , nextFunction ) => {
    
    const allowed = ['PRD','UAT']
    const allowedExt = ['zip','rar']

    const id = request.params.id || 0
    const identity = request.params.identity || null
    let ambient = request.params.ambient || null
    let file = null
    let path_file = ''
    let filename = ''
    let extension = ''

    //	Validacion del los campos obligatorios
    if( !ambient || ambient == null || isNaN(id) || !id || !identity ) {
        return response.status(400).json({
            ok:false,
            message:'El ambiente , el ID y la identitdad  son obligatorios'
        })
    }

    //	Validacion del los ambientes permitidos
    if( allowed.indexOf(ambient) < 0 ) {
        return response.status(400).json({
            ok:false,
            message:'Solo está permitido los ambientes UAT y PRD'
        })
    }

    //	Validacion si no viene un archivo en el request
    if( !request.files ){
        return response.status(400).json({
            ok : false ,
            message: 'No ha seleccionado ningún archivo',
            errors : { message: 'No ha seleccionado ningún archivo'}
        })
    }

    file       = request.files.fileupload
    filename   = file.name.split('.')
    extension  = filename[ filename.length - 1 ]
    ambient    = ambient.toUpperCase()

    //	Validando la extension del archivo recibido en el request
    if( allowedExt.indexOf( extension.toLowerCase() ) < 0  ){
        return response.status(400).json({
            ok : false ,
            message : 'La extensión del archivo es incorrecto, permitidas : ' + allowedExt.join(', '),
            errors : { 
                message : 'La extensión del archivo es incorrecto, permitidas : ' + allowedExt.join(', ')
            }
        })
    }
    let filename_upload = `PASE_${ambient}.${extension}`
    let directory = `./api/uploads/${identity}`
    path_file = `${directory}/${filename_upload}`

    console.log('Filename Upload: ' + filename_upload )
    console.log('Path file: ' + path_file )

    if(!fs.existsSync(directory)) {
        fs.mkdirSync(directory);
        console.log('Se ha creado la carpeta')
    } 
        
    file.mv(path_file, (err) => {
        if(err){
            return response.status(500).json({
                ok : false ,
                message: 'Ha ocurrido un error al subir imagen',
                errors : err,
                extension : extension
            })
        }

        Request.updateFileRequest(id,ambient,path_file).then(res => {
            if(res){
                return response.status(200).json({
                    ok:true,
                    message:'Se ha subido la imagen correctamente.'
                })
            }else{
                return response.status(400).json({
                    ok:false,
                    message:'Error. No ocurrió un error al actualizar path.'
                })
            }
        })
        .catch(err => {
            if(err){
                return response.status(500).json({
                    ok:false,
                    message:'Error al procesar, verificar',
                    error:err
                })
            }
        })

    })
}

module.exports = {
    addRequest,
    updateRequest,
    deleteRequest,
    listAllRequest,
    uploadFileRequest
}