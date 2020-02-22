const uuidv4 = require('uuid/v4');

module.exports.drawings = (db) => {

  const getAllDrawings =  (req, res) => {

    let sqlSelect
    if(req.query.id){
      sqlSelect = `SELECT d.*, c.name FROM testDB.DRAWINGS AS d 
                  INNER JOIN testDB.CUSTOMERS AS c ON c.id=d.customer_id 
                  WHERE c.id != '${req.query.id}'`
    } else {
       sqlSelect = `SELECT d.*, c.name FROM ${db.config.database}.DRAWINGS AS d
                    INNER JOIN testDB.CUSTOMERS AS c ON c.id=d.customer_id
                    ORDER BY c.name`
    }


    db.query(sqlSelect)
    .then(drawings => {

      res.status(200).json(drawings);
    })
    .catch(err => {
 
      res.status(500).json({ message: "Getting all drawings from DB went wrong." })
    })

  }

  const uploadFile = (req, res) => {
    if (!req.file) {
      next(new Error('No file uploaded!'));
      return;
    }
    console.log(req.file)
    res.status(200).json({ secure_url: req.file.secure_url });
  }

  const postDrawing = (req, res) => {
    let drawingPost = uuidv4()

    const {title, description, price, image} = req.body.form
    const user = req.body.user

    let values = [[
      drawingPost,
      title,
      parseInt(price),
      description,
      image,
      user
    ]]

    let sqlPostDrawing = `INSERT INTO ${db.config.database}.DRAWINGS (id, title, price, description, image, customer_id) VALUES ?`
    db.queryInsertInto(sqlPostDrawing, [values])
      .then(() => {
        res.status(200).json({ message: "You have successfully posted a drawing"});
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({ message: "Inserting bought drawing into DB went wrong." })
      })

  }


  const getOneDrawing = (req, res) => {
    let sqlSelectById = `SELECT d.*, c.name FROM ${db.config.database}.DRAWINGS AS d
                         INNER JOIN testDB.CUSTOMERS AS c ON c.id=d.customer_id
                         WHERE d.id='${req.query.id}'
                        `
    db.query(sqlSelectById)
      .then(drawing => {
        res.status(200).json(drawing[0]);
      })
      .catch(err => {
     
        res.status(500).json({ message: "Getting one drawing from DB went wrong." })
      })

  }

  const buyOneDrawing = (req, res) => {
    let drawingBought = uuidv4()
    let {customer_id, drawing_id} = req.body

    let sqlInsertDrawing = `INSERT INTO ${db.config.database}.CUSTOMER_DRAWINGS (id, customer_id, drawing_id)
    SELECT '${drawingBought}','${customer_id}','${drawing_id}'
    WHERE NOT EXISTS (SELECT customer_id, drawing_id
                        FROM ${db.config.database}.CUSTOMER_DRAWINGS AS cd
                        WHERE customer_id='${customer_id}' AND drawing_id='${drawing_id}'); 
                        SELECT * FROM ${db.config.database}.CUSTOMER_DRAWINGS WHERE id='${drawingBought}'`
          
    // let sqlInsertDrawing = `INSERT INTO ${db.config.database}.CUSTOMER_DRAWINGS (id, customer_id, drawing_id) VALUES ?; SELECT * FROM testDB.CUSTOMER_DRAWINGS WHERE id='${drawingBought}'`
    db.query(sqlInsertDrawing)
      .then(drawing => {
        res.status(200).json(drawing);
      })
      .catch(err => {
      
        res.status(500).json({ message: "Inserting bought drawing into DB went wrong." })
      })

  }

  const showAllBoughtDrawings = (req, res) => {
    let customer = req.query.customer_id
    let sqlBoughtDrawings = `SELECT
  c.name,
  draw.title,
  draw.price,
  draw.image,
  draw.description,
  cd.id
  FROM ${db.config.database}.CUSTOMER_DRAWINGS as cd
  JOIN ${db.config.database}.CUSTOMERS as c ON c.id = cd.customer_id
  JOIN ${db.config.database}.DRAWINGS as draw ON draw.id = cd.drawing_id
  WHERE c.id = '${customer}'`

    db.query(sqlBoughtDrawings)
      .then(allDrawings => {
      
        res.status(200).json(allDrawings);
      })
      .catch(err => {
   
        res.status(500).json({ message: "Getting all bought drawings from DB went wrong." })
      })

  }

  const getPersonalDrawings = (req, res) => {
    let customerId = req.query.id
    let sqlPersonalDrawings = `SELECT    
    d.title,
      d.description,
      d.price,
      d.image,
      c.name
  FROM testDB.DRAWINGS as d
  JOIN testDB.CUSTOMERS as c ON c.id = d.customer_id
  WHERE c.id = '${customerId}'`

  db.query(sqlPersonalDrawings)
  .then(allDrawings => {
    
    res.status(200).json(allDrawings);
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({ message: "Getting all personal drawings from DB went wrong." })
  })


  }


  return {
    getAllDrawings,
    getOneDrawing,
    buyOneDrawing,
    showAllBoughtDrawings,
    uploadFile,
    postDrawing,
    getPersonalDrawings
  }
}