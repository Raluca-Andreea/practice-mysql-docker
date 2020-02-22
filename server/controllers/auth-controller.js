const passport = require('passport');
const bcrypt = require('bcryptjs');
const uuidv4 = require('uuid/v4');

// module.exports.products
module.exports.auth = (db) => {

const signup = (req, res) => {

  const { username, password, email, city, age } = req.body
  if (!username || !password) {
      res.status(400).json({ message: 'Provide username and password' });
      return;
  }

  if (password.length < 2) {
      res.status(400).json({ message: 'Please make your password at least 8 characters long for security purposes.' });
      return;
  }

  let sqlSelect = `SELECT * FROM ${db.config.database}.CUSTOMERS WHERE NAME='${username}'` 
  db.query(sqlSelect)
  .then(user => {

    if(user.length !== 0) {
      res.status(400).json({ message: 'Username taken. Choose another one.' });
      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);
    let userID = uuidv4()

    let sql = `INSERT INTO ${db.config.database}.CUSTOMERS (id, name, password, email, city, age) VALUES ('${userID}','${username}', '${hashPass}', '${email}', '${city}', ${age}); SELECT * FROM ${db.config.database}.CUSTOMERS WHERE id='${userID}';`
    return db.query(sql)
  })
  .then(theNewUser => {

    let aNewUser = theNewUser[1][0]
    req.login(aNewUser, (err) => {

        if (err) {
            res.status(500).json({ message: 'Login after signup went bad.' });
            return;
        }
        // Send the user's information to the frontend
        // We can use also: res.status(200).json(req.user);
        res.status(200).json(aNewUser);
    });

  })
  .catch(err => {
    console.log("This is the error", err)
    res.status(400).json({ message: 'Saving user to database went wrong.' });
  })
  
  .catch(err => {
    console.log(err)
    res.status(500).json({ message: "Username check went bad." })
  })
}


const login = (req, res, next) => {
   
  passport.authenticate('local', (err, theUser, failureDetails) => {
    if (err) {
        res.status(500).json({ message: 'Something went wrong authenticating user' });
        return;
    }

    if (!theUser) {
        // "failureDetails" contains the error messages
        // from our logic in "LocalStrategy" { message: '...' }.
        res.status(401).json(failureDetails);
        return;
    }

    let theUserLogin = theUser[0]
    // save user in session
    req.login(theUserLogin, (err) => {
        if (err) {
            res.status(500).json({ message: 'Session save went bad.' });
            return;
        }
        // We are now logged in (that's why we can also send req.user)
        res.status(200).json(theUserLogin);
    });
})(req, res, next);

}

const logout = (req, res) => {
  req.logout();
  res.status(200).json({ message: 'Log out success!' });
}


const loggedin = (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user[0]);
    return;
}
  res.status(403).json({ message: 'Unauthorized' });
}

  return {
    signup, 
    login, 
    logout, 
    loggedin
  }

}
