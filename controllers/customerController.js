const db = require('../utils/db');

const withdrawalMoney= async (req, res) => {
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
        await updateAccountBalance(connection, customerId, newBalance);
        connection.release();

        res.status(200).json({ message: "Withdrawal successful", newBalance });
        await registerTransaction(connection,customerId,customerId,amount,'withdrawal');
    } catch (error) {
        console.error('Error withdrawing money:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const  transferMoney=async (req, res) => {
    const { senderId, receiverId, amount } = req.body;

    try {
        // Fetch sender and receiver account details from the database
        const connection = await db.getConnection();
        const senderAccount = await getAccountById(connection, senderId);
        const receiverAccount = await getAccountById(connection, receiverId);

        // Calculate transfer fee (1% of the transfer amount)
        const transferFee = amount * 0.01;

        if (!senderAccount || !receiverAccount) {
            return res.status(404).json({ message: "Sender or receiver account not found" });
        }

        // Check if the sender has sufficient balance for the transfer
        if (senderAccount.balance < (amount +transferFee)) {
            return res.status(400).json({ message: "Insufficient balance for transfer👌" });
        }

        

        // Deduct transfer amount plus fee from sender's balance
        const updatedSenderBalance = senderAccount.balance - amount - transferFee;

        // Add transfer amount to receiver's balance
        const updatedReceiverBalance = receiverAccount.balance + amount;

        // Update sender and receiver account balances in the database
        await updateAccountBalance(connection, senderId, updatedSenderBalance);
        await updateAccountBalance(connection, receiverId, updatedReceiverBalance);
        await registerTransaction(connection,senderId,receiverId,amount,'transfer');

        connection.release();

        res.status(200).json({ message: "Transfer successful", transferFee });
    } catch (error) {
        console.error('Error transferring funds:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


const depositeMoney=async (req, res) => {
    const { customerId, amount } = req.body;

    try {
        // Retrieve customer's current balance
        const connection = await db.getConnection();
        const currentBalance = await getCustomerBalance(connection, customerId);

        // Calculate new balance after deposit
        const newBalance = currentBalance + amount;

        // Update customer's balance in the database
        await updateAccountBalance(connection, customerId, newBalance);
        connection.release();

        res.status(200).json({ message: "Deposit successful", newBalance });
        await registerTransaction(connection,customerId,customerId,amount,'deposit');
    } catch (error) {
        console.error('Error depositing money:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Function to fetch account details by Customer ID
const getAccountById = async (connection, accountId) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM customers WHERE user_id = ?', [accountId], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results[0]);
            }
        });
    });
};

const registerTransaction=async(connection,senderId,receiver_id,amount,transactionType)=>{
    return new Promise((resolve,reject)=>{
        
        connection.query('INSERT INTO transactions SET sender_id = ? , receiver_id =? , amount= ?,transaction_type = ?',[senderId,receiver_id,amount,transactionType],(error)=>
    {
        if (error) reject(error)
        else resolve();
    });
    });
}
// // Function to update customer balance
// const updateAccountBalance = async (connection, accountId, newBalance) => {
//     return new Promise((resolve, reject) => {
//         connection.query('UPDATE customers SET balance = ? WHERE customer_id = ?', [newBalance, accountId], (error) => {
//             if (error) {
//                 reject(error);
//             } else {
//                 resolve();
//             }
//         });
//     });
// };

// Function to update customer's balance in the database
const updateAccountBalance = async (connection, customerId, newBalance) => {
    return new Promise((resolve, reject) => {
            connection.query('UPDATE customers SET balance = ? WHERE user_id = ?', [newBalance, customerId], (error, result) => {
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
        connection.query('SELECT balance FROM customers WHERE user_id = ?', [customerId], (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result[0].balance);
            }
        });
    });
};





module.exports={transferMoney,depositeMoney,withdrawalMoney}