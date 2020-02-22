
let JDBC = require('jdbc');
let jinst = require('jdbc/lib/jinst');

if (!jinst.isJvmCreated()) {
  jinst.addOption("-Xrs");
  jinst.setupClasspath(['./drivers/hsqldb.jar',
    './drivers/derby.jar',
    './drivers/derbyclient.jar',
    './drivers/derbytools.jar',
    '/home/raluca/.local/share/DBeaverData/drivers/maven/maven-central/com.h2database/h2-1.4.200.jar']);
}

let config = {
  // Required
  url: 'jdbc:h2:~/Downloads/test',

  // Optional
  drivername: 'org.h2.Driver',
  minpoolsize: 10,
  maxpoolsize: 100,

  // Note that if you sepecify the user and password as below, they get
  // converted to properties and submitted to getConnection that way.  That
  // means that if your driver doesn't support the 'user' and 'password'
  // properties this will not work.  You will have to supply the appropriate
  // values in the properties object instead.
  user: 'sa',
  password: '',
  properties: {}
};

var hsqldb = new JDBC(config);

hsqldb.initialize(function (err) {

  console.log("Connected to dataBase")
  if (err) {
    console.log(err);
  }
});





