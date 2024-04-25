const mysql = require('mysql2');

// Create a pool to manage database connections
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "nodebank"
});

// // Function to get a database connection from the pool
// function getConnection() {
//     return new Promise((resolve, reject) => {
//         pool.getConnection((err, connection) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(connection);
//             }
//         });
//     });
// }

// module.exports = { getConnection };


module.exports=pool.promise();