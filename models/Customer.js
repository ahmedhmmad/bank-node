const db = require('../utils/db');

class Customer {
    constructor(user_id, balance) {
        this.user_id = user_id;
        this.balance = balance;
      
    }

    static getCustomerAccountById(id) {
        console.log(`SELECT * FROM customers WHERE user_id = ${id}`);
        return db.execute(`SELECT * FROM customers WHERE user_id = ${id}`);
    }
}

module.exports = Customer;
