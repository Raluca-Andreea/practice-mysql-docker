
const passport = require('passport')
const session = require('express-session')
const mySQLStore = require('express-mysql-session')(session);
const {config} = require('../configs/db-connection-config')
require('./passport-config')

let sessionStore = new mySQLStore({
    checkExpirationInterval: 900000,// How frequently expired sessions will be cleared; milliseconds.
    expiration: 86400000,// The maximum age of a valid session; milliseconds.
    createDatabaseTable: true,// Whether or not to create the sessions database table, if one does not already exist.
    schema: {
        tableName: 'sessions',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }
}, config.db);


module.exports = app => {
    // Configuración de sesión
    app.use(session({
        secret: 'Whatever',
        resave: true,
        saveUninitialized: true,
        cookie: {
            secure: false,
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7 * 1000
          },
        store: sessionStore,
    }))
    app.use(passport.initialize())
    app.use(passport.session())
}


