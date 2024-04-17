const express = require('express');
const db = require('../utils/db');

const router = express.Router();

// Deposit route
router.post('/', async (req, res) => {
    const { customerId, amount } = req.body;

    try {
        // Retrieve customer's current balance
        const connection = await db.getConnection();
        const currentBalance = await getCustomerBalance(connection, customerId);

        // Calculate new balance after deposit
        const newBalance = currentBalance + amount;

        // Update customer's balance in the database
        await updateCustomerBalance(connection, customerId, newBalance);
        connection.release();

        res.status(200).json({ message: "Deposit successful", newBalance });
    } catch (error) {
        console.error('Error depositing money:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Function to retrieve customer's current balance from the database
const getCustomerBalance = async (connection, customerId) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT balance FROM customers WHERE customer_id = ?', [customerId], (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result[0].balance);
            }
        });
    });
};

// Function to update customer's balance in the database
const updateCustomerBalance = async (connection, customerId, newBalance) => {
    return new Promise((resolve, reject) => {
        connection.query('UPDATE customers SET balance = ? WHERE customer_id = ?', [newBalance, customerId], (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
};
module.exports = router;
