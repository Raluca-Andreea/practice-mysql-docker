require('dotenv').config();

const express      = require('express');
const app = express();

const db = require('./configs/db-connection-config')
db.connection()

require('./configs/debugger-config')
// require('./configs/jdbc-congif')
require('./configs/middlewares-config')(app)
require('./configs/locals-config')(app)
require('./configs/session-config')(app)


const router = require('./routes/index');
app.use('/api', router);


// I can have the require express-config below the routes, otherwise it will render the not-found hbs first. 
// I will leave it in the www file.
// require('./configs/express-config')(app)

module.exports = app

