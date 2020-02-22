
const uuidv4 = require('uuid/v4');

module.exports.listings = (db) => {


const createListing = (req, res) => {
  let listingID = uuidv4()

  let values = [[
    listingID,
    req.body.title,
    req.body.description,
    req.body.user
  ]]
  console.log(values)

  let sqlInsertListing = `INSERT INTO ${db.config.database}.LISTINGS (id, title, description, customer_id) VALUES ?; SELECT * FROM testDB.LISTINGS WHERE id='${listingID}'`
  db.queryInsertInto(sqlInsertListing, [values])
  .then(product => {
    res.status(200).json(product[1]);
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({ message: "Inserting bought product into DB went wrong." })
  })
}

const showAllListings = (req, res) => {
  let customer = req.query.customer_id

  let sqlListings = `SELECT    
	  l.title,
    l.description,
    l.id,
    c.age
  FROM ${db.config.database}.LISTINGS as l
  JOIN ${db.config.database}.CUSTOMERS as c ON c.id = l.customer_id
  WHERE c.id = '${customer}'`
  
  db.query(sqlListings)
  .then(allListings => {
    res.status(200).json(allListings);
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({ message: "Inserting bought product into DB went wrong." })
  })
}

  return {
    createListing,
    showAllListings
  }
}