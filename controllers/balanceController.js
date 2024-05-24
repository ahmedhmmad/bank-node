const jwt = require('jsonwebtoken');
const Customer = require('../models/Customer');
const { jwtSecret } = require('../config');

const getBalance = async (req, res) => {
    console.log('Getting balance...');
    
    if(!req.headers.authorization)
        {
           return res.status(401).json({message:"Autherization header is missing"});
        }
        const token = req.headers.authorization.split(' ')[1]; 
    try {
        //retrive customer Id from token
        console.log(`Token: ${token}`);
        const decodedToken = jwt.verify(token, jwtSecret);
        
        
        console.log(`Decoded user ID from token: ${decodedToken.userId}`);
        
        const currentBalance = await Customer.getCustomerBalance(decodedToken.userId);
        res.status(200).json({ balance: currentBalance });
    } catch (error) {
        console.error('Error fetching balance:', error);
        
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { getBalance };
