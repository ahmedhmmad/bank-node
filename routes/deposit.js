const express = require('express');
const db = require('../utils/db');

const router = express.Router();

// Deposit route
router.post('/deposit', async (req, res) => {
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

module.exports = router;
