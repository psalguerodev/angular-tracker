const database = require('../config/connection-sqlite')

const sql_query = {
    INSERT : `insert into typefile(shortname,longname,description,created)
              values(?,?,?,?)`,
    UPDATE : `update typefile set shortname=? , longname=? , description=?, updated=? where code=?`,
    DELETE : `delete from typefile where code =?`,
    SELECTALL : `select * from typefile`
}

const addtypefile = (shortname,longname,description) => {
    return new Promise((resolve,reject) => {
        let db = database.connection()
        if( db!= null ){
            let timestamp = new Date().getTime()
            db.run(sql_query.INSERT, [shortname,longname,description,timestamp], function(err){
                if( err ) {
                    console.log(err.message)
                    reject(err)
                }
                let newid = this.lastID
                db.close()
                resolve(newid)
            })
        }
    })
}

const updatetypefile = (id,shortname,longname,description) => {
    return new Promise((resolve,reject) => {
        let db = database.connection()
        if(db!=null){
            let timestamp = new Date().getTime()
            db.run(sql_query.UPDATE,[shortname,longname,description,timestamp,id], function(err){
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

const deletetypefile = (id) => {
    return new Promise((resolve,reject) => {
        let db = database.connection()
        if(db!=null){
            db.run(sql_query.DELETE,[id],function(err){
                if(err) {
                    console.log(err.message)
                    reject(err)
                }

                db.close()
                resolve(true)
            })
        }
    })
}

const listalltypefile = () => {
    return new Promise((resolve,reject) => {
        let db = database.connection()
        if(db!=null){
            db.all(sql_query.SELECTALL,[], (err,rows) => {
                if( err ){
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
    addtypefile,
    updatetypefile,
    deletetypefile,
    listalltypefile
}