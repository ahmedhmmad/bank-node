const db = require('../utils/db');
const Customer=require('../models/Customer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

const withdrawalMoney= async (req, res) => {
    const { amount } = req.body;
    if(!req.headers.authorization)
        {
           return res.status(401).json({message:"Autherization header is missing"});
        }
        const token = req.headers.authorization.split(' ')[1]; 
    try {
        //retrive customer Id from token
        
        const decodedToken = jwt.verify(token, jwtSecret);
        const customerId=decodedToken.userId;
        console.log(customerId);
        // Retrieve customer's current balance
     
        const currentBalance = await getCustomerBalance(customerId);

        // Check if withdrawal amount exceeds current balance
        if (amount > currentBalance) {
            return res.status(400).json({ message: "Insufficient funds" });
        }

        // Calculate new balance after withdrawal
        const newBalance = currentBalance - amount;

        // Update customer's balance in the database
        await updateAccountBalance(customerId, newBalance);
       

        res.status(200).json({ message: "Withdrawal successful", newBalance });
        await registerTransaction(customerId,customerId,amount,'withdrawal');
    } catch (error) {
        console.error('Error withdrawing money:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const transferMoney = async (req, res) => {
    const { receiverId, amount } = req.body;
    if(!req.headers.authorization)
        {
           return res.status(401).json({message:"Autherization header is missing"});
        }
        const token = req.headers.authorization.split(' ')[1]; 
       

    try {
         //retrive customer Id from token
        
         const decodedToken = jwt.verify(token, jwtSecret);
         const senderId=decodedToken.userId;

        // Fetch sender and receiver account details from the database
        const [senderAccountRows] = await Customer.getCustomerAccountById(senderId);
        const [receiverAccountRows] = await Customer.getCustomerAccountById(receiverId);

        // Extract sender and receiver accounts from the rows
        const senderAccount = senderAccountRows[0];
        const receiverAccount = receiverAccountRows[0];

        // Check if sender account exists
        if (!senderAccount) {
            throw new Error("Sender account not found");
        }

        // Check if receiver account exists
        if (!receiverAccount) {
            throw new Error("Receiver account not found");
        }

        // Calculate transfer fee (1% of the transfer amount)
        const transferFee = amount * 0.01;

        // Check if the sender has sufficient balance for the transfer
        if (senderAccount.balance < (amount + transferFee)) {
            throw new Error("Insufficient balance for transfer");
        }

        // Calculate updated balances
        const updatedSenderBalance = senderAccount.balance - (amount + transferFee);
        const updatedReceiverBalance = receiverAccount.balance + amount;

        // Update sender and receiver account balances in the database
        await updateAccountBalance(senderId, updatedSenderBalance);
        await updateAccountBalance(receiverId, updatedReceiverBalance);

        //register Transaction
        await registerTransaction(senderId,receiverId,amount,'transfer');

        // Send success response
        res.status(200).json({ message: "Transfer successful", transferFee });
    } catch (error) {
        console.error('Error transferring funds:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const depositeMoney=async(req,res)=>{
    const { amount } = req.body;
    
    if(!req.headers.authorization)
        {
           return res.status(401).json({message:"Autherization header is missing"});
        }
        const token = req.headers.authorization.split(' ')[1]; 
    try {
        //retrive customer Id from token
        
        const decodedToken = jwt.verify(token, jwtSecret);
        const customerId=decodedToken.userId;
        const currentBalance=await getCustomerBalance(customerId);
        
        const newBalance=currentBalance+amount;
       
        await updateAccountBalance(customerId,newBalance);
        await registerTransaction(customerId,customerId,amount,'deposit');
        res.status(200).json({ message: "Deposit successful", newBalance });

    }catch{
        (error)=>{
            console.error('Error depositing money:', error);
        res.status(500).json({ message: 'Internal Server Error' });
        }
    }

  
}


const registerTransaction=async(senderId,receiver_id,amount,transactionType)=>{
    console.log('Registering....')
    return db.execute('INSERT INTO transactions SET sender_id = ? , receiver_id =? , amount= ?,transaction_type = ?',[senderId,receiver_id,amount,transactionType]).then().catch((error)=>{console.log(error)});
    //console.log('INSERT INTO transactions SET sender_id = ? , receiver_id =? , amount= ?,transaction_type = ?',[senderId,receiver_id,amount,transactionType])
}


// Update customer's balance in the database
const updateAccountBalance = async (customerId, newBalance) => {
    return db.execute('UPDATE customers SET balance = ? WHERE user_id = ?', [newBalance, customerId]).then().catch((error)=>{console.log(error)})
    
};


// Retrieve customer's current balance from the database
const getCustomerBalance = async (customerId) => {
   
    try{
        const [rows, fields] = await db.execute('SELECT balance FROM customers WHERE user_id = ?', [customerId]);
        const cusomerBalance=rows[0].balance;
        return parseFloat(cusomerBalance);
    }catch (error){
        console.log(error)
    }
};





module.exports={transferMoney,depositeMoney,withdrawalMoney}