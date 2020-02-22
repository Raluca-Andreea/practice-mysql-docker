const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const passport = require('passport');
const db = require('../configs/db-connection-config')

passport.serializeUser((loggedInUser, cb) => cb(null, loggedInUser.id))

passport.deserializeUser((userIdFromSession, cb) => {

    let sqlSelectID = `SELECT * FROM ${db.config.config.database}.CUSTOMERS WHERE id='${userIdFromSession}'` 
    db.config.query(sqlSelectID)
    .then(userDocument => cb(null, userDocument))
    .catch(err => {
        cb(err)
        return
    })
});

passport.use(new LocalStrategy((username, password, next) => {

    let sqlSelect = `SELECT * FROM ${db.config.config.database}.CUSTOMERS WHERE NAME='${username}'` 
    db.config.query(sqlSelect)
    .then(foundUser => {
        if(foundUser.length === 0){
            next(null, false, { message: 'User not registered.' });
            return;
        }
        if (!bcrypt.compareSync(password, foundUser[0].password)) {
            next(null, false, { message: 'Incorrect password.' });
            return;
        }
        next(null, foundUser);

    })
    .catch(err => {
        next(err)
        return
    })

}));