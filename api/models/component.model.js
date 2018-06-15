const database = require('../config/connection-sqlite')

let sql_query = {
    DETAIL: `select cd.title, cd.details,cd.created,cd.updated,u.name,u.lastname,u.nickname
    from components c 
    inner join component_details cd on cd.component = c.code
    left join users u on u.code = cd.user
    where c.code =?`
}

const getListAllComponents = (page,items) => {
    return new Promise((resolve,reject)=> {
        let db = database.connection()
        if( db != null ) {
            items = (!items) ? 20 : items
            db.all(`select * from components order by current_user desc limit ?,?  `,[page,items], function(err,rows) {
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

const listAllComponents = () => {
    return new Promise((resolve,reject) => {
        let db = database.connection()
        if(null != db){
            db.all('select * from  components', [], function(err,rows){
                if(err){
                    console.log(err.message)
                    reject(err)
                }

                db.close()
                resolve(rows)
            })
        }
    })
}

const getCountComponent = () => {
    return new Promise((resolve,reject)=> {
        let db = database.connection()
        if( db != null ) {
            db.get(`select count(*) as total from components `,[], function(err,rows) {
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

const addComponent = (name, pathfile , extension ) => {
    return new Promise((resolve,reject) => {
        let db = database.connection()
        let currentDate = new Date()
        let dateCreated = currentDate.getFullYear()
        if( db != null ) {
            console.log('conectado')
            let sql = 'insert into components(name,pathfile,extension,created) values(?,?,?,?)'
            db.run(sql, [name,pathfile, extension, currentDate] , function(err) {
                if( err ) {
                    console.log(err)
                    reject(err)  
                } 
                let newid = this.lastID;
                db.close();
                resolve(newid)
            })
        }
    })
}

const updateComponent  = (id,name,pathfile,extension,currentuser) => {
    return new Promise((resolve,reject) => {
        let db = database.connection()
        if( db != null ) {
            let sql = `update components set name=? , pathfile=? , extension=? , 
                       updated=?, current_user=?
                       where code =?`
            let updatedDate = new Date()

            db.run( sql , [ name,pathfile,
                            extension.toUpperCase(),updatedDate, parseInt(currentuser,10) , id] , 
                    function(err) {
                if( err ) {
                    console.log(err)
                    reject(err)  
                }
                db.close()
                resolve(true)
            })
        }
    })
}

const deleteComponent = (id) => {
    return new Promise((resolve,reject) => {
        let db = database.connection()
        if(db!=null) {
            let sql = `delete from components where code=?`
            db.run(sql, [id], function(err) {
                if(err){
                    console.log(err.message)
                    reject(err)
                }
                db.close()
                resolve(true)
            })
        }
    })
}

const getComponentByCode = (id) => {
    return new Promise((resolve,reject) => {
        let db = database.connection()
        if(db!=null){
          db.get('select * from components where code=?',[id],function(err,row){
              if(err){
                console.log(err.message)
                reject(err)
              }

              if(!row || row == undefined){
                  reject({
                      ok:false,
                      message:'No se ha encontrado Component'
                  })
              }

              db.close()
              resolve(row)

          })  
        }
    })
}

const getDetailByCode = (id) => {
    return new Promise((resolve,reject) => {
        let db = database.connection()
        if(db!=null){
            db.all(sql_query.DETAIL,[id],function(err,row){
                if(err){
                    console.log(err.message)
                    reject(err)
                }

                db.close()
                resolve(row)
            })
        }
    })
}

const updateActived = (id,value) => {
    return new Promise((resolve,reject) => {
        let db = database.connection()
        if(db!=null){
            let current = new Date().getTime()
            db.run('update components set current_user =? , updated=? where code = ?' , [value,current,id], function(err) {
                if(err){
                    console.log(err.message)
                    reject(err)
                }
                db.close()
                resolve(true)
            })
        }
    })
}

const updateActivedByRequest = (requestid) => {
    let sql_request = `select cd.code,cd.title,cd.component from component_details cd
    where request=?`
    let sql_component = `select c.code , r.status from component_details  c
    inner join request r on r.code =  c.request
    where component = ? and r.status <> 'Producción'`

    let sql_update_comp = `update components set current_user ='' where code=?`

    return new Promise((resolve,reject)=> {
        let db = database.connection()
        let affected = 0
        if(db!=null){
            db.all(sql_request, [requestid], function(err,rows){
                if(err){
                    console.log(err.message)
                    reject(err)
                }

                if(rows && rows.length > 0) {
                    for(let i=0;i<rows.length;i++){
                        //Verificar la disponibilidad del component
                        db.all(sql_component,[rows[i]['component']] , function (errc,comps) {
                            if(errc){
                                console.log(errc.message)
                                reject(errc)
                            }
                            
                            console.log(comps)
                            if(comps.length == 0){
                                db.run(sql_update_comp,[ rows[i]['component'] ],function (errup) {
                                    if(errup){
                                        console.log(errup.message)
                                        reject(errup)
                                    }
                                    
                                    if(this.changes > 0 ){
                                        affected=1
                                    }
                                })
                                
                            }else{
                                affected = 0;
                            }
                        })
                    }
                    db.close()
                    resolve((affected=1)?true:false)
                }

                db.close()
                resolve(false)

            })
        }
    })
}

const findComponentByText = (name) => {
    return new Promise((resolve,reject)=>{
        let db= database.connection()
        if(null!=db){
            let sql=`select * from components where name like '%${name}%'  limit 20`
            console.log(name)
            db.all(sql,[],function(err,rows){
                if(err){
                    console.log(err.message)
                    reject(err)
                }

                db.close()
                resolve(rows)
            })
        }
    })
}

const getHistoryComponentByCode = (code) => {
    return new Promise((resolve,reject) => {
        let db = database.connection()
        if(null!=db){
            let sql = `select c.code,c.name,c.pathfile,c.extension,cd.title,cd.details,cd.user,r.identity,r.status, r.title as title_r , u.name , u.lastname , cd.created , cd.updated
            from components c
            inner join request r on r.code = cd.request
            inner join component_details cd on cd.component = c.code
            inner join users u on cd.user = u.nickname 
            where c.code = ?`
            db.all(sql,[code],function(err,rows){
                if(err){
                    console.log(err.message)
                    reject(err)
                }

                db.close()
                resolve(rows)
            })
        }
    })
}

module.exports = {
    addComponent,
    updateComponent,
    deleteComponent,
    getListAllComponents,
    getDetailByCode,
    getComponentByCode,
    listAllComponents,
    updateActived,
    updateActivedByRequest,
    findComponentByText,
    getHistoryComponentByCode
}