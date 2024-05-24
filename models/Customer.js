// models/Customer.js
const db = require('../utils/db');

class Customer {
    constructor(user_id, balance) {
        this.user_id = user_id;
        this.balance = balance;
    }

    static async getCustomerAccountById(id) {
        const [rows] = await db.execute(`SELECT * FROM customers WHERE user_id = ?`, [id]);
        return rows;
    }

    static async getCustomerBalance(id) {
        console.log(id);
        try {
            const [rows] = await db.execute('SELECT balance FROM customers WHERE user_id = ?', [id]);
            if (rows.length === 0) {
                throw new Error(`No customer found with user_id: ${id}`);
            }
            console.log(rows[0].balance);
            return parseFloat(rows[0].balance);
        } catch (error) {
            console.error('Error retrieving customer balance:', error);
            throw error;
        }
    }
}

module.exports = Customer;
