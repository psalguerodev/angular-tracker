const sqlite3 = require('sqlite3').verbose();

const connection = () => {
    const db = new sqlite3.Database('db-tracker.db', (err) => {
        if( err ) console.error(err.message)
    })
    return db
}

const getListComponents = () => {
    const db = connection() 

    return new Promise( (resolve, reject) => {
        let sql  = 'select * from components'
        db.serialize(() => {
            db.all(sql, [] , (err, rows) => {
                if(err) throw err;
                resolve(rows)
            })
        })

        db.close()
    })
}


module.exports = { getListComponents , connection }