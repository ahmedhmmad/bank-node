const db = require('../utils/db');

class User {
    constructor(id, username, password, role) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.role = role;
    }

    static getAccountById(id) {
        return db.execute(`SELECT * FROM users WHERE id = ${id}`);
    }

    static getCustomerAccountById(id) {
        console.log(`SELECT * FROM customers WHERE user_id = ${id}`);
        return db.execute(`SELECT * FROM customers WHERE user_id = ${id}`);
    }
}

module.exports = User;
