const express = require('express');
const db = require('../utils/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();


// Register route
router.post('/', async (req, res) => {
    const { username, password, role } = req.body;

    try {
        
        // Check if the requesting user is an admin
        const isAdmin = true; // Replace this with your actual authorization logic
        if (!isAdmin) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save the user to the database
        const connection = await db.getConnection();
        await saveUser(connection, username, hashedPassword, role);
        connection.release();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Function to save user to the database
const saveUser = async (connection, username, password, role) => {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, password, role], (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
};

module.exports = router;
