const mysql = require("mysql");

class mySql {
  constructor(host, user, password, database) {
    this.config = {
      host:host, // You can use 'localhost\\instance' to connect to named instance
      user: user,
      password: password,
      database: database,
      multipleStatements: true
    }
    if(!database) {
      delete this.config.database
    }

    this.db = mysql.createConnection(this.config)

  }
  connect(){
    this.db.connect((err) => {
      if(err) {
        console.error(err)
        return
      }
      console.info(`Connected to ${this.config.database}`)
    })
  }

  query(sql) {
    console.log(sql)
    return new Promise((resolve, reject) => {
        this.db.query(sql, (err, rows) => {
        if(err) {
          return reject(err);
        }
        resolve(rows)
      })
    })
  }

  queryInsertInto(sql, arg){
    return new Promise((resolve, reject) => {
      this.db.query(sql, arg, (err, rows) => {
        if(err) return reject(err)
        resolve(rows)
      })
    })
  }
  end() {
    return this.db.end()
  }

}


module.exports = mySql
