require('dotenv').config()
const mySql = require('../../configs/sql-config')

let dbTesting = 'testingWithJest' 
const db = new mySql(process.env.SQL_HOST,  process.env.SQL_USER, process.env.SQL_PASSWORD )
const uuidv4 = require('uuid/v4');

const drawings = [
  [
    uuidv4(),
    'Drawing 1',
    214
  ],
  [
    uuidv4(),
    'Drawing 2',
    160
  ],
]

function setUp (){
 
  beforeAll(async () => {

    await db.connect()
      
    await db.query('CREATE DATABASE testingWithJest')
    db.config.database = dbTesting
    let createTableDrawings = `CREATE TABLE testingWithJest.DRAWINGS(
      id VARCHAR(36)                NOT NULL, 
      name VARCHAR (20)             NOT NULL,
      price INT   			            NOT NULL,
      description VARCHAR(100)   		NOT NULL,
      image VARCHAR (20)   		      NOT NULL,
      PRIMARY KEY (id)
      )ENGINE=InnoDB DEFAULT CHARSET=utf8`
      
   let sqlInsert = 'INSERT INTO testingWithJest.DRAWINGS (id, name, price, description, image) VALUES ?' 

   let createTableCustomers =  `CREATE TABLE testingWithJest.CUSTOMERS( 
    id VARCHAR(36)       NOT NULL,
    name VARCHAR (20)     NOT NULL,
    password VARCHAR(100) NOT NULL,
    email VARCHAR (20)    NOT NULL, 
    city VARCHAR (20)     NOT NULL,
    age INT               NOT NULL,
    PRIMARY KEY (id)
    )ENGINE=InnoDB DEFAULT CHARSET=utf8`
   
   await db.query(createTableDrawings) 
   await db.query(createTableCustomers) 
   await db.queryInsertInto(sqlInsert, [drawings])
  })
  
  afterAll(async () => {
    await db.query(`DROP DATABASE testingWithJest`);
    await db.end()
  })
}

module.exports = {
  setUp: setUp,
  db: db,
  drawings: drawings
}



    











  
  
  
  
  











