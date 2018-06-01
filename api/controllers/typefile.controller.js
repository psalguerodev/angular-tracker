const Typefile = require('../models/typefile.model')


const addtypefile = ( request , response , nextFunction ) => {
    const body = request.body

    if(!body.shortname || !body.longname || !body.description ) {
        return response.status(400).json({
            ok:false,
            message: 'Todos los campos son obligatorios.'
        })
    }

    Typefile.addtypefile(body.shortname,body.longname,body.description)
    .then(res=>{
        if(res){
            return response.status(200).json({
                ok:true,
                message:'Se ha registrado correctamente.',
                id: res,
                body
            })
        }
    })
    .catch(err=>{
        if( err ){
            return response.status(500).json({
                ok:false,
                message: 'Ha ocurrido un error al procesar',
                error: err
            })
        }
    })

}

const updatypefile = ( request , response , nextFunction ) => {
    const body = request.body
    const id = request.params.id || 0

    if(!body.shortname || !body.longname || !body.description || id == 0 ) {
        return response.status(400).json({
            ok:false,
            message: 'Todos los campos son obligatorios.'
        })
    }

    Typefile.updatetypefile(id,body.shortname,body.longname,body.description)
    .then(res=>{
        if(res){
            return response.status(200).json({
                ok:true,
                message: 'Se ha actualizado correctamente',
                body
            })
        }
    })
    .catch(err=>{
        if( err ){
            return response.status(500).json({
                ok:false,
                message: 'Ha ocurrido un error al procesar',
                error: err
            })
        }
    })

}

const deletetypefile = ( request , response , nextFunction ) => {
    const id = request.params.id || 0

    if( id == 0 ) {
        return response.status(400).json({
            ok:false,
            message:'Todos los campos son obligatorios'
        })
    }

    Typefile.deletetypefile(id).then(res=>{
        if( res ){
            return response.status(200).json({
                ok:true,
                message: 'Se ha eliminado correctamente el tipo de archivo'
            })
        }
    })
    .catch(err=>{
        if( err ){
            return response.status(500).json({
                ok:false,
                message: 'Ha ocurrido un error al procesar',
                error: err
            })
        }
    })

}

const listalltypefile = ( request , response , nextFunction ) => {
    const body = request.body

    Typefile.listalltypefile().then(typefiles=>{

        if( typefiles ) {
            return response.status(200).json({
                ok: true,
                message:'Se ha listado correctamente',
                body: typefiles
            })
        }

    })
    .catch(err=>{
        if( err ){
            return response.status(500).json({
                ok:false,
                message: 'Ha ocurrido un error al procesar',
                error: err
            })
        }
    })

}

module.exports = {
    addtypefile,
    updatypefile,
    deletetypefile,
    listalltypefile
}