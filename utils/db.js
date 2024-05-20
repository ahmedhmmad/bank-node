const mysql = require('mysql2');

// Create a pool to manage database connections
const pool = mysql.createPool({
    host: "db",
    user: "root",
    password: "example",
    database: "nodebank"
});


module.exports=pool.promise();