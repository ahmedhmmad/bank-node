// config.js
module.exports = {
    jwtSecret: 'your_secret_value_here',
    db: {
        //localhost
        //host: "localhost",

        //docker
        host: "db",
        user: "root",
        password: "example",
        database: "nodebank"
    }
  };
  