


// Function to fetch account details by Customer ID
const getAccountById = async (connection, accountId) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM customers WHERE customer_id = ?', [accountId], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results[0]);
            }
        });
    });
};


// Function to update customer balance
const updateAccountBalance = async (connection, accountId, newBalance) => {
    return new Promise((resolve, reject) => {
        connection.query('UPDATE customers SET balance = ? WHERE customer_id = ?', [newBalance, accountId], (error) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
};


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



module.exports={getAccountById,updateAccountBalance,getCustomerBalance}