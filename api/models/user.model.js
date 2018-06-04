const database = require('../config/connection-sqlite')

const sql_query = {
    INSERT : `insert into users(name,lastname,email,nickname,password,active,created)
              values(?,?,?,?,?,?,?)`,
    UPDATE : `update users set name=? , lastname=? , email=? , nickname=? ,  active=? ,
              updated=? where code=?`,
    DELETE : `delete from users where code=?`,
    SELECTALL : `select * from users`,
    SELECTONE : 'select * from users where code=?',
    CHANGEPASS : 'update users set password=? , updated=? where code=?'
}

const addUser = (name,lastname,email,nickname,password) => {
    return new Promise((resolve,reject)=> {
        let db = database.connection()
        let currentdate = new Date().getTime()
        db.run(sql_query.INSERT, [name,lastname,email,nickname.toUpperCase(), 
            password ,1, currentdate ], function(err) {
            
            if( err ) {
                console.log('Error: ' + err.message)
                reject(err)
            }

            let userid = this.lastID
            db.close()
            resolve(userid)
        }) 
    })
}

const updateUser = (id,name,lastname,email,nickname,password,active) => {
    return new Promise((resolve,reject)=> {
        let db = database.connection()
        let currentdate = new Date().getTime()
        db.run(sql_query.UPDATE, [name,lastname,email,nickname.toUpperCase(),active, currentdate, id] ,
        function (err) {
            if(err) {
                console.log(err.message)
                reject(err)
            }
            
            db.close()
            resolve(true)
        })
    })
}


const changePassword = (id,password) => {
    return new Promise((resolve,reject) => {
        let db = database.connection()
        let timestamp = new Date().getTime()

        db.run(sql_query.CHANGEPASS,[password,timestamp,id],function(err){
            if(err){
                console.log(err.message)
                reject(err)
            }

            if( this.changes > 0 ){
                resolve(true)
            }else{
                reject({
                    ok:false,
                    message:'No se ha actualizado registro de usuario'
                })
            }
        })
    })
}

const deleteUser = (id) => {
    return new Promise((resolve,reject)=> {
        let db = database.connection()
        db.run(sql_query.DELETE, [id], function(error) {
            if(error) {
                console.log(error.message)
                reject(error)
            }

            db.close()
            resolve(true)
        })
    })
}

const getListAllUser = () => {
    return new Promise((resolve,reject)=> {
      let db = database.connection()
      db.all(sql_query.SELECTALL,[], (err,rows) => {
          if(err) {
              console.log(err.message)
              reject(err)
          }
          db.close()
          resolve(rows)
      })
    })
}

const getUserByCode = (id) => {
    return new Promise((resolve,reject)=>{
        let db = database.connection()
        db.get(sql_query.SELECTONE,[id],function(err,row){
            if(err) {
                console.log(err.message)
                reject(err)
            }
            
            db.close()

            if( !row || row == undefined ){
                return reject({
                    ok:false,
                    message:'No se ha encontrado usuario'
                })
            }

            row.password = undefined
           
            resolve(row)
        })
    })
}

module.exports = {
    addUser,
    updateUser,
    deleteUser,
    getListAllUser,
    getUserByCode,
    changePassword
}