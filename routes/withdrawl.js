const express = require('express');
const db = require('../utils/db');

// Withdrawal route
router.post('/withdraw', async (req, res) => {
    const { customerId, amount } = req.body;

    try {
        // Retrieve customer's current balance
        const connection = await db.getConnection();
        const currentBalance = await getCustomerBalance(connection, customerId);

        // Check if withdrawal amount exceeds current balance
        if (amount > currentBalance) {
            return res.status(400).json({ message: "Insufficient funds" });
        }

        // Calculate new balance after withdrawal
        const newBalance = currentBalance - amount;

        // Update customer's balance in the database
        await updateCustomerBalance(connection, customerId, newBalance);
        connection.release();

        res.status(200).json({ message: "Withdrawal successful", newBalance });
    } catch (error) {
        console.error('Error withdrawing money:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Function to retrieve customer's current balance from the database
const getCustomerBalance = async (connection, customerId) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT balance FROM customers WHERE id = ?', [customerId], (error, result) => {
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
        connection.query('UPDATE customers SET balance = ? WHERE id = ?', [newBalance, customerId], (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
};

module.exports = router;
