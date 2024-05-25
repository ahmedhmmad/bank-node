const mysql = require('mysql2');
const database=require('../config')

console.log(database);

// Create a pool to manage database connections
const pool = mysql.createPool({
    host: database.host,
    user: "root",
    password: "",
    database: "nodebank"
});


module.exports=pool.promise();