const express = require('express');
const mysql = require('mysql');

const app = express();

// Database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "nodebank"
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to the database');
});

// Middleware for parsing JSON requests
app.use(express.json());

// Route for handling API requests
app.get('/api/v1/', (req, res) => {
    console.log("Please Login");
    res.status(200).json({
        message: "Please Login"
    });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});
