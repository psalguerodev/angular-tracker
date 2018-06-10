const database = require('../config/connection-sqlite')

const sql_query = {
    INSERT:`insert into component_details(title,details,request,component,user,created) 
            values(?,?,?,?,?,?)`,
    UPDATE:`update component_details set title=? , details=? , request=? , component=? , user=? , updated=? 
            where code=?`,
    DELETE:`delete from component_details where code=?`
}

const addDetail = (title,details,request,component,user) => {
    return new Promise((resolve,reject) => {
        let db = database.connection()
        if(db!=null){
            let timestamp = new Date().getTime()
            db.run(sql_query.INSERT,[title,details,request,component,user,timestamp],function(err){
                if(err){
                    console.log(err.message)
                    reject(err)
                }

                let newid = this.lastID || 0
                db.close()

                if( !newid || newid == 0){
                    reject({
                        ok:false,
                        message:'No se ha podido insertar detalle.'
                    })
                }

                resolve(newid)
            })
        }
    })
}

const updateDetail = (id,title,details,request,component,user) => {
    return new Promise((resolve,reject) => {
        let db = database.connection()
        if(db!=null){
            let timestamp = new Date().getTime()
            db.run(sql_query.UPDATE , [title,details,request,component,user,timestamp,id], function(err){
                if(err){
                    console.log(err.message)
                    reject(err)
                }

                let changes = this.changes || 0
                db.close()
                if( changes >= 0){
                    resolve(true)
                }
            })
        }
    })
}

const deleteDetail = (id) => {
    return new Promise((resolve,reject) => {
        let db = database.connection()
        if(db!=null){
            db.run(sql_query.DELETE,[id],function(err){
                if(err){
                    console.log(err.message)
                    reject(err)
                }
                console.log(id)
                console.log(this.changes)
                if( this.changes == 0 ){
                    reject({
                        ok:false,
                        message:'No se ha eliminado el detalle'
                    })
                }
                db.close()
                resolve(true)
            })
        }
    })
}



module.exports = {
    addDetail,
    updateDetail,
    deleteDetail
}