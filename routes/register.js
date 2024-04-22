const express = require('express');
const db = require('../utils/db');
const bcrypt = require('bcrypt');

const router = express.Router();

// Register route
router.post('/', async (req, res) => {
    const { username, password, role } = req.body;

    try {
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
        // Insert user into the users table
        connection.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, password, role], (error, result) => {
            if (error) {
                reject(error);
            } else {
                // Depending on the role, insert additional information into the corresponding table
                const insertQuery = getInsertQueryForRole(role);
                if (insertQuery) {
                    connection.query(insertQuery, [result.insertId], (err, res) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
                } else {
                    // If role is not recognized, resolve immediately
                    resolve();
                }
            }
        });
    });
};

// Function to get the insert query for additional user information based on role
// const getInsertQueryForRole = (role) => {
//     switch (role) {
//         case 'admin':
//             return 'INSERT INTO admins (user_id) VALUES (?)';
//         case 'clerk':
//             return 'INSERT INTO clerks (user_id) VALUES (?)';
//         case 'customer':
//             return 'INSERT INTO customers (user_id) VALUES (?)';
//         default:
//             return null;
//     }
// };
// Function to get the insert query for additional user information based on role
const getInsertQueryForRole = (role) => {
    switch (role) {
        case 'admin':
            return 'INSERT INTO admins (user_id) VALUES (?)';
        case 'clerk':
            return 'INSERT INTO clerks (user_id) VALUES (?)';
        case 'customer':
            return 'INSERT INTO customers (user_id, balance) VALUES (?, 0.00)';
        default:
            return null;
    }
};


module.exports = router;
