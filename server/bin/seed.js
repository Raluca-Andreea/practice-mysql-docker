require('dotenv').config()
const bcrypt = require('bcryptjs');
const uuidv4 = require('uuid/v4');
const db = require('../configs/db-connection-config')

const salt = bcrypt.genSaltSync(10);

const customers = [
  [
    uuidv4(),
    'Bobby',
    bcrypt.hashSync("1234", salt),
    'bobby@gmail.com',
    'London',
    34
  ],
  [
    uuidv4(),
    'Raz',
    bcrypt.hashSync("1234", salt),
    'raz@gmail.com',
    'Bucharest',
    29
  ],
  [
    uuidv4(),
    'Marry',
    bcrypt.hashSync("1234", salt),
    'marry@gmail.com',
    'Rome',
    58
  ],
  [
    uuidv4(),
    'Martin',
    bcrypt.hashSync("1234", salt),
    'martin@gmail.com',
    'Prague',
    23
  ],
]

const drawings = [
  [
    uuidv4(),
    'Drawing 1',
    214,
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna       aliqua. Ut enim ad minim.',
    'images/drawing01.jpg'
  ],
  [
    uuidv4(),
    'Drawing 2',
    160,
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna       aliqua. Ut enim ad minim.',
    'images/drawing02.jpg'
  ],
  [
    uuidv4(),
    'Drawing 3',
    570,
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna       aliqua. Ut enim ad minim.',
    'images/drawing03.jpg'
  ],
  [
    uuidv4(),
    'Drawing 4',
    330,
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna       aliqua. Ut enim ad minim.',
    'images/drawing04.jpg'
  ],
]

  db.connection()
  db.config.query(`DELETE FROM testDB.CUSTOMERS`)
  .then(() => db.config.query(`DELETE FROM testDB.DRAWINGS`))
  .then(() => {
      console.log("Deleted Customers and Drawings from DB")
      const sql = 'INSERT INTO testDB.CUSTOMERS (id, name, password, email, city, age) VALUES ?' 
      db.config.queryInsertInto(sql, [customers])
  })
  .then(() => {
      console.log("Inserted Customers into DB")
      const sql = 'INSERT INTO testDB.DRAWINGS (id, name, price, description, image) VALUES ?' 
      db.config.queryInsertInto(sql, [drawings])
  })
  .then(() => {
    console.log("Inserted Drawings into DB")
    db.config.end()
  })
  .catch(err => {
    console.log(err)
    db.config.end()
  })