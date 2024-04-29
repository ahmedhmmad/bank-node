const mysql = require('mysql2');

// Create a pool to manage database connections
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "nodebank"
});


module.exports=pool.promise();