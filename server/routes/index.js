const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth-controller')
const drawingsController = require('../controllers/drawings-controller')
const listingsController = require('../controllers/listing-controller')
const uploadCloud = require('../configs/cloudinary.js');
const {config} = require('../configs/db-connection-config')

const authMiddleware = require('../middlewares/auth-middleware')

// AUTHENTICATON
router.post('/signup', authController.auth(config).signup)
router.post('/login', authController.auth(config).login)
router.post('/logout', authController.auth(config).logout)
router.get('/loggedin',authController.auth(config).loggedin)

// PRODUCTS

router.get('/getAllDrawings', drawingsController.drawings(config).getAllDrawings)
router.get('/getOneDrawing', drawingsController.drawings(config).getOneDrawing)
router.post('/buyOneDrawing', drawingsController.drawings(config).buyOneDrawing)
router.get('/showAllBoughtDrawings', drawingsController.drawings(config).showAllBoughtDrawings)
router.post('/uploadFile',  uploadCloud.single('image'), drawingsController.drawings().uploadFile)
router.post('/postDrawing', drawingsController.drawings(config).postDrawing)
router.get('/getPersonalDrawings', drawingsController.drawings(config).getPersonalDrawings)

// // //LISTING

router.post('/createListing', listingsController.listings(config).createListing)
router.get('/showAllListings', listingsController.listings(config).showAllListings)



module.exports = router;