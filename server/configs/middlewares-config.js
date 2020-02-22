const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const logger = require('morgan');
const cors = require('cors')


// CORS CONFIG
const whitelist = ['http://localhost:3000']
const corsOptions = {
    origin: (origin, cb) => {
        const originIsWhitelisted = whitelist.includes(origin)
        cb(null, originIsWhitelisted)
    },
    credentials: true        // RUTAS PERSISTENTES
}

module.exports = app => {

    //The logger actually supports four predefined log formats: default, short ,tiny, and dev.
    //This logs the http requests differently in the terminal
    app.use(logger('dev'));
    // Returns middleware that only parses json and only looks at requests where the Content-Type header matches the type option. 
    app.use(bodyParser.json());
    // When you have extended to true you can go to postman/raw an pass it: person[name]=Bobby&person[age]=67.
    // With extended true you have in req.body the following: { person: { name: 'Bobby', age: '67' } }
    // With extended false you have in req.body the following: { 'person[name]': 'Bobby', 'person[age]': '67' }
    // app.use(bodyParser.urlencoded({ extended: true })); 
    app.use(bodyParser.urlencoded({ extended: false })); 
    // Parse Cookie header and populate req.cookies with an object keyed by the cookie names. Optionally you may enable signed cookie support by passing a secret string, which assigns req.secret so it may be used by other middleware.
    // You can also have req.signedCookies
    app.use(cookieParser())

    // CORS EXPORT
    app.use(cors(corsOptions))
}
