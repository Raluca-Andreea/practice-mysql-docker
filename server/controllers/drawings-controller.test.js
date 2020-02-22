const db = require('./config-tests/db-setup')
const drawingsController = require('../controllers/drawings-controller')

db.setUp()


test('Should select all Drawings from DB', async () => {
  // productsController.getAllProducts = jest.fn();


//   console.log(db.db.config)
// const bbb = await productsController.pepe(db.db).getAllProducts()
// console.log(bbb)

//   expect(productsController.pepe(db.db).getAllProducts).toHaveBeenCalledWith(1, 2);
})



// it('Should save user to database', async done => {
//   const res = await request.post('/signup')
// 	.send({
//       name: 'Zell',
//       email: 'testing@gmail.com'
//     })
//   done()
// })







// let sqlSelect = `SELECT * FROM testDB.PRODUCTS` 
// db.query(sqlSelect)
// .then(products => {
//   res.status(200).json(products);
// })
// .catch(err => {
//   console.log(err)
//   res.status(500).json({ message: "Getting all products from DB went wrong." })
// })