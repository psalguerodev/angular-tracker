const database = require('../config/connection-sqlite')

let sql_query = {
    DETAIL: `select cd.title, cd.details,cd.created,cd.updated,u.name,u.lastname,u.nickname
    from components c 
    inner join component_details cd on cd.component = c.code
    left join users u on u.code = cd.user
    where c.code =?`
}

const getListAllComponents = () => {
    return new Promise((resolve,reject)=> {
        let db = database.connection()
        if( db != null ) {
            db.all('select * from components',[], function(err,rows) {
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
            let sql = 'insert into components(name,pathfile,extension,created,updated) values(?,?,?,?,?)'
            db.run(sql, [name,pathfile, extension, currentDate,currentDate] , function(err) {
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
                       updated=?, currentuser=?
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

module.exports = {
    addComponent,
    updateComponent,
    deleteComponent,
    getListAllComponents,
    getDetailByCode,
    getComponentByCode
}