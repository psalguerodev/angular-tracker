const database = require('../config/connection-sqlite')

const sql_query = {
    INSERT : `insert into request(identity,title,details,user,created,teach,status)
                values(?,?,?,?,?,?,?)`,
    UPDATE : `update request set identity=? , title=? , details=? , user=? , updated=? , teach=? , status=?
              where code=?`,
    UPDATEFILE : ``,
    DELETE: `delete from request where code=?`,
    SELECTALL: `select * from request`,
    SELECTONE : `select * from request where code=?`
}

const addRequest = (identity,title,details,user,teach,status) => {
    return new Promise((resolve,reject) => {
        let db = database.connection()
        if(db!=null){
            let timestamp = new Date().getTime()
            db.run(sql_query.INSERT,[identity.toUpperCase(),title,details,user,timestamp,teach,status], function(error){
                if( error ){
                    console.log(error.message)
                    reject(error)
                }

                db.close()
                let newid = this.lastID
                resolve(newid)
                
            })
        }
    })
}

const updateRequest = (id,identity,title,details,user,teach,status) => {
    return new Promise((resolve,reject) => {
        let db = database.connection()
        if(db!=null){
            let timestamp = new Date().getTime()
            console.log(teach,status)
            db.run(sql_query.UPDATE,[identity,title,details,user,timestamp,teach,status,id],function(error){
                if(error){
                    console.log(error.message)
                    reject(error)
                }

                db.close()
                resolve(true)
            })
        }
    })
}

const updateFileRequest = (id,ambient,path) => {
    return new Promise((resolve,reject) => {
        let db = database.connection()
        if(db!=null){
            let timestamp = new Date().getTime()
            let sql = (ambient.toUpperCase() == 'UAT') ? `update request set zipuat=?` : `update request set zipprd=?`
            sql+= ` ,updated=? where code=?`

            console.log(sql)

            db.run(sql,[path,timestamp,id],function(err){
                if(err){
                    console.log(err.message)
                    reject(err)
                }

                if(this.changes > 0 ){
                    db.close()
                    resolve(true)
                }else{
                    db.close()
                    reject({
                        ok:false,
                        message:'No se ha realizado la actualización.'
                    })
                }
            })
        }
    })
}


const deleteRequest = (id) => {
    return new Promise((resolve,reject) => {
        let db = database.connection()
        if(db!=null){
            db.run(sql_query.DELETE,[id],function(error){
                if(error){
                    console.log(error.message)
                    reject(error)
                }

                db.close()
                resolve(true)
            })
        }
    })
}

const listAllRequest = () => {
    return new Promise((resolve,reject) => {
        let db = database.connection()
        if(null != db){
            db.all(sql_query.SELECTALL,[],function(err,rows){
                if(err) {
                    console.log(err.message)
                    reject(err)
                }
                db.close()
                resolve(rows)
            })
        }
    })
}


const getRequestByCode = (code) => {
    return new Promise((resolve,reject) => {
        let db = database.connection()
        if(null!=db){
            db.get(sql_query.SELECTONE, [code],function(err,row){
                if(err){
                    console.log(err.message)
                    reject(err)
                }

                if(!row || row == undefined) {
                    db.close()
                    reject({ok:false,message:'No se encontrado requerimiento.'})
                    return
                }
                db.close()
                resolve(row)
            })
        }
    })
}

module.exports = {
    addRequest,
    updateRequest,
    deleteRequest,
    listAllRequest,
    updateFileRequest,
    getRequestByCode
}