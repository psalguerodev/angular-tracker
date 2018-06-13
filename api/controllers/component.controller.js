const Component = require('../models/component.model')

const getListAllComponents = (request,response,next) => {
 
    let page = request.params.page || 0

    if( !page || page == undefined || isNaN(page)){
        page = 0
    } 

   Component.getListAllComponents(page)
   .then(components => {
       if( !components ) {
        return response.status(400).json({
            ok : false ,
            message : 'Error al procesar proceso.'
        })
       }

       return response.status(200).json({
           ok :true,
           message: 'Se ha listado los componentes',
           total: components.length,
           body : components
       })

   })
   .catch(err => {
        return response.status(400).json({
            ok : false ,
            message : 'Error al procesar proceso.'
        })
   }) 

}

const getComponentByCode = ( request , response , nextFunction ) => {
    const id = request.params.id || 0

    if(!id || isNaN(id)){
        return response.status(400).json({
            ok:false,
            message:'El ID es obligatorio para realizar la consulta'
        })
    }

    //	Ejecutar las promesa para obtener detalle del componente
    Component.getComponentByCode(id).then(component =>{

        if( component ){
            let component_result = component
            let component_detail = undefined
            Component.getDetailByCode(id).then(details => {

                if( details || !details ){
                    component_detail = details
                    
                    response.status(200).json({
                        ok : false,
                        message:'Se ha encontrado componente',
                        component: component_result,
                        details : component_detail
                    })
                }

            })
            .catch(err=>{
                response.status(500).json({
                    ok : false ,
                    message : 'Ha ocurrido un error.' ,
                    error : err
                })
            })
        }else {
            response.status(500).json({
                ok : false ,
                message : 'Ha ocurrido un error.' ,
                error : err
            })
        }

    })
    .catch(err=>{
        response.status(500).json({
            ok : false ,
            message : 'Ha ocurrido un error.' ,
            error : err
        })
    })

}

const addComponent = (request,response,next) => {
    const body = request.body
    
    console.log("BODY",body)

    if( !body.name || !body.filepath || !body.extension ) {
        return response.status(400).json({
            ok: false ,
            message: 'Todos los campos son obligatorios'
        })
    }

    Component.addComponent(body.name, body.filepath, body.extension).then(res => {

        response.status(200).json({
            ok: true,
            message: 'Se ha registrado correctamente',
            id: res,
            body: body
        })

    }, err => {
        response.status(500).json({
            ok : false ,
            message : 'Ha ocurrido un error.' ,
            error : err
        })
    })
}

const updateComponent = (request,response,next) => {
    const body = request.body
    const id   = request.params.id

    if( !body.name || !body.pathfile || !body.extension || !id || isNaN(id) ) {
        return response.status(400).json({
            ok: false ,
            message: 'Todos los campos son obligatorios'
        })
    }

    Component.updateComponent(id,body.name,
        body.pathfile,
        body.extension,
        body.currentuser)
    .then(res => {

        response.status(200).json({
            ok: true,
            message: 'Se ha actualizado correctamente',
            id: id ,
            body: body
        })


    }, err => {
        response.status(500).json({
            ok : false ,
            message : 'Ha ocurrido un error.' ,
            error : err
        })
    })

}


const deleteComponent = ( request , response , nextFunction ) => {
    const id = request.params.id
    debugger
    if(!id || isNaN(id) ) {
        return response.status(400).json({
            ok: false ,
            message: 'El ID es totalmente obligatorio'
        })
    }

    Component.deleteComponent(id).then( res => {
        if (res) {
            return response.status(200).json({
                ok : true ,
                message: 'Se eliminado correctamente el componente',
                id : id 
            })
        }
    })
    .catch( err => {
        if( err ) {
            return response.status(500).json({
                ok : false ,
                message: 'Ha ocurrido un error al eliminar.',
                error : err
            })
        }
    })

}



module.exports = {
    addComponent,
    updateComponent,
    deleteComponent,
    getListAllComponents,
    getComponentByCode
}