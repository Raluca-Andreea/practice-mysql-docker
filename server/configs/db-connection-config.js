const mySql = require('./sql-config')
const db = new mySql(process.env.SQL_HOST,  process.env.SQL_USER, process.env.SQL_PASSWORD, process.env.SQL_DB)


const connection = () => db.connect()
module.exports = {
  connection: connection,
  config: db
}







